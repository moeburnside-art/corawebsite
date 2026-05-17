'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Menu, X, Globe } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';

const navItems = [
  { key: 'history', href: '/histoire' },
  { key: 'site', href: '/site' },
  { key: 'itineraries', href: '/itineraires' },
  { key: 'association', href: '/association' },
  { key: 'gallery', href: '/galerie' },
  { key: 'news', href: '/actualites' },
  { key: 'contact', href: '/contact' },
];

export default function Navbar({ locale }: { locale: string }) {
  const t = useTranslations('nav');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const switchLocale = () => {
    const next = locale === 'fr' ? 'en' : 'fr';
    const path = (pathname ?? `/${locale}`).replace(`/${locale}`, `/${next}`);
    router.push(path);
  };

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-stone-dark/95 backdrop-blur shadow-lg' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex flex-col leading-tight group"
          >
            <span className="text-gold font-display font-bold text-xl tracking-wide group-hover:text-gold-light transition-colors">
              Camp de Cora
            </span>
            <span className="text-stone-light text-xs tracking-widest uppercase">
              Monument Historique
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map(item => (
              <Link
                key={item.key}
                href={`/${locale}${item.href}`}
                className={clsx(
                  'text-sm font-medium tracking-wide uppercase transition-colors duration-150',
                  pathname === `/${locale}${item.href}`
                    ? 'text-gold'
                    : 'text-parchment hover:text-gold'
                )}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          {/* Lang switch + mobile */}
          <div className="flex items-center gap-3">
            <button
              onClick={switchLocale}
              className="flex items-center gap-1 text-parchment hover:text-gold transition-colors text-sm font-medium uppercase tracking-wide"
            >
              <Globe size={16} />
              {locale === 'fr' ? 'EN' : 'FR'}
            </button>
            <button
              className="lg:hidden text-parchment hover:text-gold p-1"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-stone-dark/98 backdrop-blur border-t border-stone/20">
          <nav className="flex flex-col px-4 py-4 gap-1">
            <Link
              href={`/${locale}`}
              className="text-parchment hover:text-gold py-2 text-sm uppercase tracking-wide"
              onClick={() => setOpen(false)}
            >
              {t('home')}
            </Link>
            {navItems.map(item => (
              <Link
                key={item.key}
                href={`/${locale}${item.href}`}
                className={clsx(
                  'py-2 text-sm uppercase tracking-wide transition-colors',
                  pathname === `/${locale}${item.href}` ? 'text-gold' : 'text-parchment hover:text-gold'
                )}
                onClick={() => setOpen(false)}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
