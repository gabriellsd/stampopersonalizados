/**
 * Opções para orçamento de camisas personalizadas.
 * Edite aqui para alterar tipos, posição da estampa e tamanho da arte.
 */

export const customShirtTypes = [
  { value: 'camiseta-algodao', label: 'Camiseta básica (algodão)' },
  { value: 'camiseta-poliéster', label: 'Camiseta poliéster' },
  { value: 'dry-fit', label: 'Dry fit' },
  { value: 'polo', label: 'Polo' },
  { value: 'regata', label: 'Regata' },
  { value: 'outro', label: 'Outro' },
];

export const customPlacementOptions = [
  { value: 'frente', label: 'Só frente' },
  { value: 'verso', label: 'Só verso' },
  { value: 'ambos', label: 'Frente e verso' },
  { value: 'outro', label: 'Outro' },
];

export const customArtSizeOptions = [
  { value: 'pequena', label: 'Pequena (até ~20 cm)' },
  { value: 'media', label: 'Média (~20–30 cm)' },
  { value: 'grande', label: 'Grande (acima de 30 cm)' },
  { value: 'outro', label: 'Outro' },
];
