import React from 'react';
import { Truck, Shirt, CreditCard } from 'lucide-react';
import { useReveal } from '../useReveal';
import { ABOUT_FOLDER, aboutImageFilename, DEFAULT_HERO_IMAGE } from '../data/site';

export function AboutSection() {
  const aboutRef = useReveal(0);

  return (
    <section id="about" className="py-16 md:py-20">
      <div ref={aboutRef} className="reveal max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-0 md:gap-0 mb-16 md:mb-20">
          <div className="aspect-[3/4] md:aspect-auto md:min-h-[400px] bg-gray-200 overflow-hidden">
            <img
              src={`${ABOUT_FOLDER}${aboutImageFilename}`}
              alt="Criadores Stampô"
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = DEFAULT_HERO_IMAGE;
              }}
            />
          </div>
          <div className="bg-gray-100 flex items-center p-8 md:p-12">
            <div>
              <p className="text-brand-purple-dark/90 leading-relaxed text-sm md:text-base mb-4">
                Somos quatro amigos que resolveram botar a mão na massa e criar algo nosso. A Stampô nasceu dessa vontade de fazer peças com a nossa cara, estampas que a gente curte, qualidade que a gente veste.
              </p>
              <p className="text-brand-purple-dark/90 leading-relaxed text-sm md:text-base">
                Cada peça que sai daqui é pensada por quem usa. Sem firula corporativa: só gente que quer dividir isso com você.
              </p>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-10 md:gap-12 text-center">
          <div>
            <div className="flex justify-center mb-4">
              <Truck className="w-10 h-10 text-brand-purple-dark" strokeWidth={1.5} />
            </div>
            <h3 className="font-bold text-lg text-brand-purple-dark mb-2">Frete Grátis</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Frete grátis em compras acima de R$ 399 para todo o Brasil.
            </p>
          </div>
          <div>
            <div className="flex justify-center mb-4">
              <Shirt className="w-10 h-10 text-brand-purple-dark" strokeWidth={1.5} />
            </div>
            <h3 className="font-bold text-lg text-brand-purple-dark mb-2">Feito para você</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Personalize sua camisa com suas iniciais, e escolha seu colarinho e punho favoritos.
            </p>
          </div>
          <div>
            <div className="flex justify-center mb-4">
              <CreditCard className="w-10 h-10 text-brand-purple-dark" strokeWidth={1.5} />
            </div>
            <h3 className="font-bold text-lg text-brand-purple-dark mb-2">Parcelamento em até 10x</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Parcele suas compras em até 3x sem juros ou até 10x com juros calculados no checkout.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
