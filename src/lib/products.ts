import productJacket from '@/assets/product-jacket.jpg';
import productTshirt from '@/assets/product-tshirt.jpg';
import productShorts from '@/assets/product-shorts.jpg';
import productBoots from '@/assets/product-boots.jpg';
import productHoodie from '@/assets/product-hoodie.jpg';

import { Product } from './store';

export const products: Product[] = [
  {
    id: '1',
    name: 'Summit Pro Jacket',
    price: 299,
    originalPrice: 349,
    image: productJacket,
    category: 'Jackets',
    collection: 'Outdoor',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Midnight', value: '#1a1a2e' },
      { name: 'Forest', value: '#2d5a27' },
      { name: 'Stone', value: '#6b6b6b' },
    ],
    description: 'Engineered for extreme conditions. The Summit Pro Jacket features our proprietary AltitudeShield™ technology, providing unmatched protection against wind, rain, and cold while maintaining optimal breathability during intense activity.',
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
    name: 'Performance Tee',
    price: 65,
    image: productTshirt,
    category: 'T-Shirts',
    collection: 'Training',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Charcoal', value: '#2d2d2d' },
      { name: 'Stone', value: '#6b6b6b' },
      { name: 'Forest', value: '#2d5a27' },
    ],
    description: 'Built for movement. Our Performance Tee uses advanced moisture-wicking fabric that keeps you dry and comfortable during the most demanding workouts.',
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
    name: 'Endurance Shorts',
    price: 85,
    image: productShorts,
    category: 'Shorts',
    collection: 'Training',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', value: '#0a0a0a' },
      { name: 'Navy', value: '#1a1a4e' },
    ],
    description: 'Designed for unrestricted movement. These shorts feature a secure fit with maximum flexibility for running, training, and everyday performance.',
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
    name: 'Alpine Trek Boots',
    price: 349,
    originalPrice: 399,
    image: productBoots,
    category: 'Footwear',
    collection: 'Outdoor',
    sizes: ['7', '8', '9', '10', '11', '12', '13'],
    colors: [
      { name: 'Earth', value: '#8B4513' },
      { name: 'Black', value: '#0a0a0a' },
    ],
    description: 'Conquer any terrain. The Alpine Trek Boots combine rugged durability with responsive cushioning, built to handle the most challenging mountain trails.',
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
    name: 'Elevation Hoodie',
    price: 145,
    image: productHoodie,
    category: 'Hoodies',
    collection: 'Everyday',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Forest', value: '#1a6b5a' },
      { name: 'Charcoal', value: '#2d2d2d' },
      { name: 'Stone', value: '#6b6b6b' },
    ],
    description: 'From summit to street. The Elevation Hoodie blends athletic performance with everyday comfort, featuring our signature soft-touch fleece lining.',
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
    name: 'Base Layer Pro',
    price: 95,
    image: productTshirt,
    category: 'Base Layers',
    collection: 'Outdoor',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', value: '#0a0a0a' },
      { name: 'Navy', value: '#1a1a4e' },
    ],
    description: 'The foundation of performance. Our Base Layer Pro provides optimal temperature regulation and moisture management for high-altitude activities.',
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
