import React, { useState } from 'react';

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_NEWSLETTER_ID;

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | success | error
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setStatus('idle');
    try {
      if (FORMSPREE_ID) {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, _subject: 'Newsletter Stampô' }),
        });
        if (!res.ok) throw new Error('Erro ao enviar');
      }
      setStatus('success');
      setEmail('');
    } catch (_) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Seu e-mail"
        className="w-full px-3 py-2 rounded-lg bg-white/10 border border-brand-purple/40 text-white placeholder:text-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple-light/50"
        aria-label="E-mail para newsletter"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 rounded-lg bg-brand-purple text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-purple-light/20 transition disabled:opacity-70"
      >
        {loading ? 'Enviando...' : 'Inscrever'}
      </button>
      {status === 'success' && (
        <p className="text-green-300 text-xs">Obrigado! Em breve você recebe nossas novidades.</p>
      )}
      {status === 'error' && (
        <p className="text-red-300 text-xs">Algo deu errado. Tente de novo ou nos chame no WhatsApp.</p>
      )}
    </form>
  );
}
