import React from 'react';
import { X, ShoppingBag, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function CartDrawer() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    cartTotalQty,
    cartTotalPrice,
    changeQty,
    clearCart,
    checkoutWhatsApp,
    fmt,
    PLACEHOLDER_IMAGE,
  } = useCart();

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-[60] transition-opacity duration-300 md:bg-transparent ${
          cartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setCartOpen(false)}
        aria-hidden
      />
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-[70] shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          cartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="px-6 py-5 border-b flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold">Meu Pedido</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {cartTotalQty} {cartTotalQty === 1 ? 'peça' : 'peças'}
            </p>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            aria-label="Fechar carrinho"
            className="text-gray-400 hover:text-black text-2xl p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {!cart.length ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <ShoppingBag className="w-14 h-14 text-gray-200 mb-4" />
              <p className="text-sm text-gray-500 font-medium">Nenhuma peça adicionada.</p>
              <p className="text-xs text-gray-400 mt-1">Explore o catálogo e monte seu pedido.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.key}
                  className="flex gap-4 items-start py-3 border-b border-gray-100 last:border-b-0"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-14 h-20 object-cover rounded-lg flex-shrink-0 shadow-sm"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = PLACEHOLDER_IMAGE;
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs leading-snug">{item.name}</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">Tam. {item.size}</p>
                    <p className="text-xs font-semibold text-brand-purple mt-1">
                      R$ {fmt(item.price * item.quantity)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => changeQty(item.key, -1)}
                      className="w-7 h-7 border border-gray-200 rounded text-base font-bold hover:border-gray-400 transition flex items-center justify-center leading-none"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm font-bold">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => changeQty(item.key, 1)}
                      className="w-7 h-7 border border-gray-200 rounded text-base font-bold hover:border-gray-400 transition flex items-center justify-center leading-none"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="px-6 py-5 border-t bg-gray-50 space-y-4">
          <div className="flex justify-between items-baseline">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Total Estimado</span>
            <span className="text-2xl font-bold">R$ {fmt(cartTotalPrice)}</span>
          </div>
          <button
            type="button"
            onClick={checkoutWhatsApp}
            className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-sm"
          >
            <MessageCircle className="w-5 h-5" /> Finalizar Orçamento
          </button>
          <button
            type="button"
            onClick={clearCart}
            className="w-full text-gray-400 hover:text-red-500 text-xs uppercase tracking-widest transition py-1"
          >
            Limpar Pedido
          </button>
        </div>
      </div>
    </>
  );
}
