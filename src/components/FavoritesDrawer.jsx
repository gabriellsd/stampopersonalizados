import React, { useEffect, useRef } from 'react';
import { X, Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { getProductImage, PLACEHOLDER_IMAGE } from '../utils/product';
import { fmt } from '../utils/format';

export function FavoritesDrawer({ open, onClose }) {
  const { favorites, toggle } = useFavorites();
  const { openProduct } = useCart();
  const drawerRef = useRef(null);

  useEffect(() => {
    if (!open || !drawerRef.current) return;
    const focusables = drawerRef.current.querySelectorAll('button, [href]');
    if (focusables[0]) focusables[0].focus();
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label="Fechar favoritos"
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-[55] transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-[60] shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-modal="true"
        aria-hidden={!open}
        aria-label="Lista de favoritos"
      >
        <div className="px-4 sm:px-6 py-5 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-2 min-w-0">
            <Heart className="w-5 h-5 text-red-500 fill-red-500 flex-shrink-0" />
            <h2 className="text-lg font-bold truncate">Favoritos</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="flex-shrink-0 p-2 text-gray-400 hover:text-black transition rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 min-w-0">
          {favorites.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-12">Nenhum favorito ainda. Clique no coração nos produtos.</p>
          ) : (
            <ul className="space-y-3">
              {favorites.map((p) => (
                <li key={p.id} className="flex gap-3 items-center border-b border-gray-100 pb-3 last:border-0">
                  <button
                    type="button"
                    onClick={() => { openProduct(p); onClose(); }}
                    className="flex-1 flex gap-3 text-left hover:opacity-90"
                  >
                    <img
                      src={getProductImage(p)}
                      alt=""
                      className="w-14 h-14 object-cover rounded-lg flex-shrink-0"
                      onError={(e) => { e.target.onerror = null; e.target.src = PLACEHOLDER_IMAGE; }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-xs truncate">{p.name}</p>
                      <p className="text-brand-purple text-xs">R$ {fmt(p.price)}</p>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => toggle(p.id)}
                    aria-label="Remover dos favoritos"
                    className="p-1 text-red-500 hover:bg-red-50 rounded"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
