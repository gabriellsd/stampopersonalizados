/**
 * Configurações gerais do site (logo, contato, imagem sobre, etc.).
 *
 * LOGO: public/logo/ + logoFilename
 * SOBRE: public/about/ + aboutImageFilename
 * Contato: altere whatsapp e instagram abaixo.
 */

/** WhatsApp: use variável de ambiente VITE_WHATSAPP (ex: 5511999999999) ou altere o fallback abaixo. */
const whatsappNumber = import.meta.env.VITE_WHATSAPP || '5511999999999';

export const stampo = {
  name: 'Stampô',
  whatsapp: whatsappNumber,
  whatsappDisplay: '(11) 99999-9999',
  email: 'contato@stampo.com.br',
  instagram: 'https://www.instagram.com/stampopersonalizados?igsh=c2F6anFieW5qbDg3&utm_source=qr',
  city: 'Brasil',
  /** Opcional: exibido na página Contato */
  address: '',
  hours: 'Atendimento por WhatsApp e e-mail.',
};

export const LOGO_FOLDER = '/logo/';

/** Nome do arquivo da logo (deve estar em public/logo/). */
export const logoFilename = 'logo.png';

/** Logo para o rodapé (versão clara sobre fundo escuro). */
export const footerLogoFilename = 'logo-versão-para-rodapé.png';

export const ABOUT_FOLDER = '/about/';

/** Nome do arquivo da foto da seção Sobre (deve estar em public/about/). */
export const aboutImageFilename = 'criadores.png';

/** Imagem padrão quando banner/sobre não carregam. */
export const DEFAULT_HERO_IMAGE = 'https://images.unsplash.com/photo-1594932224010-75f4393932fa?auto=format&fit=crop&q=80&w=2000';

/** URL base do site (para Schema.org, sitemap, compartilhar). */
export const siteUrl = import.meta.env.VITE_SITE_URL || 'https://site-stampo.vercel.app';
