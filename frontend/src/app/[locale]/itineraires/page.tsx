'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Car, Train, Clock, MapPin, CheckCircle } from 'lucide-react';

const CoraMap = dynamic(() => import('@/components/ui/CoraMap'), { ssr: false });

const routes = [
  {
    key: 'route1',
    distance: '4.5 km',
    duration: '2h',
    difficulty: 'easy',
    image: '/images/panneaux/thumbs/8-PanneauArriveCamp.jpg',
    color: 'roman',
  },
  {
    key: 'route2',
    distance: '3 km',
    duration: '1h30',
    difficulty: 'easy',
    image: '/images/panneaux/thumbs/4-PanneauAbbeParat.jpg',
    color: 'stone',
  },
  {
    key: 'route3',
    distance: '5 km',
    duration: '2h',
    difficulty: 'easy',
    image: '/images/panneaux/thumbs/3-PancarteVersPistreGR13.jpg',
    color: 'forest',
  },
];

export default function ItinerairesPage() {
  const t = useTranslations('itineraries');
  const locale = useLocale();

  const practicals = [
    { key: 'practical_free', icon: CheckCircle },
    { key: 'practical_open', icon: CheckCircle },
    { key: 'practical_family', icon: CheckCircle },
    { key: 'practical_gr', icon: CheckCircle },
    { key: 'practical_restaurant', icon: CheckCircle },
  ];

  return (
    <div className="pt-20">
      {/* Header */}
      <div className="bg-forest text-white py-20 px-4 text-center">
        <h1 className="font-display text-4xl lg:text-6xl font-bold text-white mb-4">{t('title')}</h1>
        <p className="text-parchment/80 text-lg">{t('subtitle')}</p>
      </div>

      {/* Access */}
      <section className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <MapPin size={36} className="text-roman mb-4" />
            <h2 className="section-title">{t('access_title')}</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">{t('access_text')}</p>
            <div className="space-y-3">
              <div className="flex gap-3 bg-parchment p-4 border-l-4 border-roman">
                <Car size={20} className="text-roman flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600">{t('access_car')}</p>
              </div>
              <div className="flex gap-3 bg-parchment p-4 border-l-4 border-stone">
                <Train size={20} className="text-stone flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600">{t('access_train')}</p>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="h-80 lg:h-auto min-h-[320px] bg-stone/10 border border-stone/20">
            <CoraMap />
          </div>
        </div>
      </section>

      {/* Routes */}
      <section className="bg-parchment py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {routes.map((route, i) => (
              <motion.div
                key={route.key}
                className="card-heritage overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="aspect-video relative">
                  <Image src={route.image} alt={t(`${route.key}_name`)} fill className="object-cover" />
                  <div className={`absolute top-3 left-3 bg-${route.color} text-white text-xs font-bold uppercase px-3 py-1`}>
                    {locale === 'fr' ? `Itinéraire ${i + 1}` : `Route ${i + 1}`}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-stone-dark mb-2">
                    {t(`${route.key}_name`)}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{t(`${route.key}_desc`)}</p>
                  <div className="flex gap-4 text-xs text-stone font-semibold">
                    <span>📍 {route.distance}</span>
                    <span><Clock size={12} className="inline" /> {route.duration}</span>
                    <span>⭐ {locale === 'fr' ? 'Facile' : 'Easy'}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Panels gallery */}
      <section className="section-container">
        <h2 className="section-title text-center mb-10">
          {locale === 'fr' ? 'Panneaux de l\'itinéraire' : 'Trail Information Panels'}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {Array.from({ length: 10 }, (_, i) => `/images/panneaux/thumbs/${i}-${[
            'PancarteRN6SortieArcy',
            'PanneauVillageCamping',
            'PanneauVillageEglise',
            'PancarteVersPistreGR13',
            'PanneauAbbeParat',
            'PancarteAbbeParat',
            'PancarteMisChemin',
            'PancarteAvantArrive',
            'PanneauArriveCamp',
            'campcora-unpatrimoineapreserver',
          ][i]}.jpg`).map((src, i) => (
            <div key={i} className="aspect-square relative overflow-hidden bg-stone/10 cursor-pointer hover:scale-105 transition-transform duration-300">
              <Image src={src} alt={`Panneau ${i}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* Practical info */}
      <section className="bg-stone-dark text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold text-gold mb-10">{t('practical_title')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {practicals.map(p => {
              const Icon = p.icon;
              return (
                <div key={p.key} className="flex items-center gap-3 bg-white/10 px-5 py-4">
                  <Icon size={18} className="text-gold flex-shrink-0" />
                  <span className="text-parchment text-sm">{t(p.key)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
