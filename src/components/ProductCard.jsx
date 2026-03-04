import React, { useState, useRef, useEffect } from 'react';
import { getProductImageList, PLACEHOLDER_IMAGE } from '../utils/product';
import { fmt } from '../utils/format';

const HOVER_CYCLE_MS = 2500;

export function ProductCard({ product, onOpen }) {
  const [imageIndex, setImageIndex] = useState(0);
  const intervalRef = useRef(null);

  const imageList = getProductImageList(product);
  const hasMultiple = imageList.length > 1;

  const clearCycle = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setImageIndex(0);
  };

  const startCycle = () => {
    if (!hasMultiple) return;
    clearCycle();
    intervalRef.current = setInterval(() => {
      setImageIndex((i) => (i + 1) % imageList.length);
    }, HOVER_CYCLE_MS);
  };

  useEffect(() => () => clearCycle(), [product.id]);

  return (
    <button
      type="button"
      onClick={() => onOpen(product)}
      onMouseEnter={startCycle}
      onMouseLeave={clearCycle}
      className="group text-left rounded-xl overflow-hidden border-2 border-brand-purple/20 bg-white hover:border-brand-purple/50 hover:shadow-lg hover:shadow-brand-purple/10 transition-all"
    >
      <div className="aspect-[3/4] overflow-hidden bg-gray-100 relative">
        <img
          src={imageList[imageIndex]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = PLACEHOLDER_IMAGE;
          }}
        />
        {product.badge === 'novo' && (
          <span className="absolute top-3 left-3 bg-gray-900 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded">
            Novo
          </span>
        )}
        {product.badge === 'promo' && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded">
            Promo
          </span>
        )}
        {hasMultiple && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {imageList.map((_, i) => (
              <span
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === imageIndex ? 'bg-white scale-125' : 'bg-white/50'
                }`}
                aria-hidden
              />
            ))}
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
          <span className="bg-white text-gray-900 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
            Ver Detalhes
          </span>
        </div>
      </div>
      <div className="pt-4 pb-4 px-4">
        <p className="text-brand-purple text-[9px] font-bold uppercase tracking-widest mb-1">
          {product.categoryLabel}
        </p>
        <h3 className="font-bold text-sm leading-snug mb-2">{product.name}</h3>
        {product.originalPrice ? (
          <p className="font-semibold text-sm text-gray-800">
            R$ {fmt(product.price)}{' '}
            <span className="text-gray-400 text-xs line-through ml-1">R$ {fmt(product.originalPrice)}</span>
          </p>
        ) : (
          <p className="font-semibold text-sm text-gray-800">R$ {fmt(product.price)}</p>
        )}
      </div>
    </button>
  );
}
