'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Shield, Layers, Award, Hammer } from 'lucide-react';

export default function SitePage() {
  const t = useTranslations('site');
  const locale = useLocale();

  const dimensions = [
    { key: 'dim_shape', icon: '⬭' },
    { key: 'dim_length', icon: '↔' },
    { key: 'dim_width', icon: '↕' },
    { key: 'dim_area', icon: '▦' },
    { key: 'dim_wall', icon: '🧱' },
    { key: 'dim_towers', icon: '🗼' },
    { key: 'dim_moat', icon: '〰' },
  ];

  return (
    <div className="pt-20">
      {/* Header */}
      <div className="bg-stone-dark text-white py-20 px-4 text-center">
        <span className="period-badge bg-gold/20 text-gold mb-4 inline-block">
          Monument Historique — PA00113833
        </span>
        <h1 className="font-display text-4xl lg:text-6xl font-bold text-white mb-4">{t('title')}</h1>
        <p className="text-parchment/80 text-lg">{t('subtitle')}</p>
      </div>

      {/* Dimensions grid */}
      <section className="bg-roman text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-center mb-8 text-gold">
            {t('dimensions_title')}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {dimensions.map((d, i) => (
              <motion.div
                key={d.key}
                className="bg-white/10 backdrop-blur p-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <div className="text-2xl mb-2">{d.icon}</div>
                <div className="text-xs text-white/90 font-medium">{t(d.key)}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Wall section */}
      <section className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Shield size={36} className="text-roman mb-4" />
            <h2 className="section-title">{t('wall_title')}</h2>
            <p className="text-gray-600 leading-relaxed text-lg">{t('wall_text')}</p>
          </motion.div>
          <div className="grid grid-cols-2 gap-3">
            {[
              'murail/IMG20260514131849.jpg',
              'murail/IMG20260514131851.jpg',
              'murail/IMG20260514131853.jpg',
              'murail/IMG20260514131855.jpg',
            ].map((src, i) => (
              <div key={i} className="aspect-square relative overflow-hidden bg-stone/10">
                <Image src={`/images/${src}`} alt={`Muraille Cora ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Moat */}
      <section className="bg-parchment py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="lg:order-2">
              <Layers size={36} className="text-roman mb-4" />
              <h2 className="section-title">{t('moat_title')}</h2>
              <p className="text-gray-600 leading-relaxed text-lg">{t('moat_text')}</p>
            </div>
            <div className="lg:order-1 aspect-video relative overflow-hidden bg-stone/10">
              <Image
                src="/images/murail/IMG20260514131942.jpg"
                alt="Fossé défensif du Camp de Cora"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Classification */}
      <section className="bg-roman text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Award size={48} className="text-gold mx-auto mb-6" />
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-6">{t('classification_title')}</h2>
          <p className="text-parchment/90 text-lg leading-relaxed mb-8">{t('classification_text')}</p>
          <div className="inline-block border-2 border-gold px-8 py-4">
            <div className="text-gold text-sm font-bold uppercase tracking-widest">14 Septembre 1971</div>
            <div className="text-2xl font-display font-bold mt-1">Monument Historique</div>
            <div className="text-parchment/70 text-sm mt-1">Réf. PA00113833</div>
          </div>
        </div>
      </section>

      {/* Restoration */}
      <section className="section-container">
        <div className="max-w-3xl mx-auto text-center">
          <Hammer size={36} className="text-roman mx-auto mb-4" />
          <h2 className="section-title">{t('restoration_title')}</h2>
          <p className="text-gray-600 leading-relaxed text-lg">{t('restoration_text')}</p>
        </div>

        {/* Photo strip chantier */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            'murail/IMG20260514132000.jpg',
            'panneaux/thumbs/9-campcora-unpatrimoineapreserver.jpg',
            'panneaux/thumbs/8-PanneauArriveCamp.jpg',
            'panneaux/thumbs/10-PanneauParking.jpg',
          ].map((src, i) => (
            <div key={i} className="aspect-square relative overflow-hidden">
              <Image src={`/images/${src}`} alt={`Chantier restauration ${i + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
