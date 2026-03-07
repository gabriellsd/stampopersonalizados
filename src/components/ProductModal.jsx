import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Copy, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getProductImageList, PLACEHOLDER_IMAGE } from '../utils/product';
import { LOGO_FOLDER, logoFilename, stampo, siteUrl } from '../data/site';
import { getProductImage } from '../utils/product';
import { ImageWithLoader } from './ImageWithLoader';
import { products } from '../data/products';
import { WhatsAppIcon } from './FixedButtons';

export function ProductModal() {
  const {
    modalProduct,
    closeModal,
    openProduct,
    addToCart,
    addingToCart,
    selectedSize,
    setSelectedSize,
    showToast,
    SIZES,
    PLACEHOLDER_IMAGE,
    fmt,
  } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [zoom, setZoom] = useState({ x: 50, y: 50, visible: false });
  const modalRef = useRef(null);
  const imageWrapRef = useRef(null);

  const imageList = modalProduct ? getProductImageList(modalProduct) : [];
  const hasMultipleImages = imageList.length > 1;
  const mainImageSrc = imageList[selectedImageIndex] || imageList[0];

  const handleImageMouseMove = (e) => {
    const el = imageWrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoom({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)), visible: true });
  };

  const handleImageMouseLeave = () => setZoom((z) => ({ ...z, visible: false }));

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [modalProduct?.id]);

  useEffect(() => {
    if (!modalProduct || !modalRef.current) return;
    const el = modalRef.current;
    const focusables = el.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const first = focusables[0];
    if (first) first.focus();
    const onKeyDown = (e) => {
      if (e.key !== 'Tab') return;
      const list = [...focusables];
      const idx = list.indexOf(document.activeElement);
      if (idx === -1) return;
      if (e.shiftKey) {
        if (idx === 0) {
          e.preventDefault();
          list[list.length - 1].focus();
        }
      } else {
        if (idx === list.length - 1) {
          e.preventDefault();
          list[0].focus();
        }
      }
    };
    el.addEventListener('keydown', onKeyDown);
    return () => el.removeEventListener('keydown', onKeyDown);
  }, [modalProduct?.id]);

  const shareUrl = modalProduct ? `${siteUrl}/#collection` : '';
  const shareText = modalProduct ? `Olha essa peça da Stampô: ${modalProduct.name} — R$ ${fmt(modalProduct.price)}` : '';

  const relatedProducts = modalProduct
    ? products.filter((p) => p.category === modalProduct.category && p.id !== modalProduct.id).slice(0, 3)
    : [];

  const handleCopyLink = () => {
    if (!shareUrl) return;
    navigator.clipboard?.writeText(shareUrl).then(() => showToast('Link copiado!')).catch(() => {});
  };

  const handleShareWhatsApp = () => {
    if (!modalProduct) return;
    const url = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
    window.open(url, '_blank');
  };

  return (
    <div
      className={`fixed inset-0 bg-white z-[70] overflow-y-auto overflow-x-hidden flex flex-col transition-all duration-300 ${
        modalProduct ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`}
    >
      {modalProduct && (
        <div ref={modalRef}>
          <div className="sticky top-0 bg-white/95 backdrop-blur-md px-4 sm:px-6 py-3 border-b border-gray-100 flex justify-between items-center z-10">
            <button
              onClick={closeModal}
              className="flex-shrink-0 p-2 -ml-2 text-gray-400 hover:text-black flex items-center gap-2 text-xs uppercase tracking-widest font-bold transition rounded-lg hover:bg-gray-100"
            >
              <ArrowLeft className="w-4 h-4" /> Catálogo
            </button>
            <Link
              to="/"
              onClick={() => { closeModal(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center"
              aria-label="Voltar ao início"
            >
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
            </Link>
          </div>
          <nav aria-label="Navegação" className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-4 text-[11px] text-gray-500 min-w-0">
            <Link to="/" onClick={() => { closeModal(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-brand-purple">Início</Link>
            <span className="mx-2">/</span>
            <button type="button" onClick={closeModal} className="hover:text-brand-purple">Coleção</button>
            <span className="mx-2">/</span>
            <span className="text-gray-700 font-medium truncate max-w-[50vw] sm:max-w-none inline-block align-bottom">{modalProduct.name}</span>
          </nav>
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-10 relative flex flex-col md:flex-row gap-6 md:gap-10 box-border">
            <div className="w-full md:w-1/2 flex-shrink-0 min-w-0 space-y-3">
              <div className="relative">
                <div
                  ref={imageWrapRef}
                  onMouseMove={handleImageMouseMove}
                  onMouseLeave={handleImageMouseLeave}
                  className="relative w-full rounded-2xl overflow-hidden bg-gray-100 aspect-[3/4]"
                >
                  <ImageWithLoader
                    src={mainImageSrc}
                    alt={modalProduct.name}
                    className="w-full h-full object-cover pointer-events-none transition-transform duration-150 ease-out"
                    style={
                      zoom.visible
                        ? {
                            transform: `scale(2.8)`,
                            transformOrigin: `${zoom.x}% ${zoom.y}%`,
                          }
                        : undefined
                    }
                    fetchPriority="high"
                    wrapperClassName="!min-h-0 absolute inset-0"
                  />
                </div>
              </div>
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
                        loading="lazy"
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
        <div className="w-full md:w-1/2 min-w-0 flex flex-col space-y-5">
          <div>
            <span className="text-brand-purple text-[9px] font-bold uppercase tracking-[0.2em]">
              {modalProduct.categoryLabel}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mt-1.5 leading-tight">{modalProduct.name}</h2>
            <p className="text-xl font-light text-gray-400 mt-2">
              R$ {fmt(modalProduct.price)}
              {modalProduct.originalPrice && (
                <span className="text-sm line-through ml-2">R$ {fmt(modalProduct.originalPrice)}</span>
              )}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[9px] uppercase tracking-widest text-gray-400">Compartilhar</span>
              <button type="button" onClick={handleCopyLink} className="p-2 rounded-lg border border-gray-200 hover:border-brand-purple hover:text-brand-purple transition" aria-label="Copiar link">
                <Copy className="w-4 h-4" />
              </button>
              <button type="button" onClick={handleShareWhatsApp} className="p-2 rounded-lg border border-gray-200 hover:border-green-500 hover:text-green-600 transition flex items-center gap-1" aria-label="Enviar por WhatsApp">
                <WhatsAppIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div>
            <h4 className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Sobre a Peça</h4>
            <p className="text-gray-600 text-xs leading-relaxed">{modalProduct.desc}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 border-y py-4">
            <div>
              <h4 className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Composição</h4>
              <p className="text-xs">{modalProduct.composition}</p>
            </div>
            <div>
              <h4 className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Corte</h4>
              <p className="text-xs">{modalProduct.fit}</p>
            </div>
          </div>
          <div>
            <h4 className="text-[9px] font-bold uppercase tracking-widest mb-2">Selecione o Tamanho</h4>
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
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Tabela de referência (cm)</p>
              <div className="overflow-x-auto">
                <table className="w-full text-[11px] text-gray-600 min-w-[200px]">
                  <thead>
                    <tr>
                      <th className="text-left py-1 pr-2 font-semibold text-gray-500">Tamanho</th>
                      <th className="text-center py-1 px-1 font-semibold text-gray-500">P</th>
                      <th className="text-center py-1 px-1 font-semibold text-gray-500">M</th>
                      <th className="text-center py-1 px-1 font-semibold text-gray-500">G</th>
                      <th className="text-center py-1 px-1 font-semibold text-gray-500">GG</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="py-0.5 pr-2">Busto</td><td className="text-center px-1">96-100</td><td className="text-center px-1">100-104</td><td className="text-center px-1">104-108</td><td className="text-center px-1">108-112</td></tr>
                    <tr><td className="py-0.5 pr-2">Compr.</td><td className="text-center px-1">68</td><td className="text-center px-1">70</td><td className="text-center px-1">72</td><td className="text-center px-1">74</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[10px] text-gray-400 mt-1.5">Caimento oversized. Em dúvida, chame no WhatsApp.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={addToCart}
            disabled={!selectedSize || addingToCart}
            className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-gray-800 active:scale-[0.98] transition-all shadow-lg flex items-center justify-center gap-2 text-xs uppercase tracking-widest disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {addingToCart ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Adicionando...</>
            ) : (
              <><ShoppingBag className="w-5 h-5" /> Adicionar ao Pedido</>
            )}
          </button>
          {relatedProducts.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-3">Você também pode gostar</h4>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {relatedProducts.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => { setSelectedSize(null); openProduct(p); }}
                    className="flex-shrink-0 w-28 text-left group"
                  >
                    <div className="aspect-[4/5] rounded-lg overflow-hidden bg-gray-100 border border-gray-200 group-hover:border-brand-purple/50 transition">
                      <img
                        src={getProductImage(p)}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                        onError={(e) => { e.target.onerror = null; e.target.src = PLACEHOLDER_IMAGE; }}
                      />
                    </div>
                    <p className="text-xs font-semibold mt-1.5 truncate">{p.name}</p>
                    <p className="text-xs text-brand-purple">R$ {fmt(p.price)}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
        </div>
      )}
    </div>
  );
}
