import React from 'react';
import { stampo } from '../data/site';

export default function TermsPage() {
  return (
    <div className="bg-brand-orange-light/50 flex-1 py-12 md:py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-bold text-brand-purple-dark mb-6">Termos de Uso</h1>
        <p className="text-sm text-gray-500 mb-8">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

        <div className="prose prose-sm max-w-none text-gray-700 space-y-6">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">1. Aceitação</h2>
            <p>
              Ao acessar e usar o site da {stampo.name}, você concorda com estes termos. Se não concordar, não utilize nossos serviços.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">2. Produtos e orçamentos</h2>
            <p>
              Os valores exibidos são estimativas. O orçamento final é confirmado após contato (WhatsApp/e-mail). Reservamo-nos o direito de alterar preços e disponibilidade sem aviso prévio.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">3. Pedidos</h2>
            <p>
              O pedido é formalizado após confirmação de pagamento e estoque. Prazos de produção e entrega são informados no ato do fechamento.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">4. Trocas e devoluções</h2>
            <p>
              Conforme política informada no site (FAQ), aceitamos trocas por tamanho ou estorno em até 7 dias após o recebimento, com a peça sem uso e etiqueta. Entre em contato pelo WhatsApp para iniciar o processo.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">5. Uso do site</h2>
            <p>
              É proibido usar o site para fins ilegais, reproduzir conteúdo sem autorização ou prejudicar o funcionamento da plataforma. O conteúdo (textos, imagens, logotipos) é de propriedade da {stampo.name}.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
