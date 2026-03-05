import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { Layout } from './components/Layout';
import { BenefitsStrip } from './components/BenefitsStrip';
import { Hero } from './components/Hero';
import { Collection } from './components/Collection';
import { AboutSection } from './components/AboutSection';
import { FaqSection } from './components/FaqSection';
import { InstagramSection } from './components/InstagramSection';
import { PageMeta } from './components/PageMeta';
import { Analytics } from './components/Analytics';

const PersonalizadasPage = lazy(() => import('./pages/PersonalizadasPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function HomePage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
      <BenefitsStrip />
      <Hero />
      <div className="bg-brand-orange-light/50 flex-1">
        <Collection />
        <AboutSection />
        <FaqSection />
        <InstagramSection />
      </div>
    </div>
  );
}

function PageTransition({ children }) {
  const location = useLocation();
  return (
    <div key={location.pathname} className="page-enter">
      {children}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <Analytics />
      <CartProvider>
        <FavoritesProvider>
          <Routes>
            <Route
              path="/personalizadas"
              element={
                <Layout>
                  <PageMeta title="Personalizadas | Stampô" description="Solicite sua camisa personalizada com sua estampa. Escolha o modelo, onde quer a estampa e o tamanho da arte." ogImage="/logo/logo.png" />
                  <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><span className="animate-pulse text-brand-purple">Carregando...</span></div>}>
                    <PageTransition><PersonalizadasPage /></PageTransition>
                  </Suspense>
                </Layout>
              }
            />
            <Route
              path="/contato"
              element={
                <Layout>
                  <PageMeta title="Contato | Stampô" description="Fale com a Stampô por WhatsApp, e-mail ou Instagram. Atendimento online." ogImage="/logo/logo.png" />
                  <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><span className="animate-pulse text-brand-purple">Carregando...</span></div>}>
                    <PageTransition><ContactPage /></PageTransition>
                  </Suspense>
                </Layout>
              }
            />
            <Route
              path="/privacidade"
              element={
                <Layout>
                  <PageMeta title="Política de Privacidade | Stampô" description="Política de privacidade e uso de dados da Stampô. LGPD." ogImage="/logo/logo.png" />
                  <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><span className="animate-pulse text-brand-purple">Carregando...</span></div>}>
                    <PageTransition><PrivacyPage /></PageTransition>
                  </Suspense>
                </Layout>
              }
            />
            <Route
              path="/termos"
              element={
                <Layout>
                  <PageMeta title="Termos de Uso | Stampô" description="Termos de uso do site e condições de compra da Stampô." ogImage="/logo/logo.png" />
                  <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><span className="animate-pulse text-brand-purple">Carregando...</span></div>}>
                    <PageTransition><TermsPage /></PageTransition>
                  </Suspense>
                </Layout>
              }
            />
            <Route
              path="/"
              element={
                <Layout>
                  <PageMeta title="Stampô | Coleção Oversized e Personalizadas" description="Coleção oversized e estampas personalizadas. Peças com a nossa cara, do primeiro clique ao seu pedido." ogImage="/logo/logo.png" />
                  <PageTransition><HomePage /></PageTransition>
                </Layout>
              }
            />
            <Route
              path="*"
              element={
                <Layout>
                  <PageMeta title="Página não encontrada | Stampô" description="Página não encontrada." />
                  <NotFoundPage />
                </Layout>
              }
            />
          </Routes>
        </FavoritesProvider>
      </CartProvider>
    </BrowserRouter>
  );
}
