import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { ProductCard } from '@/components/ProductCard';
import { categories, collections, getProducts } from '@/lib/products';
import { cn } from '@/lib/utils';
import { SlidersHorizontal, X } from 'lucide-react';

const Shop = () => {
  const allProducts = useMemo(() => getProducts(), []);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [selectedColor, setSelectedColor] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  const priceBounds = useMemo(() => {
    const prices = allProducts.map((product) => product.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }, [allProducts]);

  const [priceRange, setPriceRange] = useState<[number, number]>([
    priceBounds.min,
    priceBounds.max,
  ]);

  useEffect(() => {
    setPriceRange([priceBounds.min, priceBounds.max]);
  }, [priceBounds.min, priceBounds.max]);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchTerm.trim()), 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const collectionFilter = searchParams.get('collection');

  const allSizes = useMemo(
    () => Array.from(new Set(allProducts.flatMap((product) => product.sizes))),
    [allProducts]
  );

  const allColors = useMemo(
    () =>
      Array.from(
        new Set(allProducts.flatMap((product) => product.colors.map((color) => color.name)))
      ),
    [allProducts]
  );

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    if (debouncedSearch) {
      const term = debouncedSearch.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term) ||
          product.tags?.some((tag) => tag.toLowerCase().includes(term))
      );
    }

    // Filter by collection
    if (collectionFilter) {
      result = result.filter(
        (p) => p.collection.toLowerCase() === collectionFilter.toLowerCase()
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedSize !== 'All') {
      result = result.filter((product) =>
        product.inventory.some(
          (entry) => entry.size === selectedSize && entry.stock && entry.stock > 0
        )
      );
    }

    if (selectedColor !== 'All') {
      result = result.filter((product) =>
        product.colors.some((color) => color.name === selectedColor)
      );
    }

    result = result.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result = result.filter((p) => p.isNew).concat(result.filter((p) => !p.isNew));
        break;
      default:
        // featured - best sellers first
        result = result.filter((p) => p.isBestSeller).concat(result.filter((p) => !p.isBestSeller));
    }

    return result;
  }, [
    allProducts,
    collectionFilter,
    debouncedSearch,
    priceRange,
    selectedCategory,
    selectedColor,
    selectedSize,
    sortBy,
  ]);

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedSize('All');
    setSelectedColor('All');
    setSearchTerm('');
    setPriceRange([priceBounds.min, priceBounds.max]);
    setSearchParams({});
  };

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    collectionFilter !== null ||
    selectedSize !== 'All' ||
    selectedColor !== 'All' ||
    debouncedSearch.length > 0 ||
    priceRange[0] !== priceBounds.min ||
    priceRange[1] !== priceBounds.max;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <main className="pt-24">
        {/* Page Header */}
        <section className="py-12 border-b border-border">
          <div className="container-custom">
            <h1 className="font-display text-4xl md:text-5xl mb-2">
              {collectionFilter
                ? collections.find((c) => c.slug === collectionFilter)?.name || 'Shop'
                : 'ALL PRODUCTS'}
            </h1>
            <p className="text-muted-foreground">
              {filteredProducts.length} products
            </p>
          </div>
        </section>

        {/* Filters & Products */}
        <section className="py-12">
          <div className="container-custom">
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </button>

                <div className="relative">
                  <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search products..."
                    className="w-64 max-w-full px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label="Search products"
                  />
                </div>

                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Clear filters
                  </button>
                )}
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <div className="mb-8 p-6 bg-secondary rounded-lg animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {/* Categories */}
                  <div>
                    <h3 className="font-semibold uppercase tracking-wider mb-4">Category</h3>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={cn(
                            'px-4 py-2 rounded-full text-sm transition-colors',
                            selectedCategory === category
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground hover:text-foreground'
                          )}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Collections */}
                  <div>
                    <h3 className="font-semibold uppercase tracking-wider mb-4">Collection</h3>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSearchParams({})}
                        className={cn(
                          'px-4 py-2 rounded-full text-sm transition-colors',
                          !collectionFilter
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:text-foreground'
                        )}
                      >
                        All
                      </button>
                      {collections.map((collection) => (
                        <button
                          key={collection.id}
                          onClick={() => setSearchParams({ collection: collection.slug })}
                          className={cn(
                            'px-4 py-2 rounded-full text-sm transition-colors',
                            collectionFilter === collection.slug
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground hover:text-foreground'
                          )}
                        >
                          {collection.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sizes */}
                  <div>
                    <h3 className="font-semibold uppercase tracking-wider mb-4">Size</h3>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedSize('All')}
                        className={cn(
                          'px-3 py-2 rounded-full text-sm transition-colors',
                          selectedSize === 'All'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:text-foreground'
                        )}
                      >
                        All sizes
                      </button>
                      {allSizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={cn(
                            'px-3 py-2 rounded-full text-sm transition-colors',
                            selectedSize === size
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground hover:text-foreground'
                          )}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Colors */}
                  <div>
                    <h3 className="font-semibold uppercase tracking-wider mb-4">Color</h3>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedColor('All')}
                        className={cn(
                          'px-3 py-2 rounded-full text-sm transition-colors',
                          selectedColor === 'All'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:text-foreground'
                        )}
                      >
                        All colors
                      </button>
                      {allColors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={cn(
                            'px-3 py-2 rounded-full text-sm transition-colors',
                            selectedColor === color
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground hover:text-foreground'
                          )}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="md:col-span-2 xl:col-span-1">
                    <h3 className="font-semibold uppercase tracking-wider mb-4">Price Range</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <label className="text-sm text-muted-foreground" htmlFor="min-price">
                          Min
                        </label>
                        <input
                          id="min-price"
                          type="number"
                          min={priceBounds.min}
                          max={priceRange[1]}
                          value={priceRange[0]}
                          onChange={(e) =>
                            setPriceRange([Math.min(Number(e.target.value), priceRange[1]), priceRange[1]])
                          }
                          className="w-28 px-3 py-2 rounded-lg border border-border bg-background"
                        />
                        <label className="text-sm text-muted-foreground" htmlFor="max-price">
                          Max
                        </label>
                        <input
                          id="max-price"
                          type="number"
                          min={priceRange[0]}
                          max={priceBounds.max}
                          value={priceRange[1]}
                          onChange={(e) =>
                            setPriceRange([priceRange[0], Math.max(Number(e.target.value), priceRange[0])])
                          }
                          className="w-28 px-3 py-2 rounded-lg border border-border bg-background"
                        />
                      </div>

                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          min={priceBounds.min}
                          max={priceBounds.max}
                          value={priceRange[0]}
                          onChange={(e) =>
                            setPriceRange([Math.min(Number(e.target.value), priceRange[1]), priceRange[1]])
                          }
                          className="w-full"
                          aria-label="Minimum price"
                        />
                        <input
                          type="range"
                          min={priceBounds.min}
                          max={priceBounds.max}
                          value={priceRange[1]}
                          onChange={(e) =>
                            setPriceRange([priceRange[0], Math.max(Number(e.target.value), priceRange[0])])
                          }
                          className="w-full"
                          aria-label="Maximum price"
                        />
                      </div>

                      <p className="text-sm text-muted-foreground">
                        Showing items priced between ${priceRange[0]} and ${priceRange[1]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl font-medium mb-2">No products found</p>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters to find what you're looking for.
                </p>
                <button onClick={clearFilters} className="btn-primary rounded-lg">
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
