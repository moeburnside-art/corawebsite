'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { MapPin, Mail } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const locale = useLocale();

  const links = [
    { key: 'history', href: '/histoire' },
    { key: 'site', href: '/site' },
    { key: 'itineraries', href: '/itineraires' },
    { key: 'association', href: '/association' },
    { key: 'gallery', href: '/galerie' },
    { key: 'news', href: '/actualites' },
    { key: 'contact', href: '/contact' },
  ];

  return (
    <footer className="bg-stone-dark text-parchment">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl text-gold font-bold mb-2">Camp de Cora</h3>
            <p className="text-stone-light text-sm mb-4">{t('tagline')}</p>
            <div className="flex items-start gap-2 text-sm text-stone-light mt-4">
              <MapPin size={16} className="mt-0.5 flex-shrink-0 text-gold" />
              <span>Saint-Moré, 89270 Yonne<br />Bourgogne-Franche-Comté, France</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-stone-light mt-2">
              <Mail size={16} className="text-gold" />
              <a href="mailto:contact@camp-cora.fr" className="hover:text-gold transition-colors">
                contact@camp-cora.fr
              </a>
            </div>
          </div>

          {/* Nav links */}
          <div>
            <h4 className="text-gold text-sm font-semibold uppercase tracking-widest mb-4">
              {t('links_title')}
            </h4>
            <ul className="space-y-2">
              {links.map(link => (
                <li key={link.key}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-stone-light text-sm hover:text-gold transition-colors"
                  >
                    {tNav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Partners */}
          <div>
            <h4 className="text-gold text-sm font-semibold uppercase tracking-widest mb-4">
              Partenaires
            </h4>
            <ul className="space-y-2 text-sm text-stone-light">
              <li><a href="https://www.rempart.com" target="_blank" rel="noopener" className="hover:text-gold transition-colors">Union Rempart</a></li>
              <li><a href="https://www.tourisme-yonne.com" target="_blank" rel="noopener" className="hover:text-gold transition-colors">Tourisme Yonne</a></li>
              <li><a href="https://www.burgundy-tourism.com" target="_blank" rel="noopener" className="hover:text-gold transition-colors">Bourgogne Tourisme</a></li>
              <li><a href="https://pop.culture.gouv.fr/notice/merimee/PA00113833" target="_blank" rel="noopener" className="hover:text-gold transition-colors">Ministère de la Culture</a></li>
            </ul>
            <div className="mt-6 pt-6 border-t border-stone/30">
              <span className="inline-block bg-roman/20 border border-roman/30 text-roman-light text-xs px-3 py-1 uppercase tracking-widest">
                Monument Historique — PA00113833
              </span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-stone/30 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-stone-light text-xs">{t('rights')}</p>
          <Link href={`/${locale}/legal`} className="text-stone-light text-xs hover:text-gold transition-colors">
            {t('legal')}
          </Link>
        </div>
      </div>
    </footer>
  );
}
