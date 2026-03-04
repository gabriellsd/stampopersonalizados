import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
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

export function Collection() {
  const collectionRef = useReveal(0);
  const { openProduct } = useCart();
  const [filterCategory, setFilterCategory] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');

  const filteredProducts = useMemo(() => {
    let list = products.filter((p) => {
      const q = searchQuery.trim().toLowerCase();
      const matchSearch = !q || p.name.toLowerCase().includes(q);
      if (!matchSearch) return false;
      if (filterCategory === FILTER_LINHAS_STAMPO) {
        return p.linhaStampo === true;
      }
      if (filterCategory === FILTER_TODOS) return true;
      return p.category === filterCategory;
    });
    if (sortBy === 'price_asc') list = [...list].sort((a, b) => a.price - b.price);
    else if (sortBy === 'price_desc') list = [...list].sort((a, b) => b.price - a.price);
    else if (sortBy === 'new')
      list = [...list].sort((a, b) => (b.badge === 'novo' ? 1 : 0) - (a.badge === 'novo' ? 1 : 0));
    return list;
  }, [filterCategory, searchQuery, sortBy]);

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
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nome do produto..."
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/30 focus:border-brand-purple transition"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500 whitespace-nowrap">Ordenar por:</span>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} onOpen={openProduct} />
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-400 py-12">Nenhum produto encontrado para essa busca.</p>
        )}
      </div>
    </section>
  );
}
