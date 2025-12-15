import { useEffect, useMemo, useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Product } from '@/lib/products/types';
import {
  BulkImportResult,
  deleteCustomProduct,
  getCustomProducts,
  importCustomProducts,
} from '@/lib/products';

const sampleJson = `[
  {
    "name": "Custom Shell Jacket",
    "slug": "custom-shell-jacket",
    "description": "A breathable waterproof shell for alpine missions.",
    "price": 255,
    "category": "Jackets",
    "collection": "Outdoor",
    "image": "https://example.com/images/custom-shell.jpg",
    "images": [
      { "src": "https://example.com/images/custom-shell.jpg", "alt": "Custom Shell Jacket front" }
    ],
    "sizes": ["S", "M", "L"],
    "colors": [
      { "name": "Ice", "value": "#cce5ff" },
      { "name": "Slate", "value": "#4a5568" }
    ],
    "inventory": [
      { "size": "S", "color": "Ice", "stock": 6 },
      { "size": "M", "color": "Ice", "stock": 10 },
      { "size": "L", "color": "Slate", "stock": 4 }
    ],
    "features": [
      "3-layer waterproof fabric",
      "Helmet-compatible hood"
    ],
    "tags": ["waterproof", "breathable"],
    "isNew": true
  }
]`;

const sampleCsv = `name,price,category,collection,description,image,colors,sizes,stock,tags,features,isNew,isBestSeller
City Windbreaker,129,Jackets,Everyday,"Lightweight, wind resistant jacket for daily commutes.",https://example.com/images/windbreaker.jpg,"Ice|#e2e8f0;Night|#111827","S;M;L;XL",12,"windproof;urban","Packable hood;Zippered pockets",true,false`;

type ImportFormat = 'json' | 'csv';

const splitCsvLine = (line: string) => {
  const cells: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === ',' && !inQuotes) {
      cells.push(current.trim());
      current = '';
      continue;
    }

    current += char;
  }

  cells.push(current.trim());
  return cells;
};

const parseDelimitedList = (value?: string, delimiter = ';') =>
  value
    ?.split(delimiter)
    .map((entry) => entry.trim())
    .filter(Boolean) || [];

const parseColorList = (value?: string) =>
  parseDelimitedList(value).map((entry) => {
    const [name, hex] = entry.split('|').map((piece) => piece.trim());
    return { name, value: hex || '#111827' };
  });

const parseImagesList = (value?: string, fallbackName?: string) => {
  const images = parseDelimitedList(value).map((entry) => {
    const [src, alt] = entry.split('|').map((piece) => piece.trim());
    return { src, alt: alt || `${fallbackName || 'Product'} image` };
  });
  return images;
};

const parseInventoryList = (value?: string) =>
  parseDelimitedList(value).reduce<{ size: string; color: string; stock: number }[]>((acc, entry) => {
    const [size, color, stock] = entry.split('|').map((piece) => piece.trim());
    if (size && color && Number.isInteger(Number(stock))) {
      acc.push({ size, color, stock: Number(stock) });
    }
    return acc;
  }, []);

const parseCsvProducts = (input: string): Partial<Product>[] => {
  const lines = input
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (!lines.length) return [];

  const headers = splitCsvLine(lines[0]).map((header) => header.toLowerCase());

  return lines.slice(1).map((line) => {
    const cells = splitCsvLine(line);
    const record: Record<string, string> = {};
    headers.forEach((header, index) => {
      record[header] = (cells[index] || '').trim();
    });

    const sizes = parseDelimitedList(record.sizes);
    const colors = parseColorList(record.colors);
    const inventoryStock = Number(record.stock || record.inventorystock || 0);
    const parsedInventory = parseInventoryList(record.inventory);

    const inventory = parsedInventory.length
      ? parsedInventory
      : sizes.length && colors.length && Number.isInteger(inventoryStock) && inventoryStock > 0
      ? sizes.flatMap((size) =>
          colors.map((color) => ({ size, color: color.name, stock: inventoryStock }))
        )
      : [];

    const images = parseImagesList(record.images, record.name);
    const primaryImage = record.image || images[0]?.src;

    return {
      name: record.name,
      slug: record.slug,
      price: Number(record.price),
      originalPrice: record.originalprice ? Number(record.originalprice) : undefined,
      category: record.category,
      collection: record.collection,
      description: record.description,
      image: primaryImage,
      images: images.length ? images : primaryImage ? [{ src: primaryImage, alt: `${record.name || 'Product'} image` }] : [],
      sizes,
      colors,
      inventory,
      tags: parseDelimitedList(record.tags),
      features: parseDelimitedList(record.features),
      isNew: record.isnew?.toLowerCase() === 'true',
      isBestSeller: record.isbestseller?.toLowerCase() === 'true',
    } satisfies Partial<Product>;
  });
};

