import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Layout } from './components/Layout';
import { BenefitsStrip } from './components/BenefitsStrip';
import { Hero } from './components/Hero';
import { Collection } from './components/Collection';
import { AboutSection } from './components/AboutSection';
import { FaqSection } from './components/FaqSection';
import PersonalizadasPage from './pages/PersonalizadasPage';

function HomePage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
        <BenefitsStrip />
        <Hero />
        <div className="bg-brand-orange-light/50 flex-1">
          <Collection />
          <AboutSection />
          <FaqSection />
        </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <CartProvider>
        <Routes>
          <Route path="/personalizadas" element={<PersonalizadasPage />} />
          <Route path="/" element={<Layout><HomePage /></Layout>} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}
