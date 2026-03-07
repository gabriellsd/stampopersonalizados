import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, RefreshCw } from 'lucide-react';
import { stampo } from '../data/site';

export default function ExchangeDeliveryPage() {
  return (
    <div className="bg-brand-orange-light/50 flex-1 py-12 md:py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-bold text-brand-purple-dark mb-2">Trocas e Entrega</h1>
        <p className="text-sm text-gray-500 mb-10">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

        <div className="space-y-10">
          <section className="bg-white rounded-2xl border border-brand-purple/10 p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-brand-purple/10 flex items-center justify-center">
                <Truck className="w-5 h-5 text-brand-purple" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Entrega</h2>
            </div>
            <ul className="text-gray-700 text-sm space-y-2">
              <li>• Enviamos para todo o Brasil via Correios ou transportadora.</li>
              <li>• O prazo e o valor do frete são informados no orçamento, após você enviar o pedido pelo WhatsApp.</li>
              <li>• Em pedidos acima de <strong>R$ 399</strong>, o frete é grátis.</li>
              <li>• O rastreio é enviado assim que o pedido for despachado.</li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl border border-brand-purple/10 p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-brand-purple/10 flex items-center justify-center">
                <RefreshCw className="w-5 h-5 text-brand-purple" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Trocas e devoluções</h2>
            </div>
            <ul className="text-gray-700 text-sm space-y-2">
              <li>• Aceitamos trocas por tamanho ou estorno em até <strong>7 dias</strong> após o recebimento.</li>
              <li>• A peça deve estar sem uso, com etiqueta e na embalagem original (quando aplicável).</li>
              <li>• Para iniciar a troca ou devolução, entre em contato pelo WhatsApp da {stampo.name}.</li>
              <li>• O reenvio (nova peça ou tamanho) pode ter custo de frete; o estorno é creditado conforme a forma de pagamento utilizada.</li>
            </ul>
          </section>
        </div>

        <p className="text-center mt-10">
          <Link to="/" className="text-brand-purple font-semibold hover:underline text-sm">
            ← Voltar ao início
          </Link>
        </p>
      </div>
    </div>
  );
}
