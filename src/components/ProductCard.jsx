import React, { useState, useRef, useEffect } from 'react';
import { getProductImageList, PLACEHOLDER_IMAGE } from '../utils/product';
import { fmt } from '../utils/format';

const CYCLE_MS = 3500;

export function ProductCard({ product, onOpen }) {
  const [imageIndex, setImageIndex] = useState(0);
  const imageList = getProductImageList(product);
  const hasMultiple = imageList.length > 1;

  useEffect(() => {
    if (!hasMultiple || imageList.length === 0) return;
    const id = setInterval(() => {
      setImageIndex((i) => (i + 1) % imageList.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [hasMultiple, imageList.length]);

  return (
    <button
      type="button"
      onClick={() => onOpen(product)}
      className="group text-left rounded-lg overflow-hidden border border-brand-purple/20 bg-white hover:border-brand-purple/40 hover:shadow-md transition-all"
    >
      <div className="aspect-[4/5] overflow-hidden bg-gray-100 relative">
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
          <span className="bg-white text-gray-900 text-[9px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
            Ver detalhes
          </span>
        </div>
      </div>
      <div className="pt-3 pb-3 px-3">
        <p className="text-brand-purple text-[9px] font-bold uppercase tracking-widest mb-0.5">
          {product.categoryLabel}
        </p>
        <h3 className="font-bold text-xs leading-snug mb-1">{product.name}</h3>
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
