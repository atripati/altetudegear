import productJacket from '@/assets/product-jacket.jpg';
import productTshirt from '@/assets/product-tshirt.jpg';
import productShorts from '@/assets/product-shorts.jpg';
import productBoots from '@/assets/product-boots.jpg';
import productHoodie from '@/assets/product-hoodie.jpg';

import { Product, ProductInventory } from './products/types';
import { validateProduct } from './products/validation';

const CUSTOM_PRODUCTS_STORAGE_KEY = 'altitudegear-custom-products';

const createInventory = (
  sizes: string[],
  colors: string[],
  stockPerOption = 12
): ProductInventory[] =>
  sizes.flatMap((size) => colors.map((color) => ({ size, color, stock: stockPerOption })));

const baseProducts: Product[] = [
  {
    id: '1',
    slug: 'summit-pro-jacket',
    name: 'Summit Pro Jacket',
    price: 299,
    originalPrice: 349,
    image: productJacket,
    images: [
      { src: productJacket, alt: 'Summit Pro Jacket front view', primary: true },
      { src: productJacket, alt: 'Summit Pro Jacket detail view' },
    ],
    category: 'Jackets',
    collection: 'Outdoor',
    tags: ['waterproof', 'insulated', 'windproof'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Midnight', value: '#1a1a2e' },
      { name: 'Forest', value: '#2d5a27' },
      { name: 'Stone', value: '#6b6b6b' },
    ],
    inventory: createInventory(
      ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      ['Midnight', 'Forest', 'Stone'],
      8
    ),
    description:
      'Engineered for extreme conditions. The Summit Pro Jacket features our proprietary AltitudeShield™ technology, providing unmatched protection against wind, rain, and cold while maintaining optimal breathability during intense activity.',
    features: [
      'AltitudeShield™ waterproof membrane',
      'Fully taped seams',
      'Adjustable storm hood',
      'Zippered ventilation panels',
      'Interior media pocket',
    ],
    isNew: true,
    isBestSeller: true,
  },
  {
    id: '2',
    slug: 'performance-tee',
    name: 'Performance Tee',
    price: 65,
    image: productTshirt,
    images: [
      { src: productTshirt, alt: 'Performance Tee front view', primary: true },
      { src: productTshirt, alt: 'Performance Tee fabric detail' },
    ],
    category: 'T-Shirts',
    collection: 'Training',
    tags: ['moisture-wicking', 'lightweight'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Charcoal', value: '#2d2d2d' },
      { name: 'Stone', value: '#6b6b6b' },
      { name: 'Forest', value: '#2d5a27' },
    ],
    inventory: createInventory(
      ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      ['Charcoal', 'Stone', 'Forest'],
      20
    ),
    description:
      'Built for movement. Our Performance Tee uses advanced moisture-wicking fabric that keeps you dry and comfortable during the most demanding workouts.',
    features: [
      'Quick-dry fabric technology',
      'Anti-odor treatment',
      'Four-way stretch',
      'Flatlock seams',
      'Reflective logo details',
    ],
    isBestSeller: true,
  },
  {
    id: '3',
    slug: 'endurance-shorts',
    name: 'Endurance Shorts',
    price: 85,
    image: productShorts,
    images: [
      { src: productShorts, alt: 'Endurance Shorts front view', primary: true },
      { src: productShorts, alt: 'Endurance Shorts side view' },
    ],
    category: 'Shorts',
    collection: 'Training',
    tags: ['lightweight', 'breathable'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', value: '#0a0a0a' },
      { name: 'Navy', value: '#1a1a4e' },
    ],
    inventory: createInventory(
      ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      ['Black', 'Navy'],
      18
    ),
    description:
      'Designed for unrestricted movement. These shorts feature a secure fit with maximum flexibility for running, training, and everyday performance.',
    features: [
      'Lightweight stretch fabric',
      'Internal brief liner',
      'Zippered pocket',
      'Elastic waistband with drawcord',
      'Quick-dry technology',
    ],
  },
  {
    id: '4',
    slug: 'alpine-trek-boots',
    name: 'Alpine Trek Boots',
    price: 349,
    originalPrice: 399,
    image: productBoots,
    images: [
      { src: productBoots, alt: 'Alpine Trek Boots angled view', primary: true },
      { src: productBoots, alt: 'Alpine Trek Boots outsole detail' },
    ],
    category: 'Footwear',
    collection: 'Outdoor',
    tags: ['waterproof', 'grip'],
    sizes: ['7', '8', '9', '10', '11', '12', '13'],
    colors: [
      { name: 'Earth', value: '#8B4513' },
      { name: 'Black', value: '#0a0a0a' },
    ],
    inventory: createInventory(['7', '8', '9', '10', '11', '12', '13'], ['Earth', 'Black'], 6),
    description:
      'Conquer any terrain. The Alpine Trek Boots combine rugged durability with responsive cushioning, built to handle the most challenging mountain trails.',
    features: [
      'Vibram® Megagrip outsole',
      'Gore-Tex® waterproof lining',
      'EVA midsole cushioning',
      'Reinforced toe cap',
      'Premium full-grain leather',
    ],
    isNew: true,
  },
  {
    id: '5',
    slug: 'elevation-hoodie',
    name: 'Elevation Hoodie',
    price: 145,
    image: productHoodie,
    images: [
      { src: productHoodie, alt: 'Elevation Hoodie front view', primary: true },
      { src: productHoodie, alt: 'Elevation Hoodie interior fleece' },
    ],
    category: 'Hoodies',
    collection: 'Everyday',
    tags: ['comfort', 'fleece'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Forest', value: '#1a6b5a' },
      { name: 'Charcoal', value: '#2d2d2d' },
      { name: 'Stone', value: '#6b6b6b' },
    ],
    inventory: createInventory(
      ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      ['Forest', 'Charcoal', 'Stone'],
      15
    ),
    description:
      'From summit to street. The Elevation Hoodie blends athletic performance with everyday comfort, featuring our signature soft-touch fleece lining.',
    features: [
      'Heavyweight cotton blend',
      'Soft-touch fleece lining',
      'Adjustable drawcord hood',
      'Kangaroo pocket',
      'Ribbed cuffs and hem',
    ],
    isBestSeller: true,
  },
  {
    id: '6',
    slug: 'base-layer-pro',
    name: 'Base Layer Pro',
    price: 95,
    image: productTshirt,
    images: [
      { src: productTshirt, alt: 'Base Layer Pro front view', primary: true },
      { src: productTshirt, alt: 'Base Layer Pro fabric closeup' },
    ],
    category: 'Base Layers',
    collection: 'Outdoor',
    tags: ['temperature regulation', 'merino'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', value: '#0a0a0a' },
      { name: 'Navy', value: '#1a1a4e' },
    ],
    inventory: createInventory(
      ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      ['Black', 'Navy'],
      22
    ),
    description:
      'The foundation of performance. Our Base Layer Pro provides optimal temperature regulation and moisture management for high-altitude activities.',
    features: [
      'Merino wool blend',
      'Seamless construction',
      'Temperature regulation',
      'Anti-bacterial treatment',
      'Ergonomic fit',
    ],
    isNew: true,
  },
];

