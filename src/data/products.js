/**
 * Catálogo de produtos da Stampô.
 *
 * IMAGENS: use "image" (1 arquivo) ou "images" (array com até 3 para troca no hover).
 * Arquivos em public/products/<categoria>/.
 * linhaStampo: true = produto faz parte da linha "Linhas Stampô".
 */

export const PRODUCTS_FOLDER = '/products/';

export const products = [
  {
    id: 1,
    name: 'Camisa Oversized Primate Power - Preta Stampô',
    price: 219.9,
    category: 'oversized',
    categoryLabel: 'Oversized',
    image: 'primate-power-preta-1.png',
    images: ['primate-power-preta-1.png', 'primate-power-preta-2.png', 'primate-power-preta-3.png'],
    desc: 'Oversized preta com estampa exclusiva Primate Power — macaco estilizado com boné e óculos. Estampa "STAMPÔ!" em destaque. Caimento amplo e confortável.',
    composition: '100% Algodão',
    fit: 'Oversized Fit',
    badge: 'novo',
    linhaStampo: true,
  },
  {
    id: 2,
    name: 'Camisa Oversized Pretified Moon - Preta Stampô',
    price: 249.9,
    category: 'oversized',
    categoryLabel: 'Oversized',
    image: 'pretified-moon-preta-1.png',
    images: ['pretified-moon-preta-1.png', 'pretified-moon-preta-2.png', 'pretified-moon-preta-3.png'],
    desc: 'Oversized preta com estampa exclusiva Pretified Moon — Lua pretificada. Caimento amplo e confortável.',
    composition: '100% Algodão',
    fit: 'Oversized Fit',
    badge: 'novo',
    linhaStampo: true,
  },
];
