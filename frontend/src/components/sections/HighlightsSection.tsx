'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Shield, Clock, Landmark } from 'lucide-react';

const highlights = [
  { key: 'roman', icon: Shield, color: 'roman' },
  { key: 'monument', icon: Landmark, color: 'gold' },
  { key: 'prehistory', icon: Clock, color: 'forest' },
];

export default function HighlightsSection() {
  const t = useTranslations('home');

  return (
    <section className="bg-stone-dark text-parchment py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((h, i) => {
            const Icon = h.icon;
            return (
              <motion.div
                key={h.key}
                className="flex gap-4 items-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gold/20 flex items-center justify-center">
                  <Icon size={24} className="text-gold" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-gold mb-1">
                    {t(`highlight_${h.key}`)}
                  </h3>
                  <p className="text-stone-light text-sm leading-relaxed">
                    {t(`highlight_${h.key}_text`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
