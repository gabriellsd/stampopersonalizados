import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, Instagram, Menu, X, ShoppingBag } from 'lucide-react';
import { LOGO_FOLDER, logoFilename, stampo } from '../data/site';
import { navLinks, getNavHref } from '../data/nav';
import { useCart } from '../context/CartContext';
import { ProductModal } from './ProductModal';
import { CartDrawer } from './CartDrawer';
import { Toast } from './Toast';
import { FixedButtons } from './FixedButtons';

export function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartTotalQty, setCartOpen } = useCart();
  const location = useLocation();
  const openCart = () => setCartOpen(true);

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
      <nav className="fixed w-full z-40 transition-all duration-300 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-14 items-center">
            <Link to="/" className="flex items-center h-9">
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
                  className="text-gray-600 hover:text-brand-purple transition"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={openCart}
                aria-label="Abrir meu pedido"
                className="relative p-2 text-gray-700 hover:text-brand-purple transition"
              >
                <ShoppingBag className="w-6 h-6" />
                {cartTotalQty > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-purple text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1">
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
          <div className="md:hidden bg-white border-t border-stone-200 px-6 py-6 flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={getNavHref(link)}
                onClick={() => handleNavClick(link)}
                className="text-gray-600 hover:text-brand-purple font-medium py-2"
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
        )}
      </nav>

      <main className="pt-14 flex-1 flex flex-col">
        {children}
      </main>

      <ProductModal />
      <CartDrawer />
      <Toast />
      <FixedButtons />

      <footer className="border-t border-brand-purple/30 bg-brand-purple-dark text-white py-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <Link to="/" className="inline-block">
                <img
                  src={`${LOGO_FOLDER}${logoFilename}`}
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
              <p className="text-brand-purple-light text-sm mt-3 max-w-sm">Camisaria masculina premium. Peças pensadas para durar e valorizar o seu estilo.</p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Links</h4>
              <ul className="space-y-2 text-sm">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={getNavHref(link)} className="text-brand-purple-light hover:text-white transition">{link.name}</Link>
                  </li>
                ))}
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
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-brand-purple/50">
            <p className="text-white/90 text-xs">© {new Date().getFullYear()} {stampo.name}. Todos os direitos reservados.</p>
            <div className="flex gap-6">
              <a href={`https://wa.me/${stampo.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-white/90 hover:text-green-400 transition">
                <MessageCircle className="w-6 h-6" />
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
