'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

export default function SaintMoreSection() {
  const t = useTranslations('home');

  return (
    <section className="section-container">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={18} className="text-roman" />
            <span className="text-roman text-sm font-semibold uppercase tracking-widest">
              Yonne — Bourgogne-Franche-Comté
            </span>
          </div>
          <h2 className="section-title">{t('saint_more_title')}</h2>
          <p className="text-gray-600 leading-relaxed text-lg">{t('saint_more_text')}</p>

          {/* Key facts */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            {[
              { label: 'Département', value: 'Yonne (89)' },
              { label: 'Région', value: 'Bourgogne' },
              { label: "Distance d'Auxerre", value: '29 km' },
              { label: 'De Vézelay (UNESCO)', value: '13 km' },
            ].map(fact => (
              <div key={fact.label} className="bg-parchment border-l-4 border-gold px-4 py-3">
                <p className="text-xs text-stone uppercase tracking-wide font-semibold">{fact.label}</p>
                <p className="font-display text-stone-dark font-bold">{fact.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Map placeholder */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="aspect-[4/3] bg-stone/10 border border-stone/20 flex items-center justify-center relative overflow-hidden">
            {/* Mini static map via OpenStreetMap embed */}
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=3.6%2C47.48%2C3.9%2C47.65&layer=mapnik&marker=47.5761%2C3.7789"
              width="100%"
              height="100%"
              className="absolute inset-0 w-full h-full border-0"
              title="Carte Saint-Moré"
              loading="lazy"
            />
          </div>
          <div className="absolute bottom-4 right-4 bg-stone-dark/90 text-parchment text-xs px-3 py-1">
            Saint-Moré, Yonne
          </div>
        </motion.div>
      </div>
    </section>
  );
}
