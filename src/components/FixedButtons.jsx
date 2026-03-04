import React from 'react';
import { MessageCircle } from 'lucide-react';
import { stampo } from '../data/site';

export function FixedButtons() {
  return (
    <>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Voltar ao topo"
        className="fixed bottom-6 left-6 w-11 h-11 bg-brand-purple text-white rounded-full shadow-lg shadow-brand-purple/30 flex items-center justify-center z-30 hover:bg-brand-purple-dark transition"
      >
        <span className="text-lg leading-none">↑</span>
      </button>
      <a
        href={`https://wa.me/${stampo.whatsapp}?text=Olá%20Stampô%2C%20gostaria%20de%20solicitar%20um%20orçamento!`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale conosco no WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-xl hover:bg-green-600 hover:scale-110 transition-all"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </>
  );
}
