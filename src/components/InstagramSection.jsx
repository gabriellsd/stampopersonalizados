import React from 'react';
import { Instagram } from 'lucide-react';
import { useReveal } from '../useReveal';
import { stampo } from '../data/site';

export function InstagramSection() {
  const sectionRef = useReveal(0);

  return (
    <section className="py-16 md:py-20">
      <div ref={sectionRef} className="reveal max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-brand-purple text-[10px] font-bold uppercase tracking-[0.3em] mb-2">Redes</p>
        <h2 className="text-2xl md:text-3xl font-bold text-brand-purple-dark mb-2">Nos siga no Instagram</h2>
        <p className="text-gray-600 text-sm mb-8 max-w-md mx-auto">
          Novidades, bastidores e as peças no dia a dia. @stampopersonalizados
        </p>
        <a
          href={stampo.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:opacity-95 transition shadow-lg"
          aria-label="Abrir Instagram da Stampô"
        >
          <Instagram className="w-5 h-5" /> Seguir no Instagram
        </a>
      </div>
    </section>
  );
}
