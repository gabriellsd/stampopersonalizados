import { PRODUCTS_FOLDER } from '../data/products';

export const PLACEHOLDER_IMAGE = `${PRODUCTS_FOLDER}placeholder.svg`;

const categoryFolder = (product) => (product.category ? `${product.category}/` : '');

/** Retorna a URL da imagem do produto (public/products/<categoria>/<arquivo>). */
export function getProductImage(product, imageIndex = 0) {
  const list = getProductImageList(product);
  return list[imageIndex] ?? list[0];
}

/** Retorna array de URLs de imagens do produto. Suporta "image" (1) ou "images" (várias). */
export function getProductImageList(product) {
  const folder = categoryFolder(product);
  const base = `${PRODUCTS_FOLDER}${folder}`;
  if (product.images && Array.isArray(product.images) && product.images.length > 0) {
    return product.images.map((filename) => base + filename);
  }
  const filename = product.image || `${product.id}.jpg`;
  return [base + filename];
}
