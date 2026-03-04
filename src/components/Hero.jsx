import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useReveal } from '../useReveal';
import { bannerImages, BANNERS_FOLDER } from '../data/banners';
import { stampo, DEFAULT_HERO_IMAGE } from '../data/site';

const BANNER_INTERVAL_MS = 5000;

export function Hero() {
  const heroRef = useReveal(0);
  const [bannerIndex, setBannerIndex] = useState(0);

  const hasBanners = bannerImages?.length > 0;
  const bannerCount = hasBanners ? bannerImages.length : 1;

  useEffect(() => {
    if (!hasBanners || bannerCount <= 1) return;
    const t = setInterval(() => {
      setBannerIndex((i) => (i + 1) % bannerCount);
    }, BANNER_INTERVAL_MS);
    return () => clearInterval(t);
  }, [hasBanners, bannerCount]);

  return (
    <header
      id="home"
      className="relative min-h-[70vh] flex items-center overflow-hidden bg-gray-900 text-white group"
    >
      <div className="absolute inset-0 overflow-hidden">
        {hasBanners ? (
          <>
            <div
              className="flex h-full transition-transform duration-700 ease-out"
              style={{
                width: `${bannerCount * 100}%`,
                transform: `translateX(-${(100 / bannerCount) * bannerIndex}%)`,
              }}
            >
              {bannerImages.map((filename, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 h-full"
                  style={{ width: `${100 / bannerCount}%` }}
                >
                  <img
                    src={`${BANNERS_FOLDER}${filename}`}
                    alt={`Banner ${i + 1} — ${stampo.name}`}
                    className="w-full h-full object-contain opacity-75"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = DEFAULT_HERO_IMAGE;
                    }}
                  />
                </div>
              ))}
            </div>
            {bannerCount > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setBannerIndex((i) => (i - 1 + bannerCount) % bannerCount)}
                  aria-label="Banner anterior"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-opacity opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={() => setBannerIndex((i) => (i + 1) % bannerCount)}
                  aria-label="Próximo banner"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-opacity opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                  {bannerImages.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setBannerIndex(i)}
                      aria-label={`Ir para banner ${i + 1}`}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        i === bannerIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <img
            src={DEFAULT_HERO_IMAGE}
            alt="Camisaria Stampô"
            className="w-full h-full object-contain opacity-75"
          />
        )}
      </div>
      <div ref={heroRef} className="reveal relative z-10 max-w-4xl mx-auto px-6 text-center py-16" />
    </header>
  );
}
