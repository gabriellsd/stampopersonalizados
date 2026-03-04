import React from 'react';
import { useCart } from '../context/CartContext';

export function Toast() {
  const { toast } = useCart();

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] px-5 py-3 rounded-2xl shadow-xl bg-gray-900 text-white text-sm font-semibold flex items-center gap-3 transition-all duration-300 ${
        toast.show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">
        ✓
      </span>
      {toast.msg}
    </div>
  );
}
