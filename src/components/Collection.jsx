import React, { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Shirt, X } from 'lucide-react';
import { useReveal } from '../useReveal';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { ProductCard } from './ProductCard';

const FILTER_TODOS = 'todos';
const FILTER_LINHAS_STAMPO = 'linhas-stampo';
const FILTER_OVERSIZED = 'oversized';

const CATEGORIES = [
  { id: FILTER_TODOS, label: 'Todas' },
  { id: FILTER_LINHAS_STAMPO, label: 'Linhas Stampô' },
  { id: FILTER_OVERSIZED, label: 'Oversized' },
];

const PRICE_RANGES = [
  { id: '', label: 'Qualquer preço' },
  { id: 'ate-220', label: 'Até R$ 220', max: 220 },
  { id: '220-250', label: 'R$ 220 – R$ 250', min: 220, max: 250 },
  { id: 'acima-250', label: 'Acima de R$ 250', min: 250 },
];

const SKELETON_DELAY_MS = 280;

export function Collection() {
  const collectionRef = useReveal(0);
  const { openProduct } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();

  const filterCategory = searchParams.get('categoria') || 'todos';
  const searchQuery = searchParams.get('q') || '';
  const sortBy = searchParams.get('ordenar') || 'relevance';
  const priceRangeId = searchParams.get('preco') || '';
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowSkeleton(false), SKELETON_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  const setFilterCategory = (id) => {
    const p = new URLSearchParams(searchParams);
    p.set('categoria', id);
    setSearchParams(p);
  };
  const setSearchQuery = (q) => {
    const p = new URLSearchParams(searchParams);
    if (q.trim()) p.set('q', q.trim()); else p.delete('q');
    setSearchParams(p);
  };
  const setSortBy = (v) => {
    const p = new URLSearchParams(searchParams);
    if (v && v !== 'relevance') p.set('ordenar', v); else p.delete('ordenar');
    setSearchParams(p);
  };
  const setPriceRange = (id) => {
    const p = new URLSearchParams(searchParams);
    if (id) p.set('preco', id); else p.delete('preco');
    setSearchParams(p);
  };

  const priceRange = PRICE_RANGES.find((r) => r.id === priceRangeId);
  const hasActiveFilters = filterCategory !== FILTER_TODOS || searchQuery.trim() !== '' || priceRangeId !== '';

  const clearFilters = () => {
    setSearchParams({});
  };

  const filteredProducts = useMemo(() => {
    let list = products.filter((p) => {
      const q = searchQuery.trim().toLowerCase();
      const matchSearch = !q || p.name.toLowerCase().includes(q);
      if (!matchSearch) return false;
      if (filterCategory === FILTER_LINHAS_STAMPO) {
        if (p.linhaStampo !== true) return false;
      } else if (filterCategory !== FILTER_TODOS && p.category !== filterCategory) {
        return false;
      }
      if (priceRange) {
        if (priceRange.max != null && p.price > priceRange.max) return false;
        if (priceRange.min != null && p.price < priceRange.min) return false;
      }
      return true;
    });
    if (sortBy === 'price_asc') list = [...list].sort((a, b) => a.price - b.price);
    else if (sortBy === 'price_desc') list = [...list].sort((a, b) => b.price - a.price);
    else if (sortBy === 'new')
      list = [...list].sort((a, b) => (b.badge === 'novo' ? 1 : 0) - (a.badge === 'novo' ? 1 : 0));
    return list;
  }, [filterCategory, searchQuery, sortBy, priceRange]);

  return (
    <section id="collection" className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div ref={collectionRef} className="reveal">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-purple-dark mb-2">Coleção</h2>
          <p className="text-brand-purple/90 text-sm">Peças para vestir bem.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mb-8">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
              const p = new URLSearchParams(searchParams);
              const v = e.target.value;
              if (v.trim()) p.set('q', v); else p.delete('q');
              setSearchParams(p);
            }}
              aria-label="Buscar produtos"
              placeholder="Buscar por nome do produto..."
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/30 focus:border-brand-purple transition"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-medium text-gray-500 whitespace-nowrap">Preço:</span>
            <select
              value={priceRangeId}
              onChange={(e) => setPriceRange(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-purple/30 focus:border-brand-purple bg-white"
              aria-label="Filtrar por faixa de preço"
            >
              {PRICE_RANGES.map((r) => (
                <option key={r.id || 'any'} value={r.id}>{r.label}</option>
              ))}
            </select>
            <span className="text-xs font-medium text-gray-500 whitespace-nowrap">Ordenar:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-purple/30 focus:border-brand-purple bg-white"
            >
              <option value="relevance">Relevância</option>
              <option value="price_asc">Menor preço</option>
              <option value="price_desc">Maior preço</option>
              <option value="new">Novidades</option>
            </select>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-14 border-b border-gray-100 pb-4">
          {CATEGORIES.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setFilterCategory(id)}
              className={`text-[11px] uppercase tracking-widest font-bold py-2 border-b-2 transition ${
                filterCategory === id
                  ? 'border-brand-purple text-brand-purple-dark'
                  : 'border-transparent text-gray-500 hover:text-brand-purple'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        {hasActiveFilters && (
          <div className="flex justify-center mb-6">
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-2 text-sm text-brand-purple hover:text-brand-purple-dark font-medium"
            >
              <X className="w-4 h-4" /> Limpar filtros
            </button>
          </div>
        )}
        {showSkeleton ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8" aria-hidden>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-lg overflow-hidden border border-gray-100 bg-gray-50 animate-pulse">
                <div className="aspect-[4/5] bg-gray-200" />
                <div className="p-3 space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-1/3" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} onOpen={openProduct} />
          ))}
        </div>
        )}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 px-4">
            <Shirt className="w-16 h-16 text-gray-300 mx-auto mb-4" aria-hidden />
            <p className="text-gray-600 font-medium mb-1">Nenhum produto encontrado</p>
            <p className="text-gray-400 text-sm mb-6">Tente outros filtros ou busque por outro termo.</p>
            <button
              type="button"
              onClick={clearFilters}
              className="text-brand-purple font-semibold text-sm hover:underline"
            >
              Limpar filtros e ver todos
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
