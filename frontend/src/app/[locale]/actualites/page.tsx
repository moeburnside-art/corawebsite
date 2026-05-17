'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Calendar, ArrowRight } from 'lucide-react';

const newsItems = [
  {
    id: 1,
    date: '17–30 août 2025',
    isEvent: true,
    titleFr: 'Chantier bénévole été 2025 — Union Rempart',
    titleEn: 'Summer 2025 Volunteer Worksite — Union Rempart',
    contentFr: `L'Union Rempart organise un nouveau chantier bénévole de restauration du Camp de Cora du 17 au 30 août 2025.
    Au programme : débroussaillage du rempart, tri et consolidation des pierres, rejointoiement à la chaux traditionnelle.
    Logement et repas inclus. Ouvert à tous, aucune compétence technique requise.`,
    contentEn: `Union Rempart organises a new volunteer restoration worksite at Camp de Cora from 17 to 30 August 2025.
    Programme: clearing the rampart, sorting and consolidating stones, lime mortar repointing.
    Accommodation and meals included. Open to all, no technical skills required.`,
  },
  {
    id: 2,
    date: 'Juin 2025',
    isEvent: true,
    titleFr: 'Journées Européennes de l\'Archéologie 2025',
    titleEn: 'European Archaeology Days 2025',
    contentFr: `Le Camp de Cora participe aux Journées Européennes de l'Archéologie avec des visites guidées gratuites du site,
    des animations pédagogiques pour les scolaires et une exposition temporaire sur les fouilles du XIXe siècle.`,
    contentEn: `Camp de Cora takes part in the European Archaeology Days with free guided tours of the site,
    educational activities for school groups, and a temporary exhibition on the 19th-century excavations.`,
  },
  {
    id: 3,
    date: 'Mai 2025',
    isEvent: false,
    titleFr: 'Relevé topographique CORA2025 achevé',
    titleEn: 'CORA2025 Topographic Survey Completed',
    contentFr: `Un relevé topographique complet du Camp de Cora vient d'être réalisé à l'aide d'un tachéomètre Leica (station totale).
    Plus de 100 points géoréférencés ont été enregistrés, permettant de produire un plan numérique précis au format DXF.
    Ce document servira de base à la prochaine phase de restauration.`,
    contentEn: `A complete topographic survey of Camp de Cora has been completed using a Leica total station.
    More than 100 georeferenced points were recorded, enabling the production of a precise digital plan in DXF format.
    This document will serve as the basis for the next restoration phase.`,
  },
];

export default function ActualitesPage() {
  const locale = useLocale();

  return (
    <div className="pt-20">
      <div className="bg-stone-dark text-white py-20 px-4 text-center">
        <h1 className="font-display text-4xl lg:text-6xl font-bold text-white mb-4">
          {locale === 'fr' ? 'Actualités & Événements' : 'News & Events'}
        </h1>
        <p className="text-parchment/80 text-lg">
          {locale === 'fr' ? 'Suivez la vie du Camp de Cora et de son association' : 'Follow the life of Camp de Cora and its association'}
        </p>
      </div>

      <section className="section-container">
        <div className="max-w-3xl mx-auto space-y-10">
          {newsItems.map(item => (
            <article key={item.id} className="border-b border-stone/20 pb-10">
              <div className="flex items-center gap-3 mb-3">
                <Calendar size={16} className="text-roman" />
                <span className="text-stone text-sm">{item.date}</span>
                {item.isEvent && (
                  <span className="bg-roman/10 text-roman text-xs font-semibold px-3 py-0.5 uppercase tracking-wide">
                    {locale === 'fr' ? 'Événement' : 'Event'}
                  </span>
                )}
              </div>
              <h2 className="font-display text-2xl font-bold text-stone-dark mb-3">
                {locale === 'fr' ? item.titleFr : item.titleEn}
              </h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {locale === 'fr' ? item.contentFr : item.contentEn}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
