import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useReveal } from '../useReveal';
import { faqs } from '../data/faq';

export function FaqSection() {
  const faqRef = useReveal(0);
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <section id="faq" className="py-20">
      <div ref={faqRef} className="reveal max-w-2xl mx-auto px-4 sm:px-6">
        <p className="text-brand-purple text-[10px] font-bold uppercase tracking-[0.3em] text-center mb-4">
          Dúvidas
        </p>
        <h2 className="text-3xl font-bold text-brand-purple-dark text-center mb-12">
          Perguntas frequentes
        </h2>
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border-2 border-brand-purple/20 overflow-hidden hover:border-brand-purple/40 transition-colors"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full flex items-center justify-between py-4 px-5 text-left font-semibold text-sm"
              >
                <span>{faq.question}</span>
                <span className="text-gray-400 transition-transform">
                  {openFaq === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>
              {openFaq === index && (
                <div className="px-5 pb-4">
                  <p className="text-gray-500 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
