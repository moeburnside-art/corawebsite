'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const periods = [
  { key: 'neolithic', color: 'bg-amber-700' },
  { key: 'bronze', color: 'bg-amber-600' },
  { key: 'iron', color: 'bg-stone-DEFAULT' },
  { key: 'roman', color: 'bg-roman' },
  { key: 'merovingian', color: 'bg-forest' },
];

export default function TimelinePreview() {
  const t = useTranslations('history');
  const locale = useLocale();

  return (
    <section className="section-container bg-parchment">
      <div className="text-center mb-16">
        <h2 className="section-title">{t('title')}</h2>
        <p className="section-subtitle mx-auto">{t('subtitle')}</p>
      </div>

      {/* Timeline horizontal preview */}
      <div className="relative">
        <div className="flex items-stretch gap-0 mb-12 overflow-x-auto pb-4">
          {periods.map((p, i) => (
            <motion.div
              key={p.key}
              className={`flex-1 min-w-[160px] ${p.color} text-white p-6 relative`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-xs font-bold uppercase tracking-widest opacity-70 mb-1">
                {t(`period_${p.key}_date`)}
              </div>
              <h3 className="font-display text-lg font-bold leading-tight">
                {t(`period_${p.key}`)}
              </h3>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href={`/${locale}/histoire`} className="btn-primary">
            {locale === 'fr' ? 'Lire le récit complet' : 'Read the full story'}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
