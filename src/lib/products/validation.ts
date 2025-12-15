import { Product } from './types';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export const validateProduct = (product: Product): ValidationResult => {
  const errors: string[] = [];

  if (!product.name?.trim()) errors.push('Name is required.');
  if (!product.slug?.trim()) errors.push('Slug is required.');
  if (!product.description?.trim()) errors.push('Description is required.');
  if (!product.category?.trim()) errors.push('Category is required.');
  if (!product.collection?.trim()) errors.push('Collection is required.');

  if (!Number.isFinite(product.price) || product.price <= 0) {
    errors.push('Price must be greater than 0.');
  }

  if (product.originalPrice !== undefined && product.originalPrice < product.price) {
    errors.push('Original price should be greater than or equal to price.');
  }

  if (!product.sizes?.length) errors.push('At least one size is required.');
  if (!product.colors?.length) errors.push('At least one color option is required.');

  if (!product.inventory?.length) {
    errors.push('Inventory entries are required.');
  } else {
    product.inventory.forEach((entry, index) => {
      if (!entry.size) errors.push(`Inventory entry ${index + 1} is missing a size.`);
      if (!entry.color) errors.push(`Inventory entry ${index + 1} is missing a color.`);
      if (!Number.isInteger(entry.stock) || entry.stock < 0) {
        errors.push(`Inventory entry ${index + 1} must have a non-negative integer stock.`);
      }
    });
  }

  if (!product.images?.length) {
    errors.push('At least one image is required.');
  } else {
    product.images.forEach((image, index) => {
      if (!image.src) errors.push(`Image ${index + 1} is missing a source.`);
      if (!image.alt) errors.push(`Image ${index + 1} is missing alt text.`);
    });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};
