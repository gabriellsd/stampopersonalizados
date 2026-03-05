import React from 'react';
import { stampo } from '../data/site';

export default function PrivacyPage() {
  return (
    <div className="bg-brand-orange-light/50 flex-1 py-12 md:py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-bold text-brand-purple-dark mb-6">Política de Privacidade</h1>
        <p className="text-sm text-gray-500 mb-8">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

        <div className="prose prose-sm max-w-none text-gray-700 space-y-6">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">1. Quem somos</h2>
            <p>
              A {stampo.name} é responsável pelo tratamento dos seus dados pessoais nesta página. Entre em contato pelo e-mail {stampo.email} ou pelo WhatsApp para exercer seus direitos.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">2. Dados que coletamos</h2>
            <p>
              Podemos coletar: nome, e-mail, telefone e endereço quando você preenche formulários (newsletter, orçamento personalizado ou contato). Dados de navegação (cookies, endereço IP) para melhorar o site.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">3. Finalidade</h2>
            <p>
              Usamos os dados para responder pedidos, enviar novidades (se você tiver consentido), melhorar nossos serviços e cumprir obrigações legais.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">4. Cookies</h2>
            <p>
              Utilizamos cookies para funcionamento do site e análise de acesso. Você pode gerenciar as preferências de cookies no aviso exibido na primeira visita.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">5. Seus direitos (LGPD)</h2>
            <p>
              Você pode acessar, corrigir, excluir ou portar seus dados, além de revogar consentimento. Basta nos contactar pelo e-mail ou WhatsApp informado acima.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
