import React from 'react';
import { benefitsStrip } from '../data/benefits';

export function BenefitsStrip() {
  return (
    <div className="bg-white border-b border-stone-200 py-2.5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="flex items-center gap-x-10 whitespace-nowrap animate-marquee-rtl w-max">
          {[...benefitsStrip, ...benefitsStrip].map(({ icon: Icon, text }, i) => (
            <span key={i} className="flex items-center gap-2 text-xs font-medium text-gray-700">
              <Icon className="w-4 h-4 text-brand-purple flex-shrink-0" />
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
