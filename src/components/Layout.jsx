import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Instagram, Menu, X, ShoppingBag, Heart } from 'lucide-react';
import { LOGO_FOLDER, logoFilename, footerLogoFilename, stampo } from '../data/site';
import { navLinks, getNavHref } from '../data/nav';
import { useCart } from '../context/CartContext';
import { ProductModal } from './ProductModal';
import { CartDrawer } from './CartDrawer';
import { Toast } from './Toast';
import { FixedButtons, WhatsAppIcon } from './FixedButtons';
import { FavoritesDrawer } from './FavoritesDrawer';
import { SchemaOrg } from './SchemaOrg';
import { NewsletterForm } from './NewsletterForm';
import { CookieBanner } from './CookieBanner';
import { useFavorites } from '../context/FavoritesContext';

export function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [favOpen, setFavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartTotalQty, setCartOpen, setAnnouncement, announcement, modalProduct } = useCart();
  const { favIds } = useFavorites();
  const location = useLocation();
  const openCart = () => {
    setAnnouncement?.('Carrinho aberto');
    setCartOpen(true);
  };

  const isActiveNav = (link) => {
    if (location.pathname !== link.path) return false;
    const currentHash = location.hash || '';
    const linkHash = link.hash || '';
    return currentHash === linkHash;
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onEscape = (e) => { if (e.key === 'Escape') setIsMenuOpen(false); };
    if (isMenuOpen) {
      document.addEventListener('keydown', onEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', onEscape);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleNavClick = (link) => {
    if (location.pathname === link.path) {
      if (link.hash) {
        const el = document.getElementById(link.hash.slice(1));
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (location.hash && location.pathname === '/') {
      const id = location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <a
        href="#main-content"
        className="absolute -left-[10000px] top-4 z-[100] px-4 py-2 bg-brand-purple text-white rounded font-medium text-sm focus:left-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-purple transition-[left]"
      >
        Pular para o conteúdo
      </a>
      <nav className={`fixed w-full z-40 transition-all duration-300 bg-white border-b border-stone-200 ${scrolled ? 'shadow-md shadow-black/5' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-14 items-center">
            <Link
              to="/"
              onClick={() => { if (location.pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' }); setIsMenuOpen(false); }}
              className="flex items-center h-9"
            >
              <img
                src={`${LOGO_FOLDER}${logoFilename}`}
                alt={stampo.name}
                className="h-8 w-auto object-contain max-w-[180px]"
                onError={(e) => {
                  e.target.style.display = 'none';
                  const fallback = e.target.nextElementSibling;
                  if (fallback) fallback.style.display = 'block';
                }}
              />
              <span className="text-xl font-bold tracking-widest text-gray-900 uppercase hidden" aria-hidden="true">
                {stampo.name}<span className="text-brand-purple">.</span>
              </span>
            </Link>
            <div className="hidden md:flex space-x-10 text-[11px] font-bold uppercase tracking-[0.2em]">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={getNavHref(link)}
                  onClick={() => handleNavClick(link)}
                  className={`transition ${isActiveNav(link) ? 'text-brand-purple border-b-2 border-brand-purple pb-0.5' : 'text-gray-600 hover:text-brand-purple'}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setFavOpen(true)}
                aria-label="Ver favoritos"
                className="relative p-2 text-gray-700 hover:text-red-500 transition"
              >
                <Heart className="w-5 h-5" />
                {favIds.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] font-bold min-w-[14px] h-[14px] rounded-full flex items-center justify-center">
                    {favIds.length}
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={openCart}
                aria-label="Abrir meu pedido"
                className="relative p-2 text-gray-700 hover:text-brand-purple transition"
              >
                <ShoppingBag className="w-6 h-6" />
                {cartTotalQty > 0 && (
                  <span key={cartTotalQty} className="absolute -top-1 -right-1 bg-brand-purple text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1 animate-cart-badge">
                    {cartTotalQty}
                  </span>
                )}
              </button>
              <button
                type="button"
                className="md:hidden p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Abrir menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <>
            <button
              type="button"
              aria-label="Fechar menu"
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/30 md:hidden"
            />
            <div className="md:hidden bg-white border-t border-stone-200 px-6 py-6 flex flex-col space-y-2 relative z-50 menu-mobile-enter">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={getNavHref(link)}
                  onClick={() => handleNavClick(link)}
                  className={`font-medium py-2 ${isActiveNav(link) ? 'text-brand-purple' : 'text-gray-600 hover:text-brand-purple'}`}
                >
                  {link.name}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => { setIsMenuOpen(false); openCart(); }}
                className="text-left text-gray-600 hover:text-brand-purple font-medium py-2 flex items-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" /> Meu Pedido
              </button>
            </div>
          </>
        )}
      </nav>

      <SchemaOrg product={modalProduct} />
      <div id="a11y-announcer" aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </div>
      <main id="main-content" className="pt-14 flex-1 flex flex-col" tabIndex={-1}>
        {children}
      </main>

      <ProductModal />
      <CartDrawer />
      <FavoritesDrawer open={favOpen} onClose={() => setFavOpen(false)} />
      <Toast />
      <FixedButtons />
      <CookieBanner />

      <footer className="border-t border-brand-purple/30 bg-brand-purple-dark text-white py-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
            <div className="md:col-span-2">
              <Link
                to="/"
                onClick={() => { if (location.pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="inline-block"
              >
                <img
                  src={`${LOGO_FOLDER}${footerLogoFilename}`}
                  alt={stampo.name}
                  className="h-10 w-auto object-contain max-w-[200px]"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const fallback = e.target.nextElementSibling;
                    if (fallback) fallback.style.display = 'inline';
                  }}
                />
                <span className="text-2xl font-bold tracking-widest uppercase text-white hidden" aria-hidden="true">{stampo.name}<span className="text-brand-purple/80">.</span></span>
              </Link>
              <p className="text-brand-purple-light text-sm mt-3 max-w-sm">Coleção oversized e estampas personalizadas. Do primeiro clique ao seu pedido, a Stampô com você.</p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Links</h4>
              <ul className="space-y-2 text-sm">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={getNavHref(link)} className="text-brand-purple-light hover:text-white transition">{link.name}</Link>
                  </li>
                ))}
                <li><Link to="/privacidade" className="text-brand-purple-light hover:text-white transition">Privacidade</Link></li>
                <li><Link to="/termos" className="text-brand-purple-light hover:text-white transition">Termos de uso</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Contato</h4>
              <a
                href={`https://wa.me/${stampo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-purple-light hover:text-green-400 transition text-sm flex items-center gap-2"
              >
                <WhatsAppIcon className="w-4 h-4" /> WhatsApp
              </a>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Newsletter</h4>
              <NewsletterForm />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-brand-purple/50">
            <p className="text-white/90 text-xs">© {new Date().getFullYear()} {stampo.name}. Todos os direitos reservados.</p>
            <div className="flex gap-6">
              <a href={`https://wa.me/${stampo.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-white/90 hover:text-green-400 transition">
                <WhatsAppIcon className="w-6 h-6" />
              </a>
              <a href={stampo.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/90 hover:text-pink-400 transition">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
