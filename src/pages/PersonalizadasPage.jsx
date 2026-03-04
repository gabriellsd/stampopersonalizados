import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
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
    let msg = '👕 *Orçamento — Camisa personalizada*\n\n';
    msg += `*Tipo de camiseta:* ${tipoLabel}\n`;
    msg += `*Estampa:* ${posicaoLabel}\n`;
    msg += `*Tamanho da arte:* ${tamanhoLabel}\n`;
    if (customNotes.trim()) msg += `*Observações:* ${customNotes.trim()}\n`;
    msg += '\n_Enviarei minha arte/arquivo em anexo neste chat._';
    window.open(`https://wa.me/${stampo.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <Layout>
      <div className="bg-brand-orange-light/50 flex-1 flex flex-col min-h-[calc(100vh-3.5rem)]">
        <section className="py-16 md:py-20 flex-1">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <p className="text-brand-orange text-[10px] font-bold uppercase tracking-[0.3em] text-center mb-2">Sob medida</p>
            <h1 className="text-3xl md:text-4xl font-bold text-brand-purple-dark text-center mb-3">Camisas personalizadas</h1>
            <p className="text-brand-purple-dark/80 text-sm text-center mb-10">
              Envie sua arte, escolha o tipo de camiseta e onde quer a estampa. Respondemos com orçamento e prazo.
            </p>
            <div className="bg-white rounded-2xl border-2 border-brand-purple/20 shadow-sm overflow-hidden">
              <div className="p-6 md:p-8 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-brand-purple-dark mb-2">Tipo de camiseta</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {customShirtTypes.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setCustomShirtType(opt.value)}
                        className={`py-2.5 px-3 rounded-xl text-sm font-medium transition border-2 ${
                          customShirtType === opt.value
                            ? 'border-brand-purple bg-brand-purple-light text-brand-purple-dark'
                            : 'border-gray-200 text-gray-700 hover:border-brand-purple/40'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-brand-purple-dark mb-2">Onde quer a estampa?</label>
                  <div className="flex flex-wrap gap-2">
                    {customPlacementOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setCustomPlacement(opt.value)}
                        className={`py-2.5 px-4 rounded-xl text-sm font-medium transition border-2 ${
                          customPlacement === opt.value
                            ? 'border-brand-purple bg-brand-purple-light text-brand-purple-dark'
                            : 'border-gray-200 text-gray-700 hover:border-brand-purple/40'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-brand-purple-dark mb-2">Tamanho aproximado da arte</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {customArtSizeOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setCustomArtSize(opt.value)}
                        className={`py-2.5 px-3 rounded-xl text-sm font-medium transition border-2 ${
                          customArtSize === opt.value
                            ? 'border-brand-purple bg-brand-purple-light text-brand-purple-dark'
                            : 'border-gray-200 text-gray-700 hover:border-brand-purple/40'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-brand-purple-dark mb-2">Observações (quantidade, cores, referências)</label>
                  <textarea
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    placeholder="Ex.: 10 unidades, cores da logo, já tenho o arquivo em vetor..."
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20 resize-none"
                    rows={3}
                  />
                </div>
                <p className="text-gray-500 text-xs">
                  Ao clicar em &quot;Solicitar orçamento&quot;, você será direcionado ao WhatsApp. <strong>Envie sua arte ou arquivo em anexo</strong> na conversa (imagem, PDF ou vetor).
                </p>
                <button
                  type="button"
                  onClick={sendCustomQuoteWhatsApp}
                  className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <MessageCircle className="w-5 h-5" /> Solicitar orçamento (enviar arte no WhatsApp)
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
