import React, { useState, useEffect } from 'react';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getProductImageList } from '../utils/product';
import { LOGO_FOLDER, logoFilename, stampo } from '../data/site';

export function ProductModal() {
  const {
    modalProduct,
    closeModal,
    addToCart,
    selectedSize,
    setSelectedSize,
    SIZES,
    PLACEHOLDER_IMAGE,
    fmt,
  } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const imageList = modalProduct ? getProductImageList(modalProduct) : [];
  const hasMultipleImages = imageList.length > 1;

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [modalProduct?.id]);

  return (
    <div
      className={`fixed inset-0 bg-white z-[70] overflow-y-auto flex flex-col transition-all duration-300 ${
        modalProduct ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`}
    >
      {modalProduct && (
        <>
          <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b flex justify-between items-center z-10">
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-black flex items-center gap-2 text-xs uppercase tracking-widest font-bold transition"
            >
              <ArrowLeft className="w-4 h-4" /> Catálogo
            </button>
            <img
              src={`${LOGO_FOLDER}${logoFilename}`}
              alt={stampo.name}
              className="h-7 w-auto object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                const fallback = e.target.nextElementSibling;
                if (fallback) fallback.style.display = 'inline';
              }}
            />
            <span className="text-sm font-bold tracking-[0.35em] uppercase text-gray-300 hidden" aria-hidden="true">
              {stampo.name}
            </span>
          </div>
          <div className="max-w-6xl mx-auto px-4 py-10 md:py-16 flex flex-col md:flex-row gap-10 md:gap-16">
            <div className="w-full md:w-1/2 flex-shrink-0 space-y-3">
              <img
                src={imageList[selectedImageIndex] || imageList[0]}
                alt={modalProduct.name}
                className="w-full rounded-2xl shadow-xl object-cover aspect-[3/4]"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = PLACEHOLDER_IMAGE;
                }}
              />
              {hasMultipleImages && (
                <div className="flex gap-2 justify-center flex-wrap">
                  {imageList.map((src, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedImageIndex(i)}
                      className={`w-14 h-14 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                        i === selectedImageIndex
                          ? 'border-brand-purple ring-2 ring-brand-purple/30'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <img
                        src={src}
                        alt={`${modalProduct.name} ${i + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = PLACEHOLDER_IMAGE;
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
        <div className="w-full md:w-1/2 space-y-7">
          <div>
            <span className="text-brand-purple text-[10px] font-bold uppercase tracking-[0.25em]">
              {modalProduct.categoryLabel}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 leading-tight">{modalProduct.name}</h2>
            <p className="text-2xl font-light text-gray-400 mt-3">
              R$ {fmt(modalProduct.price)}
              {modalProduct.originalPrice && (
                <span className="text-lg line-through ml-2">R$ {fmt(modalProduct.originalPrice)}</span>
              )}
            </p>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Sobre a Peça</h4>
            <p className="text-gray-600 text-sm leading-relaxed">{modalProduct.desc}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 border-y py-6">
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Composição</h4>
              <p className="text-sm">{modalProduct.composition}</p>
            </div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Corte</h4>
              <p className="text-sm">{modalProduct.fit}</p>
            </div>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest mb-3">Selecione o Tamanho</h4>
            <div className="flex gap-2">
              {SIZES.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 border text-sm font-bold rounded transition-all ${
                    selectedSize === size
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {!selectedSize && (
              <p className="text-red-500 text-xs mt-2">Selecione um tamanho para continuar.</p>
            )}
          </div>
          <button
            type="button"
            onClick={addToCart}
            className="w-full bg-gray-900 text-white py-5 rounded-xl font-bold hover:bg-gray-800 active:scale-[0.98] transition-all shadow-lg flex items-center justify-center gap-3 text-sm uppercase tracking-widest"
          >
            <ShoppingBag className="w-5 h-5" /> Adicionar ao Pedido
          </button>
        </div>
      </div>
        </>
      )}
    </div>
  );
}