const readCustomProducts = (): Product[] => {
  if (typeof window === 'undefined' || !window.localStorage) return [];

  const stored = window.localStorage.getItem(CUSTOM_PRODUCTS_STORAGE_KEY);
  if (!stored) return [];

  try {
    const parsed = JSON.parse(stored) as Product[];
    return parsed.filter((product) => validateProduct(product).valid);
  } catch (error) {
    console.warn('Failed to parse stored products', error);
    return [];
  }
};

const persistCustomProducts = (entries: Product[]) => {
  if (typeof window === 'undefined' || !window.localStorage) return;
  window.localStorage.setItem(CUSTOM_PRODUCTS_STORAGE_KEY, JSON.stringify(entries));
};

export const getProducts = (): Product[] => [...baseProducts, ...readCustomProducts()];

export const products: Product[] = getProducts();

export const getProductById = (id: string): Product | undefined =>
  getProducts().find((product) => product.id === id);

export const getProductBySlug = (slug: string): Product | undefined =>
  getProducts().find((product) => product.slug === slug);

export const upsertCustomProduct = (product: Product) => {
  const result = validateProduct(product);

  if (!result.valid) {
    return { success: false, errors: result.errors };
  }

  const existingCustomProducts = readCustomProducts();
  const updatedProducts = [
    ...existingCustomProducts.filter(
      (entry) => entry.id !== product.id && entry.slug !== product.slug
    ),
    product,
  ];

  persistCustomProducts(updatedProducts);
  return { success: true, errors: [] as string[] };
};

export const collections = [
  { id: 'training', name: 'Training Wear', slug: 'training' },
  { id: 'outdoor', name: 'Outdoor / Trekking', slug: 'outdoor' },
  { id: 'everyday', name: 'Everyday Performance', slug: 'everyday' },
  { id: 'limited', name: 'Limited Edition', slug: 'limited' },
];

export const categories = [
  'All',
  'Jackets',
  'T-Shirts',
  'Shorts',
  'Hoodies',
  'Base Layers',
  'Footwear',
];
