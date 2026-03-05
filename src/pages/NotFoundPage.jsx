import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="bg-brand-orange-light/50 flex-1 flex flex-col items-center justify-center min-h-[60vh] px-4">
      <p className="text-6xl md:text-8xl font-bold text-brand-purple/20 mb-4">404</p>
      <h1 className="text-xl md:text-2xl font-bold text-brand-purple-dark mb-2">Página não encontrada</h1>
      <p className="text-gray-600 text-sm text-center max-w-md mb-8">
        O link que você acessou não existe ou foi movido. Volte ao início e continue navegando.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-brand-purple text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-brand-purple-dark transition"
      >
        <Home className="w-4 h-4" /> Voltar ao início
      </Link>
    </div>
  );
}
