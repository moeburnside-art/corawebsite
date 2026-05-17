'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';

const periods = [
  { key: 'neolithic', icon: '🪨', accent: '#8B6914' },
  { key: 'bronze', icon: '⚔️', accent: '#B8860B' },
  { key: 'iron', icon: '🛡️', accent: '#6B7280' },
  { key: 'roman', icon: '🦅', accent: '#8B1A1A' },
  { key: 'merovingian', icon: '✝️', accent: '#2D5016' },
  { key: 'discovery', icon: '🔍', accent: '#1A3A5C' },
];

export default function HistoirePage() {
  const t = useTranslations('history');
  const locale = useLocale();

  return (
    <div className="pt-20">
      {/* Page header */}
      <div className="bg-stone-dark text-white py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src="/images/reconstitutions/reconstcampcoraV1.png" alt="" fill className="object-cover" />
        </div>
        <div className="relative z-10">
          <span className="period-badge bg-roman/30 text-roman-light mb-4 inline-block">
            {locale === 'fr' ? '−4000 av. J.-C. → VIIIe siècle' : '−4000 BC → 8th century AD'}
          </span>
          <h1 className="font-display text-4xl lg:text-6xl font-bold text-white mb-4">{t('title')}</h1>
          <p className="text-parchment/80 text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>
      </div>

      {/* Timeline */}
      <section className="section-container">
        <h2 className="font-display text-3xl font-bold text-stone-dark text-center mb-16">
          {t('timeline_title')}
        </h2>

        <div className="space-y-0">
          {periods.map((p, i) => (
            <motion.div
              key={p.key}
              className={`flex gap-8 items-start ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} relative`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              {/* Content */}
              <div className="flex-1 pb-16">
                <div className={`${i % 2 === 0 ? 'text-right pr-12' : 'text-left pl-12'} max-w-lg ${i % 2 === 0 ? 'ml-auto' : 'mr-auto'}`}>
                  <span
                    className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 mb-3"
                    style={{ backgroundColor: `${p.accent}20`, color: p.accent }}
                  >
                    {t(`period_${p.key}_date`)}
                  </span>
                  <h3 className="font-display text-2xl lg:text-3xl font-bold text-stone-dark mb-3">
                    {p.icon} {t(`period_${p.key}`)}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{t(`period_${p.key}_text`)}</p>
                </div>
              </div>

              {/* Center dot */}
              <div className="flex-shrink-0 w-6 flex flex-col items-center">
                <div
                  className="w-5 h-5 rounded-full border-4 border-white shadow-lg z-10 relative"
                  style={{ backgroundColor: p.accent }}
                />
                {i < periods.length - 1 && (
                  <div className="w-0.5 flex-1 mt-1" style={{ backgroundColor: `${p.accent}40`, minHeight: '60px' }} />
                )}
              </div>

              <div className="flex-1" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Via Agrippa focus */}
      <section className="bg-stone-dark text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="period-badge bg-gold/20 text-gold mb-6 inline-block">
            Via Agrippa
          </span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-6">{t('via_agrippa_title')}</h2>
          <p className="text-parchment/80 text-lg leading-relaxed">{t('via_agrippa_text')}</p>

          {/* Route visual */}
          <div className="mt-10 flex items-center justify-center gap-4 text-sm">
            {['Lugdunum (Lyon)', 'Augustodunum (Autun)', 'Cora ★', 'Agedincum (Sens)', 'Gesoriacum (Boulogne)'].map((city, i, arr) => (
              <div key={city} className="flex items-center gap-4">
                <span className={`font-semibold ${city.includes('Cora') ? 'text-gold text-base' : 'text-parchment/70'}`}>
                  {city}
                </span>
                {i < arr.length - 1 && <span className="text-gold/40">—</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Archaeological finds */}
      <section className="section-container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="section-title">
            {locale === 'fr' ? 'Les Découvertes Archéologiques' : 'Archaeological Discoveries'}
          </h2>
          <p className="text-gray-600 mb-12">
            {locale === 'fr'
              ? 'Fouilles menées par l\'Abbé Poulaine (XIXe s.) et Baudoin & Marcel Bonneville (1852)'
              : 'Excavations by Abbé Poulaine (19th c.) and Baudoin & Marcel Bonneville (1852)'}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { n: '592', label: locale === 'fr' ? 'Vases céramiques' : 'Ceramic vases' },
              { n: '379', label: locale === 'fr' ? 'Éclats de silex' : 'Flint flakes' },
              { n: '19', label: locale === 'fr' ? 'Objets en bronze' : 'Bronze objects' },
              { n: '300+', label: locale === 'fr' ? 'Monnaies romaines' : 'Roman coins' },
            ].map(stat => (
              <div key={stat.n} className="bg-parchment border border-stone/20 p-6 text-center">
                <div className="font-display text-4xl font-bold text-roman mb-2">{stat.n}</div>
                <div className="text-stone text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
