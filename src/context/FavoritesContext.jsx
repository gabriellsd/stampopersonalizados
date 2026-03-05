import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { products } from '../data/products';

const STORAGE_FAV = 'stampo_favorites';

const FavoritesContext = createContext(null);

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites deve ser usado dentro de FavoritesProvider');
  return ctx;
}

export function FavoritesProvider({ children }) {
  const [favIds, setFavIds] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_FAV);
      if (raw) setFavIds(JSON.parse(raw));
    } catch (_) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_FAV, JSON.stringify(favIds));
    } catch (_) {}
  }, [favIds]);

  const toggle = useCallback((productId) => {
    setFavIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  }, []);

  const isFavorite = useCallback((productId) => favIds.includes(productId), [favIds]);

  const favorites = products.filter((p) => favIds.includes(p.id));

  const value = { favorites, favIds, toggle, isFavorite };
  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}
