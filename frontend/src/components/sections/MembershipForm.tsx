'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { CheckCircle, X } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface Props {
  onClose?: () => void;
}

export default function MembershipForm({ onClose }: Props) {
  const t = useTranslations('association');
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    membership_type: 'individual',
    wants_newsletter: true,
    wants_volunteer: false,
    message: '',
    year: new Date().getFullYear(),
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const set = (field: string, value: unknown) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/membership/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSuccess(true);
      } else {
        const data = await res.json();
        setError(JSON.stringify(data));
      }
    } catch {
      setError('Erreur de connexion au serveur.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-12">
        <CheckCircle size={64} className="text-forest mx-auto mb-4" />
        <h3 className="font-display text-2xl font-bold text-stone-dark mb-2">{t('form_success')}</h3>
        {onClose && (
          <button onClick={onClose} className="mt-6 btn-secondary">
            Fermer
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white border border-stone/20 shadow-lg p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-display text-2xl font-bold text-stone-dark">{t('form_title')}</h2>
        {onClose && (
          <button onClick={onClose} className="text-stone hover:text-roman">
            <X size={24} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-stone-dark mb-1">{t('form_firstname')} *</label>
            <input
              required
              value={form.first_name}
              onChange={e => set('first_name', e.target.value)}
              className="w-full border border-stone/30 px-4 py-2.5 focus:outline-none focus:border-roman bg-parchment-light"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-stone-dark mb-1">{t('form_lastname')} *</label>
            <input
              required
              value={form.last_name}
              onChange={e => set('last_name', e.target.value)}
              className="w-full border border-stone/30 px-4 py-2.5 focus:outline-none focus:border-roman bg-parchment-light"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-stone-dark mb-1">{t('form_email')} *</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={e => set('email', e.target.value)}
            className="w-full border border-stone/30 px-4 py-2.5 focus:outline-none focus:border-roman bg-parchment-light"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-stone-dark mb-1">{t('form_phone')}</label>
            <input
              value={form.phone}
              onChange={e => set('phone', e.target.value)}
              className="w-full border border-stone/30 px-4 py-2.5 focus:outline-none focus:border-roman bg-parchment-light"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-stone-dark mb-1">{t('form_type')} *</label>
            <select
              value={form.membership_type}
              onChange={e => set('membership_type', e.target.value)}
              className="w-full border border-stone/30 px-4 py-2.5 focus:outline-none focus:border-roman bg-parchment-light"
            >
              <option value="individual">Individuelle — 15 €</option>
              <option value="family">Familiale — 25 €</option>
              <option value="student">Étudiant/Chômeur — 8 €</option>
              <option value="benefactor">Bienfaiteur — 50 €+</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-stone-dark mb-1">{t('form_address')}</label>
          <textarea
            rows={2}
            value={form.address}
            onChange={e => set('address', e.target.value)}
            className="w-full border border-stone/30 px-4 py-2.5 focus:outline-none focus:border-roman bg-parchment-light resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.wants_newsletter}
              onChange={e => set('wants_newsletter', e.target.checked)}
              className="w-4 h-4 accent-roman"
            />
            <span className="text-sm text-gray-600">{t('form_newsletter')}</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.wants_volunteer}
              onChange={e => set('wants_volunteer', e.target.checked)}
              className="w-4 h-4 accent-forest"
            />
            <span className="text-sm text-gray-600">{t('form_volunteer')}</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-semibold text-stone-dark mb-1">{t('form_message')}</label>
          <textarea
            rows={3}
            value={form.message}
            onChange={e => set('message', e.target.value)}
            className="w-full border border-stone/30 px-4 py-2.5 focus:outline-none focus:border-roman bg-parchment-light resize-none"
          />
        </div>

        {error && (
          <div className="bg-roman/10 border border-roman/30 text-roman px-4 py-3 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full justify-center py-4 text-base disabled:opacity-60"
        >
          {loading ? '...' : t('form_submit')}
        </button>
      </form>
    </div>
  );
}
