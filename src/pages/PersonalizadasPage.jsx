import React, { useState } from 'react';
import { MessageCircle, Shirt } from 'lucide-react';
import { Layout } from '../components/Layout';
import { stampo } from '../data/site';
import { customShirtTypes, customPlacementOptions, customArtSizeOptions } from '../data/customShirts';

export default function PersonalizadasPage() {
  const [customShirtType, setCustomShirtType] = useState('');
  const [customPlacement, setCustomPlacement] = useState('');
  const [customArtSize, setCustomArtSize] = useState('');
  const [customNotes, setCustomNotes] = useState('');

  const sendCustomQuoteWhatsApp = () => {
    const tipoLabel = customShirtTypes.find((t) => t.value === customShirtType)?.label || customShirtType || '—';
    const posicaoLabel = customPlacementOptions.find((p) => p.value === customPlacement)?.label || customPlacement || '—';
    const tamanhoLabel = customArtSizeOptions.find((a) => a.value === customArtSize)?.label || customArtSize || '—';
    let msg = '👕 *Orçamento — Personalizada*\n\n';
    msg += `*Tipo:* ${tipoLabel}\n`;
    msg += `*Onde estampar:* ${posicaoLabel}\n`;
    msg += `*Tamanho da estampa:* ${tamanhoLabel}\n`;
    if (customNotes.trim()) msg += `*Observações:* ${customNotes.trim()}\n`;
    msg += '\n_Enviarei minha arte em anexo no chat._';
    window.open(`https://wa.me/${stampo.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <Layout>
      <div className="bg-brand-orange-light/50 flex-1 flex flex-col min-h-[calc(100vh-3.5rem)]">
        <section className="py-12 md:py-20 flex-1">
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-purple/10 text-brand-purple mb-4">
                <Shirt className="w-6 h-6" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-brand-purple-dark mb-2">
                Quer sua estampa na nossa peça?
              </h1>
              <p className="text-brand-purple-dark/80 text-sm max-w-md mx-auto">
                Escolhe as opções abaixo e manda no WhatsApp. A gente responde com orçamento e prazo. Depois é só enviar sua arte em anexo no chat.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
              <div className="p-6 md:p-8 space-y-8">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">1</span>
                  <label className="block text-sm font-semibold text-gray-900 mt-1 mb-3">Tipo de peça</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {customShirtTypes.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setCustomShirtType(opt.value)}
                        className={`py-2.5 px-3 rounded-lg text-sm font-medium transition border ${
                          customShirtType === opt.value
                            ? 'border-brand-purple bg-brand-purple/10 text-brand-purple-dark'
                            : 'border-gray-200 text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">2</span>
                  <label className="block text-sm font-semibold text-gray-900 mt-1 mb-3">Onde estampar</label>
                  <div className="flex flex-wrap gap-2">
                    {customPlacementOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setCustomPlacement(opt.value)}
                        className={`py-2.5 px-4 rounded-lg text-sm font-medium transition border ${
                          customPlacement === opt.value
                            ? 'border-brand-purple bg-brand-purple/10 text-brand-purple-dark'
                            : 'border-gray-200 text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">3</span>
                  <label className="block text-sm font-semibold text-gray-900 mt-1 mb-3">Tamanho da estampa</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {customArtSizeOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setCustomArtSize(opt.value)}
                        className={`py-2.5 px-3 rounded-lg text-sm font-medium transition border ${
                          customArtSize === opt.value
                            ? 'border-brand-purple bg-brand-purple/10 text-brand-purple-dark'
                            : 'border-gray-200 text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">4</span>
                  <label className="block text-sm font-semibold text-gray-900 mt-1 mb-3">Quer falar mais alguma coisa?</label>
                  <textarea
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    placeholder="Quantidade, cores, referência… (opcional)"
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20 resize-none"
                    rows={2}
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={sendCustomQuoteWhatsApp}
                    className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <MessageCircle className="w-5 h-5" /> Pedir orçamento no WhatsApp
                  </button>
                  <p className="text-gray-500 text-xs text-center mt-3">
                    Você vai abrir o WhatsApp. Envie sua arte em anexo na conversa (imagem, PDF ou vetor).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
