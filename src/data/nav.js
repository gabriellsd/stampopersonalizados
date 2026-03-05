/**
 * Links do menu (usados no Layout com React Router).
 * path: rota; hash: opcional para âncora na home.
 */
export const navLinks = [
  { name: 'Início', path: '/', hash: null },
  { name: 'Coleção', path: '/', hash: '#collection' },
  { name: 'Personalizadas', path: '/personalizadas', hash: null },
  { name: 'Contato', path: '/contato', hash: null },
  { name: 'Sobre', path: '/', hash: '#about' },
  { name: 'FAQ', path: '/', hash: '#faq' },
];

export function getNavHref(link) {
  return link.hash ? link.path + link.hash : link.path;
}
