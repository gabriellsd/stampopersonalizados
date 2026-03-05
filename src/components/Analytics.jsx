import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const GA_ID = import.meta.env.VITE_GA_ID;

/**
 * Carrega Google Analytics 4 quando VITE_GA_ID está definido.
 * Adicione no .env: VITE_GA_ID=G-XXXXXXXXXX
 */
export function Analytics() {
  const location = useLocation();
  const loaded = useRef(false);

  useEffect(() => {
    if (!GA_ID || typeof document === 'undefined') return;
    if (loaded.current) return;
    loaded.current = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!GA_ID || typeof window === 'undefined' || !window.gtag) return;
    window.gtag('config', GA_ID, { page_path: location.pathname + location.search });
  }, [location.pathname, location.search]);

  return null;
}
