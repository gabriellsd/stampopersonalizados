import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'stampo_cookies_consent';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(STORAGE_KEY);
      if (!consent) setVisible(true);
    } catch (_) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'accepted');
      setVisible(false);
    } catch (_) {}
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[80] bg-white border-t border-gray-200 shadow-lg px-4 py-4 md:px-6 md:py-5"
      role="dialog"
      aria-label="Aviso de cookies"
    >
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-sm text-gray-700">
          Usamos cookies para melhorar sua experiência e analisar o uso do site. Ao continuar, você concorda com nossa{' '}
          <Link to="/privacidade" className="text-brand-purple font-medium hover:underline">
            Política de Privacidade
          </Link>
          .
        </p>
        <div className="flex flex-shrink-0 gap-2">
          <Link
            to="/privacidade"
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition"
          >
            Saiba mais
          </Link>
          <button
            type="button"
            onClick={accept}
            className="px-4 py-2 bg-brand-purple text-white text-sm font-semibold rounded-lg hover:bg-brand-purple-dark transition"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}
