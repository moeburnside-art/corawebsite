'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { CheckCircle, Heart, Users, Shovel, FileText } from 'lucide-react';
import MembershipForm from '@/components/sections/MembershipForm';

const membershipTiers = [
  { key: 'individual', icon: '👤', priceKey: 'membership_individual_price', highlight: false },
  { key: 'family', icon: '👨‍👩‍👧', priceKey: 'membership_family_price', highlight: true },
  { key: 'student', icon: '🎓', priceKey: 'membership_student_price', highlight: false },
  { key: 'benefactor', icon: '🌟', priceKey: 'membership_benefactor_price', highlight: false },
];

export default function AssociationPage() {
  const t = useTranslations('association');
  const locale = useLocale();
  const [showForm, setShowForm] = useState(false);

  const workItems = [1, 2, 3, 4, 5].map(i => t(`work_item${i}`));

  return (
    <div className="pt-20">
      {/* Header */}
      <div className="bg-forest text-white py-20 px-4 text-center">
        <h1 className="font-display text-4xl lg:text-6xl font-bold text-white mb-4">{t('title')}</h1>
        <p className="text-parchment/80 text-xl">{t('subtitle')}</p>
      </div>

      {/* Mission */}
      <section className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Users size={36} className="text-forest mb-4" />
            <h2 className="section-title">{t('mission_title')}</h2>
            <p className="text-gray-600 text-lg leading-relaxed">{t('mission_text')}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Shovel size={36} className="text-forest mb-4" />
            <h2 className="section-title">{t('work_title')}</h2>
            <ul className="space-y-3">
              {workItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-forest flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Rempart partnership */}
      <section className="bg-parchment py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="border-l-4 border-gold pl-8 text-left">
            <h2 className="font-display text-2xl font-bold text-stone-dark mb-3">{t('rempart_title')}</h2>
            <p className="text-gray-600 leading-relaxed">{t('rempart_text')}</p>
            <a
              href="https://www.rempart.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-roman font-semibold hover:underline"
            >
              → www.rempart.com
            </a>
          </div>
        </div>
      </section>

      {/* Membership tiers */}
      <section className="section-container">
        <div className="text-center mb-12">
          <Heart size={36} className="text-roman mx-auto mb-4" />
          <h2 className="section-title">{t('join_title')}</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">{t('join_text')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {membershipTiers.map((tier, i) => (
            <motion.div
              key={tier.key}
              className={`p-8 text-center border-2 transition-all duration-300 cursor-pointer
                ${tier.highlight
                  ? 'border-gold bg-stone-dark text-white scale-105 shadow-xl'
                  : 'border-stone/30 bg-white hover:border-gold hover:shadow-md'
                }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setShowForm(true)}
            >
              <div className="text-4xl mb-3">{tier.icon}</div>
              <h3 className={`font-display text-lg font-bold mb-2 ${tier.highlight ? 'text-gold' : 'text-stone-dark'}`}>
                {t(`membership_${tier.key}`)}
              </h3>
              <div className={`text-3xl font-bold font-display ${tier.highlight ? 'text-white' : 'text-roman'}`}>
                {t(tier.priceKey)}
              </div>
              {tier.highlight && (
                <div className="mt-3 text-xs text-gold uppercase tracking-widest font-semibold">
                  {locale === 'fr' ? '⭐ Recommandé' : '⭐ Recommended'}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary text-base px-10 py-4"
          >
            <FileText size={18} />
            {t('form_title')}
          </button>
        </div>
      </section>

      {/* Membership form modal / section */}
      {showForm && (
        <section id="adhesion" className="bg-parchment-dark py-16">
          <div className="max-w-2xl mx-auto px-4">
            <MembershipForm onClose={() => setShowForm(false)} />
          </div>
        </section>
      )}
    </div>
  );
}
