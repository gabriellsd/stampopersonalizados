import React from 'react';
import { Mail, MapPin, Clock, Instagram } from 'lucide-react';
import { stampo } from '../data/site';
import { WhatsAppIcon } from '../components/FixedButtons';

export default function ContactPage() {
  return (
    <div className="bg-brand-orange-light/50 flex-1 py-12 md:py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-bold text-brand-purple-dark mb-2">Contato</h1>
        <p className="text-gray-600 text-sm mb-10">
          Atendimento online. Fale com a gente pelo WhatsApp ou e-mail.
        </p>

        <div className="space-y-6">
          <a
            href={`https://wa.me/${stampo.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-green-500/50 hover:shadow-md transition"
          >
            <span className="p-2 rounded-lg bg-green-100 text-green-600">
              <WhatsAppIcon className="w-6 h-6" />
            </span>
            <div>
              <h2 className="font-bold text-gray-900">WhatsApp</h2>
              <p className="text-sm text-gray-600 mt-0.5">Resposta rápida. Pedidos e orçamentos.</p>
              <p className="text-brand-purple font-semibold text-sm mt-2">Clique para abrir o chat</p>
            </div>
          </a>

          <a
            href={`mailto:${stampo.email}`}
            className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-brand-purple/50 hover:shadow-md transition"
          >
            <span className="p-2 rounded-lg bg-brand-purple/10 text-brand-purple">
              <Mail className="w-6 h-6" />
            </span>
            <div>
              <h2 className="font-bold text-gray-900">E-mail</h2>
              <p className="text-sm text-gray-600 mt-0.5">{stampo.email}</p>
            </div>
          </a>

          <a
            href={stampo.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-pink-500/50 hover:shadow-md transition"
          >
            <span className="p-2 rounded-lg bg-pink-100 text-pink-600">
              <Instagram className="w-6 h-6" />
            </span>
            <div>
              <h2 className="font-bold text-gray-900">Instagram</h2>
              <p className="text-sm text-gray-600 mt-0.5">@stampopersonalizados</p>
            </div>
          </a>
        </div>

        {(stampo.address || stampo.hours) && (
          <div className="mt-10 pt-10 border-t border-gray-200 space-y-4">
            {stampo.address && (
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600">{stampo.address}</p>
              </div>
            )}
            {stampo.hours && (
              <div className="flex gap-3">
                <Clock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600">{stampo.hours}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
