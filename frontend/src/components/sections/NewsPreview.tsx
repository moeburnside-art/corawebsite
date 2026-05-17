'use client';

import { useLocale } from 'next-intl';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';

export default function NewsPreview() {
  const locale = useLocale();

  const staticNews = [
    {
      id: 1,
      title: locale === 'fr' ? 'Chantier bénévole été 2025' : 'Summer 2025 Volunteer Worksite',
      date: '17–30 août 2025',
      excerpt: locale === 'fr'
        ? 'L\'Union Rempart organise un chantier de restauration du murail. Inscriptions ouvertes !'
        : 'Union Rempart organises a rampart restoration worksite. Registrations open!',
    },
    {
      id: 2,
      title: locale === 'fr' ? 'Journées Européennes de l\'Archéologie 2025' : 'European Archaeology Days 2025',
      date: 'Juin 2025',
      excerpt: locale === 'fr'
        ? 'Le Camp de Cora participe aux Journées Européennes de l\'Archéologie avec visites guidées.'
        : 'Camp de Cora takes part in the European Archaeology Days with guided tours.',
    },
    {
      id: 3,
      title: locale === 'fr' ? 'Relevé topographique CORA2025' : 'CORA2025 Topographic Survey',
      date: 'Mai 2025',
      excerpt: locale === 'fr'
        ? 'Un relevé topographique complet du camp vient d\'être réalisé avec un tachéomètre Leica.'
        : 'A complete topographic survey of the camp has just been completed with a Leica total station.',
    },
  ];

  return (
    <section className="bg-parchment-dark py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-display text-3xl font-bold text-stone-dark">
            {locale === 'fr' ? 'Actualités' : 'Latest News'}
          </h2>
          <Link href={`/${locale}/actualites`} className="flex items-center gap-2 text-roman text-sm font-semibold hover:gap-3 transition-all">
            {locale === 'fr' ? 'Toutes les actualités' : 'All news'}
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {staticNews.map(item => (
            <div key={item.id} className="card-heritage p-6">
              <div className="flex items-center gap-2 text-stone/60 text-xs mb-3">
                <Calendar size={12} />
                {item.date}
              </div>
              <h3 className="font-display text-lg font-bold text-stone-dark mb-2 leading-tight">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.excerpt}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
