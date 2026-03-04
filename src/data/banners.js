/**
 * Banners do hero (carrossel da página inicial).
 *
 * COMO USAR:
 * 1. Coloque as imagens na pasta public/banners/
 * 2. Liste os nomes dos arquivos abaixo (na ordem em que devem aparecer)
 *
 * Se a lista estiver vazia, o site usa uma imagem padrão.
 * Formatos: .jpg, .jpeg, .png, .webp
 */

export const BANNERS_FOLDER = '/banners/';

/**
 * Lista de imagens do carrossel. Adicione os nomes dos arquivos que estão em public/banners/.
 * Ex: ['verao.jpg', 'colecao.jpg'] — o carrossel passa automaticamente entre elas.
 * Deixe vazio [] para usar uma imagem padrão.
 */
export const bannerImages = [
  'banner1.png',
  'banner2.png',
];
