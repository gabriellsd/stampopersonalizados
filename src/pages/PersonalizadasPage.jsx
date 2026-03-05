import React, { useState } from 'react';
import { MessageCircle, Shirt, Send, Image, CheckCircle, FileImage, ChevronLeft } from 'lucide-react';
import { stampo } from '../data/site';
import { customShirtTypes, customPlacementOptions, customArtSizeOptions } from '../data/customShirts';

const STEPS = [
  { id: 1, icon: Shirt, label: 'Escolha o tipo de peça' },
  { id: 2, icon: Send, label: 'Onde quer a estampa' },
  { id: 3, icon: Image, label: 'Tamanho da estampa' },
  { id: 4, icon: CheckCircle, label: 'Envie e anexe sua arte' },
];

export default function PersonalizadasPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [customShirtType, setCustomShirtType] = useState('');
  const [customPlacement, setCustomPlacement] = useState('');
  const [customArtSize, setCustomArtSize] = useState('');
  const [customNotes, setCustomNotes] = useState('');
  const [typeOther, setTypeOther] = useState('');
  const [placementOther, setPlacementOther] = useState('');
  const [sizeOther, setSizeOther] = useState('');

  const sendCustomQuoteWhatsApp = () => {
    const tipoLabel = customShirtType === 'outro' ? (typeOther.trim() || 'Outro') : (customShirtTypes.find((t) => t.value === customShirtType)?.label || customShirtType || '—');
    const posicaoLabel = customPlacement === 'outro' ? (placementOther.trim() || 'Outro') : (customPlacementOptions.find((p) => p.value === customPlacement)?.label || customPlacement || '—');
    const tamanhoLabel = customArtSize === 'outro' ? (sizeOther.trim() || 'Outro') : (customArtSizeOptions.find((a) => a.value === customArtSize)?.label || customArtSize || '—');
    let msg = '👕 *Orçamento — Personalizada*\n\n';
    msg += `*Tipo:* ${tipoLabel}\n`;
    msg += `*Onde estampar:* ${posicaoLabel}\n`;
    msg += `*Tamanho da estampa:* ${tamanhoLabel}\n`;
    if (customNotes.trim()) msg += `*Observações:* ${customNotes.trim()}\n`;
    msg += '\n_Enviarei minha arte em anexo no chat._';
    window.open(`https://wa.me/${stampo.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const goToStep = (step) => {
    if (step >= 1 && step <= 4) setCurrentStep(step);
  };

  return (
    <div className="bg-brand-orange-light/50 flex-1 flex flex-col min-h-[calc(100vh-3.5rem)]">
      {/* Hero */}
      <section className="py-10 md:py-14 border-b border-brand-purple/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-brand-purple text-[10px] font-bold uppercase tracking-[0.25em] mb-2">Personalizadas</p>
          <h1 className="text-2xl md:text-3xl font-bold text-brand-purple-dark mb-3">
            Estampe sua ideia
          </h1>
          <p className="text-gray-600 text-sm max-w-xl mx-auto">
            Escolha as opções no passo a passo. No final você manda no WhatsApp e anexa sua arte.
          </p>
        </div>
      </section>

      {/* Indicador de passos */}
      <section className="py-6">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            {STEPS.map((step, i) => {
              const StepIcon = step.icon;
              const isActive = currentStep === step.id;
              const isDone = currentStep > step.id;
              return (
                <React.Fragment key={step.id}>
                  <button
                    type="button"
                    onClick={() => goToStep(step.id)}
                    className={`flex flex-col items-center transition-all ${
                      isActive ? 'opacity-100 scale-105' : isDone ? 'opacity-80' : 'opacity-50'
                    }`}
                    aria-current={isActive ? 'step' : undefined}
                  >
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                        isActive
                          ? 'bg-brand-purple border-brand-purple text-white'
                          : isDone
                            ? 'bg-brand-purple/20 border-brand-purple/50 text-brand-purple'
                            : 'bg-white border-gray-200 text-gray-400'
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                      ) : (
                        <StepIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                      )}
                    </div>
                    <span className={`text-[10px] sm:text-xs font-medium mt-1.5 hidden sm:block max-w-[72px] text-center ${isActive ? 'text-brand-purple-dark' : 'text-gray-500'}`}>
                      {step.label}
                    </span>
                  </button>
                  {i < STEPS.length - 1 && (
                    <div className={`flex-1 h-0.5 max-w-8 sm:max-w-12 rounded ${currentStep > step.id ? 'bg-brand-purple/40' : 'bg-gray-200'}`} aria-hidden />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </section>

      {/* Conteúdo do passo atual */}
      <section className="py-6 pb-12 flex-1">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
            <div className="p-6 md:p-8">
              {/* Passo 1: Tipo de peça */}
              {currentStep === 1 && (
                <div className="transition-opacity duration-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center">
                      <Shirt className="w-6 h-6 text-brand-purple" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">Tipo de peça</h2>
                      <p className="text-sm text-gray-500">Escolha o modelo que você quer estampar.</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {customShirtTypes.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          setCustomShirtType(opt.value);
                          if (opt.value !== 'outro') setCurrentStep(2);
                        }}
                        className={`py-3 px-3 rounded-xl text-sm font-medium transition border-2 ${
                          customShirtType === opt.value
                            ? 'border-brand-purple bg-brand-purple/10 text-brand-purple-dark'
                            : 'border-gray-200 text-gray-700 hover:border-brand-purple/50'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  {customShirtType === 'outro' && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Qual tipo de peça?</label>
                      <input
                        type="text"
                        value={typeOther}
                        onChange={(e) => setTypeOther(e.target.value)}
                        placeholder="Ex.: moletom, cropped, etc."
                        className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20"
                      />
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="mt-3 w-full py-2.5 rounded-xl bg-brand-purple text-white text-sm font-semibold hover:bg-brand-purple-dark transition"
                      >
                        Continuar
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Passo 2: Onde estampar */}
              {currentStep === 2 && (
                <div className="transition-opacity duration-200">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="flex items-center gap-1 text-sm text-gray-500 hover:text-brand-purple mb-6"
                  >
                    <ChevronLeft className="w-4 h-4" /> Voltar
                  </button>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center">
                      <Send className="w-6 h-6 text-brand-purple" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">Onde estampar</h2>
                      <p className="text-sm text-gray-500">Frente, verso ou os dois?</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {customPlacementOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          setCustomPlacement(opt.value);
                          if (opt.value !== 'outro') setCurrentStep(3);
                        }}
                        className={`py-3 px-5 rounded-xl text-sm font-medium transition border-2 ${
                          customPlacement === opt.value
                            ? 'border-brand-purple bg-brand-purple/10 text-brand-purple-dark'
                            : 'border-gray-200 text-gray-700 hover:border-brand-purple/50'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  {customPlacement === 'outro' && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Onde quer a estampa?</label>
                      <input
                        type="text"
                        value={placementOther}
                        onChange={(e) => setPlacementOther(e.target.value)}
                        placeholder="Ex.: manga, costas, etc."
                        className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20"
                      />
                      <button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        className="mt-3 w-full py-2.5 rounded-xl bg-brand-purple text-white text-sm font-semibold hover:bg-brand-purple-dark transition"
                      >
                        Continuar
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Passo 3: Tamanho da estampa */}
              {currentStep === 3 && (
                <div className="transition-opacity duration-200">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="flex items-center gap-1 text-sm text-gray-500 hover:text-brand-purple mb-6"
                  >
                    <ChevronLeft className="w-4 h-4" /> Voltar
                  </button>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center">
                      <Image className="w-6 h-6 text-brand-purple" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">Tamanho da estampa</h2>
                      <p className="text-sm text-gray-500">Aproximadamente, para o orçamento.</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {customArtSizeOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          setCustomArtSize(opt.value);
                          if (opt.value !== 'outro') setCurrentStep(4);
                        }}
                        className={`py-3 px-3 rounded-xl text-sm font-medium transition border-2 ${
                          customArtSize === opt.value
                            ? 'border-brand-purple bg-brand-purple/10 text-brand-purple-dark'
                            : 'border-gray-200 text-gray-700 hover:border-brand-purple/50'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  {customArtSize === 'outro' && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Qual tamanho da estampa?</label>
                      <input
                        type="text"
                        value={sizeOther}
                        onChange={(e) => setSizeOther(e.target.value)}
                        placeholder="Ex.: 15 cm, 25 cm, etc."
                        className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20"
                      />
                      <button
                        type="button"
                        onClick={() => setCurrentStep(4)}
                        className="mt-3 w-full py-2.5 rounded-xl bg-brand-purple text-white text-sm font-semibold hover:bg-brand-purple-dark transition"
                      >
                        Continuar
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Passo 4: Observações + WhatsApp */}
              {currentStep === 4 && (
                <div className="transition-opacity duration-200">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="flex items-center gap-1 text-sm text-gray-500 hover:text-brand-purple mb-6"
                  >
                    <ChevronLeft className="w-4 h-4" /> Voltar
                  </button>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-brand-purple" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">Quase lá</h2>
                      <p className="text-sm text-gray-500">Opcional: quantidade, cores, referência. Depois é só mandar no WhatsApp e anexar sua arte.</p>
                    </div>
                  </div>
                  <textarea
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    placeholder="Quantidade, cores, referência… (opcional)"
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/20 resize-none mb-6"
                    rows={3}
                  />
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
              )}
            </div>
          </div>

          {/* Dicas */}
          <div className="mt-6 p-4 rounded-xl bg-white/80 border border-brand-purple/10">
            <div className="flex gap-3">
              <FileImage className="w-5 h-5 text-brand-purple flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-0.5">Formatos aceitos</h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Imagem (PNG, JPG), PDF ou vetor. Boa resolução = estampa melhor. Dúvida? Manda no chat.
                </p>
              </div>
            </div>
          </div>

          <p className="text-center text-gray-500 text-xs mt-6">Resposta em até 24h úteis. Sem compromisso.</p>
        </div>
      </section>
    </div>
  );
}
