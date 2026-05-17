'use client';

import { useLocale } from 'next-intl';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
const MEDIA_BASE = process.env.NEXT_PUBLIC_MEDIA_URL || 'http://localhost:8000';

type Category = 'all' | 'photos' | 'reconstructions' | 'chantier' | 'plans';

interface GalleryItem {
  id: number;
  title_fr: string;
  title_en: string;
  description_fr: string;
  description_en: string;
  image: string | null;
  video_url: string;
  is_featured: boolean;
  category: { name: string; label_fr: string; label_en: string } | null;
}

// Items statiques (toujours présents, sans API)
const staticItems: GalleryItem[] = [
  {
    id: -1, title_fr: 'Reconstitution V1 — Vue aérienne', title_en: 'Reconstruction V1 — Aerial view',
    description_fr: 'Vue aérienne reconstituée du Camp de Cora au IVe siècle.',
    description_en: 'Reconstructed aerial view of Camp de Cora in the 4th century.',
    image: '/images/reconstitutions/reconstcampcoraV1.png', video_url: '', is_featured: true,
    category: { name: 'reconstructions', label_fr: 'Reconstitutions', label_en: 'Reconstructions' },
  },
  {
    id: -2, title_fr: 'Vue lointaine reconstituée', title_en: 'Reconstructed distant view',
    description_fr: '', description_en: '',
    image: '/images/murail/recon_vue_lointaine.jpg', video_url: '', is_featured: false,
    category: { name: 'reconstructions', label_fr: 'Reconstitutions', label_en: 'Reconstructions' },
  },
  {
    id: -3, title_fr: 'Vue rapprochée reconstituée', title_en: 'Reconstructed close view',
    description_fr: '', description_en: '',
    image: '/images/murail/recon_vue_proche.jpg', video_url: '', is_featured: false,
    category: { name: 'reconstructions', label_fr: 'Reconstitutions', label_en: 'Reconstructions' },
  },
  {
    id: -4, title_fr: 'Muraille — Section Est', title_en: 'Rampart — East section',
    description_fr: '', description_en: '',
    image: '/images/murail/IMG20260514131849.jpg', video_url: '', is_featured: true,
    category: { name: 'photos', label_fr: 'Photos', label_en: 'Photos' },
  },
  {
    id: -5, title_fr: 'Tour de flanquement', title_en: 'Flanking tower',
    description_fr: '', description_en: '',
    image: '/images/murail/IMG20260514131853.jpg', video_url: '', is_featured: false,
    category: { name: 'photos', label_fr: 'Photos', label_en: 'Photos' },
  },
  {
    id: -6, title_fr: 'Muraille — Détail appareil', title_en: 'Rampart — Stone detail',
    description_fr: '', description_en: '',
    image: '/images/murail/IMG20260514131851.jpg', video_url: '', is_featured: false,
    category: { name: 'photos', label_fr: 'Photos', label_en: 'Photos' },
  },
  {
    id: -7, title_fr: 'Fossé défensif', title_en: 'Defensive moat',
    description_fr: '', description_en: '',
    image: '/images/murail/IMG20260514131942.jpg', video_url: '', is_featured: false,
    category: { name: 'photos', label_fr: 'Photos', label_en: 'Photos' },
  },
  {
    id: -8, title_fr: 'Panneau arrivée au camp', title_en: 'Camp arrival panel',
    description_fr: '', description_en: '',
    image: '/images/panneaux/large/8-PanneauArriveCamp.jpg', video_url: '', is_featured: false,
    category: { name: 'plans', label_fr: 'Plans & Cartes', label_en: 'Plans & Maps' },
  },
  {
    id: -9, title_fr: 'Un patrimoine à préserver', title_en: 'A heritage to preserve',
    description_fr: '', description_en: '',
    image: '/images/panneaux/large/9-campcora-unpatrimoineapreserver.jpg', video_url: '', is_featured: false,
    category: { name: 'plans', label_fr: 'Plans & Cartes', label_en: 'Plans & Maps' },
  },
];