const parseJsonProducts = (input: string): Partial<Product>[] => {
  const parsed = JSON.parse(input);
  if (Array.isArray(parsed)) return parsed;
  if (parsed && typeof parsed === 'object') return [parsed as Partial<Product>];
  throw new Error('JSON must describe a product object or an array of products.');
};

const ImportResults = ({ result }: { result: BulkImportResult | null }) => {
  if (!result) return null;
  const hasErrors = result.errors.length > 0;

  return (
    <Alert variant={hasErrors ? 'destructive' : 'default'}>
      <AlertTitle>{hasErrors ? 'Import completed with errors' : 'Products imported'}</AlertTitle>
      <AlertDescription className="space-y-2">
        <p>{result.successCount} product(s) saved to your local catalog.</p>
        {hasErrors && (
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            {result.errors.map((entry) => (
              <li key={entry.index}>
                Row {entry.index + 1}: {entry.errors.join('; ')}
              </li>
            ))}
          </ul>
        )}
      </AlertDescription>
    </Alert>
  );
};

const AdminProducts = () => {
  const [format, setFormat] = useState<ImportFormat>('json');
  const [rawInput, setRawInput] = useState('');
  const [importResult, setImportResult] = useState<BulkImportResult | null>(null);
  const [customProducts, setCustomProducts] = useState<Product[]>([]);
  const [isImporting, setIsImporting] = useState(false);

  useEffect(() => {
    setCustomProducts(getCustomProducts());
  }, []);

  const parsedPreview = useMemo(() => {
    try {
      if (!rawInput.trim()) return [] as Partial<Product>[];
      return format === 'json' ? parseJsonProducts(rawInput) : parseCsvProducts(rawInput);
    } catch (error) {
      console.warn('Failed to preview import data', error);
      return [] as Partial<Product>[];
    }
  }, [format, rawInput]);

  const handleFileInput = async (file: File) => {
    const content = await file.text();
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (extension === 'csv') setFormat('csv');
    if (extension === 'json') setFormat('json');
    setRawInput(content);
  };

  const handleImport = () => {
    setImportResult(null);
    setIsImporting(true);
    try {
      const parsed = format === 'json' ? parseJsonProducts(rawInput) : parseCsvProducts(rawInput);
      const result = importCustomProducts(parsed);
      setImportResult(result);
      setCustomProducts(getCustomProducts());
    } catch (error) {
      setImportResult({
        successCount: 0,
        errors: [
          {
            index: 0,
            errors: [error instanceof Error ? error.message : 'Unable to import products.'],
          },
        ],
      });
    } finally {
      setIsImporting(false);
    }
  };

  const handleDelete = (slug: string) => {
    deleteCustomProduct(slug);
    setCustomProducts(getCustomProducts());
  };

  const setTemplate = (template: 'json' | 'csv') => {
    setFormat(template);
    setRawInput(template === 'json' ? sampleJson : sampleCsv);
    setImportResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <main className="pt-24 pb-16">
        <section className="py-10 border-b border-border">
          <div className="container-custom space-y-4">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold">Admin</p>
              <h1 className="font-display text-3xl md:text-4xl">Catalog import & management</h1>
              <p className="text-muted-foreground max-w-3xl">
                Add custom products to your local catalog with JSON or CSV imports. Imports are validated before
                being saved to your browser storage and shown across the shop experience alongside base products.
              </p>
            </div>
            <Alert>
              <AlertTitle>Local-only and CMS-ready</AlertTitle>
              <AlertDescription>
                Imported entries persist in your browser for quick testing. The import logic is isolated in
                <code className="px-1 py-0.5 mx-1 rounded bg-muted text-xs">src/lib/products.ts</code> so you can
                swap the data source with a CMS or backend later without changing this UI.
              </AlertDescription>
            </Alert>
          </div>
        </section>

        <section className="py-10">
          <div className="container-custom grid grid-cols-1 xl:grid-cols-3 gap-8">
            <Card className="xl:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between gap-4">
                <div>
                  <CardTitle>Manual import</CardTitle>
                  <CardDescription>Paste JSON or CSV data, preview, then import with validation.</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setTemplate('json')}>
                    Load JSON template
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setTemplate('csv')}>
                    Load CSV template
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs value={format} onValueChange={(value) => setFormat(value as ImportFormat)}>
                  <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="json">JSON</TabsTrigger>
                    <TabsTrigger value="csv">CSV</TabsTrigger>
                  </TabsList>
                  <TabsContent value="json" className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Provide a single product object or an array of products. Missing slugs/IDs will be generated automatically
                      and validation errors will be reported.
                    </p>
                  </TabsContent>
                  <TabsContent value="csv" className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Headers supported: <strong>name, price, category, collection, description, image, images, colors, sizes, stock, tags, features, isNew, isBestSeller</strong>.
                      Colors use <code className="px-1 py-0.5 mx-1 rounded bg-muted text-xs">Name|#hex</code> pairs; sizes and tags are
                      semicolon separated. Inventory is auto-built with the provided stock for each size/color combination.
                    </p>
                  </TabsContent>
                </Tabs>

                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-start">
                  <Textarea
                    value={rawInput}
                    onChange={(e) => setRawInput(e.target.value)}
                    className="min-h-[240px] font-mono"
                    placeholder={
                      format === 'json'
                        ? 'Paste product JSON here'
                        : 'Paste CSV rows here (first row should contain headers)'
                    }
                  />
                  <div className="space-y-3 w-full md:w-auto">
                    <Label htmlFor="file">Upload file</Label>
                    <Input
                      id="file"
                      type="file"
                      accept={format === 'json' ? '.json,.txt' : '.csv,.txt'}
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) handleFileInput(file);
                      }}
                    />
                    <Button onClick={handleImport} disabled={isImporting || !rawInput.trim()} className="w-full">
                      {isImporting ? 'Importing...' : 'Validate & import'}
                    </Button>
                  </div>
                </div>

                <ImportResults result={importResult} />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">Preview ({parsedPreview.length} item{parsedPreview.length === 1 ? '' : 's'})</p>
                    <Badge variant="secondary">Local only</Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {parsedPreview.map((product, index) => (
                      <div key={index} className="border border-border rounded-lg p-4 space-y-2 bg-muted/30">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold">{product.name || 'Untitled product'}</p>
                            <p className="text-xs text-muted-foreground">{product.slug || 'Slug will be generated'}</p>
                          </div>
                          <Badge variant="outline">${product.price ?? '—'}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-3">{product.description}</p>
                        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                          {product.category && <span>Category: {product.category}</span>}
                          {product.collection && <span>Collection: {product.collection}</span>}
                          {product.sizes?.length ? <span>Sizes: {product.sizes.join(', ')}</span> : null}
                          {product.colors?.length ? <span>Colors: {product.colors.map((color) => color.name).join(', ')}</span> : null}
                        </div>
                      </div>
                    ))}
                    {parsedPreview.length === 0 && (
                      <p className="text-sm text-muted-foreground">Paste data to see a live preview.</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Existing custom products</CardTitle>
                  <CardDescription>Manage items currently stored in your browser.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {customProducts.length ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Slug</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {customProducts.map((product) => (
                          <TableRow key={product.slug}>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>{product.slug}</TableCell>
                            <TableCell>${product.price}</TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDelete(product.slug)}
                              >
                                Remove
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <p className="text-sm text-muted-foreground">No custom products have been imported yet.</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Import tips</CardTitle>
                  <CardDescription>Structure data for painless validation.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      Provide at least one image per product. If image alt text is missing, we will generate it from the product
                      name.
                    </li>
                    <li>
                      For CSV imports, colors are parsed as <code className="px-1 py-0.5 mx-1 rounded bg-muted text-xs">Name|#hex</code>
                      pairs, and sizes/tags/features are semicolon-separated lists.
                    </li>
                    <li>
                      Inventory is required; either specify <code className="px-1 py-0.5 mx-1 rounded bg-muted text-xs">size|color|stock</code>
                      rows in the <strong>inventory</strong> column or provide sizes, colors, and a single stock value to auto-generate combinations.
                    </li>
                    <li>Slugs and IDs are generated when absent. Slugs must not clash with built-in catalog entries.</li>
                  </ul>
                  <Separator />
                  <p className="text-xs text-muted-foreground">
                    Data stays in local storage for now. To wire this into a CMS or API later, swap the product persistence methods
                    in <code className="px-1 py-0.5 mx-1 rounded bg-muted text-xs">src/lib/products.ts</code> without changing this screen.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AdminProducts;
