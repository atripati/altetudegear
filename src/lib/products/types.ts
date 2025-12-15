export interface ProductColor {
  name: string;
  value: string;
}

export interface ProductImage {
  src: string;
  alt: string;
  primary?: boolean;
}

export interface ProductInventory {
  size: string;
  color: string;
  stock: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: ProductImage[];
  category: string;
  collection: string;
  tags?: string[];
  sizes: string[];
  colors: ProductColor[];
  inventory: ProductInventory[];
  features: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
}
