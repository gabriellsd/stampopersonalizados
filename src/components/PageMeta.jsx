import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { siteUrl } from '../data/site';

/**
 * Define título, descrição e Open Graph por página (SEO e compartilhamento).
 * Uso: <PageMeta title="Título" description="Descrição" ogImage="/caminho.jpg" />
 */
export function PageMeta({ title, description, ogImage }) {
  const location = useLocation();
  const url = `${siteUrl}${location.pathname}`;

  useEffect(() => {
    const prevTitle = document.title;
    const prevDesc = document.querySelector('meta[name="description"]')?.getAttribute('content');

    if (title) document.title = title;
    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'description';
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', description);
    }

    const setMeta = (property, content) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };
    if (title) setMeta('og:title', title);
    if (description) setMeta('og:description', description);
    setMeta('og:url', url);
    setMeta('og:image', ogImage ? (ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`) : `${siteUrl}/logo/logo.png`);
    setMeta('og:type', 'website');
    setMeta('og:locale', 'pt_BR');

    return () => {
      if (title) document.title = prevTitle;
      if (description && prevDesc) {
        const m = document.querySelector('meta[name="description"]');
        if (m) m.setAttribute('content', prevDesc);
      }
    };
  }, [title, description, ogImage, location.pathname]);
  return null;
}
