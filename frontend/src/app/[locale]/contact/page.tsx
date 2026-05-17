'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';
import { MapPin, Mail, CheckCircle } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export default function ContactPage() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const set = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/contact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) setSuccess(true);
      else setError('Erreur lors de l\'envoi.');
    } catch {
      setError('Erreur de connexion.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20">
      <div className="bg-stone-dark text-white py-20 px-4 text-center">
        <h1 className="font-display text-4xl lg:text-6xl font-bold text-white mb-4">{t('title')}</h1>
        <p className="text-parchment/80 text-lg">{t('subtitle')}</p>
      </div>

      <section className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <div>
            {success ? (
              <div className="text-center py-12">
                <CheckCircle size={64} className="text-forest mx-auto mb-4" />
                <p className="font-display text-xl font-bold text-stone-dark">{t('success')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-stone-dark mb-1">{t('name')} *</label>
                  <input
                    required value={form.name} onChange={e => set('name', e.target.value)}
                    className="w-full border border-stone/30 px-4 py-2.5 focus:outline-none focus:border-roman bg-parchment-light"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-dark mb-1">{t('email')} *</label>
                  <input
                    required type="email" value={form.email} onChange={e => set('email', e.target.value)}
                    className="w-full border border-stone/30 px-4 py-2.5 focus:outline-none focus:border-roman bg-parchment-light"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-dark mb-1">{t('subject')} *</label>
                  <input
                    required value={form.subject} onChange={e => set('subject', e.target.value)}
                    className="w-full border border-stone/30 px-4 py-2.5 focus:outline-none focus:border-roman bg-parchment-light"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-dark mb-1">{t('message')} *</label>
                  <textarea
                    required rows={6} value={form.message} onChange={e => set('message', e.target.value)}
                    className="w-full border border-stone/30 px-4 py-2.5 focus:outline-none focus:border-roman bg-parchment-light resize-none"
                  />
                </div>
                {error && <p className="text-roman text-sm">{error}</p>}
                <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-4 disabled:opacity-60">
                  {loading ? '...' : t('submit')}
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="space-y-8">
            <div>
              <h3 className="font-display text-xl font-bold text-stone-dark mb-3">{t('address_title')}</h3>
              <div className="flex gap-3 text-gray-600">
                <MapPin size={20} className="text-roman flex-shrink-0 mt-0.5" />
                <p className="whitespace-pre-line">{t('address')}</p>
              </div>
            </div>
            <div className="flex gap-3 items-center text-gray-600">
              <Mail size={20} className="text-roman flex-shrink-0" />
              <a href="mailto:contact@camp-cora.fr" className="hover:text-roman">contact@camp-cora.fr</a>
            </div>

            {/* Embedded map */}
            <div className="h-64 bg-stone/10 border border-stone/20 overflow-hidden">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=3.76%2C47.57%2C3.79%2C47.59&layer=mapnik&marker=47.5761%2C3.7789"
                width="100%" height="100%" className="border-0"
                title="Localisation Camp de Cora"
                loading="lazy"
              />
            </div>
            <p className="text-xs text-stone/60 text-center">
              {locale === 'fr' ? '© OpenStreetMap contributors' : '© OpenStreetMap contributors'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