const tabs: { key: Category; labelFr: string; labelEn: string }[] = [
  { key: 'all',             labelFr: 'Tout',           labelEn: 'All' },
  { key: 'photos',          labelFr: 'Photos',         labelEn: 'Photos' },
  { key: 'reconstructions', labelFr: 'Reconstitutions',labelEn: 'Reconstructions' },
  { key: 'plans',           labelFr: 'Panneaux',       labelEn: 'Panels' },
  { key: 'chantier',        labelFr: 'Chantier 2025',  labelEn: '2025 Worksite' },
];

function resolveImageUrl(path: string | null): string | null {
  if (!path) return null;
  if (path.startsWith('/images/')) return path;           // image statique locale
  if (path.startsWith('http')) return path;               // URL absolue
  return `${MEDIA_BASE}/media/${path}`;                   // media Django
}

export default function GaleriePage() {
  const locale = useLocale();
  const [active, setActive] = useState<Category>('all');
  const [apiItems, setApiItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  // Charger les items depuis l'API Django
  useEffect(() => {
    fetch(`${API_BASE}/gallery/`)
      .then(r => r.json())
      .then(data => {
        const results = Array.isArray(data) ? data : (data.results ?? []);
        setApiItems(results);
      })
      .catch(() => setApiItems([]))
      .finally(() => setLoading(false));
  }, []);

  // Fusionner items statiques + API (dédoublonnage par image)
  const allItems = [...staticItems, ...apiItems];

  const filtered = active === 'all'
    ? allItems
    : allItems.filter(i => i.category?.name === active);

  const slides = filtered
    .map(i => resolveImageUrl(i.image))
    .filter(Boolean)
    .map(src => ({ src: src as string }));

  return (
    <div className="pt-20">
      {/* Header */}
      <div className="bg-stone-dark text-white py-20 px-4 text-center">
        <h1 className="font-display text-4xl lg:text-6xl font-bold text-white mb-4">
          {locale === 'fr' ? 'Galerie & Médias' : 'Gallery & Media'}
        </h1>
        <p className="text-parchment/80 text-lg">
          {locale === 'fr'
            ? 'Photos, reconstitutions et documents du site'
            : 'Photos, reconstructions and site documents'}
        </p>
        {apiItems.length > 0 && (
          <p className="text-gold text-sm mt-2">
            {apiItems.length} {locale === 'fr' ? 'photos chargées depuis la base de données' : 'photos loaded from database'}
          </p>
        )}
      </div>

      <section className="section-container">
        {/* Onglets */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`px-5 py-2 text-sm font-semibold uppercase tracking-wide transition-colors border
                ${active === tab.key
                  ? 'bg-roman text-white border-roman'
                  : 'border-stone/30 text-stone hover:border-roman hover:text-roman'
                }`}
            >
              {locale === 'fr' ? tab.labelFr : tab.labelEn}
              {tab.key === 'chantier' && apiItems.filter(i => i.category?.name === 'chantier').length > 0 && (
                <span className="ml-2 bg-gold text-stone-dark text-xs px-1.5 py-0.5 rounded-full">
                  {apiItems.filter(i => i.category?.name === 'chantier').length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Grille */}
        {loading ? (
          <div className="text-center py-20 text-stone">
            <div className="animate-spin w-8 h-8 border-2 border-roman border-t-transparent rounded-full mx-auto mb-4" />
            {locale === 'fr' ? 'Chargement des photos...' : 'Loading photos...'}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            <AnimatePresence>
              {filtered.map((item, i) => {
                const imgUrl = resolveImageUrl(item.image);
                if (!imgUrl) return null;
                return (
                  <motion.div
                    key={`${item.id}-${item.image}`}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="group relative aspect-square overflow-hidden bg-stone/10 cursor-pointer"
                    onClick={() => setLightboxIndex(i)}
                  >
                    <Image
                      src={imgUrl}
                      alt={locale === 'fr' ? item.title_fr : item.title_en}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      unoptimized={imgUrl.startsWith('http://localhost:8000')}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end">
                      <p className="text-white text-xs font-medium px-3 py-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 line-clamp-2">
                        {locale === 'fr' ? item.title_fr : item.title_en}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <p className="text-center text-stone py-12">
            {locale === 'fr' ? 'Aucun élément dans cette catégorie.' : 'No items in this category.'}
          </p>
        )}
      </section>

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        slides={slides}
        index={lightboxIndex}
      />
    </div>
  );
}
