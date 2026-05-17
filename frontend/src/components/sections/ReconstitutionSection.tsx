'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function ReconstitutionSection() {
  const locale = useLocale();

  return (
    <section className="bg-stone-dark relative overflow-hidden">
      <div className="relative">
        <div className="aspect-[21/9] relative">
          <Image
            src="/images/reconstitutions/reconstcampcoraV1.png"
            alt="Reconstitution du Camp de Cora — Vue aérienne"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-dark/80 via-transparent to-stone-dark/30" />
        </div>

        {/* Overlay content */}
        <motion.div
          className="absolute inset-0 flex items-center"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-lg">
              <span className="period-badge bg-roman/20 text-roman-light mb-4 inline-block">
                Reconstitution 3D
              </span>
              <h2 className="font-display text-3xl lg:text-5xl font-bold text-white mb-4">
                {locale === 'fr'
                  ? "Le Camp tel qu'il était au IVe siècle"
                  : 'The Camp as it stood in the 4th century'}
              </h2>
              <p className="text-parchment/80 mb-6 leading-relaxed">
                {locale === 'fr'
                  ? 'Vue aérienne reconstituée du Camp de Cora : muraille crénelée, tours de flanquement, Via Agrippa au premier plan et la vallée de la Cure en contrebas.'
                  : 'Reconstructed aerial view of the Camp de Cora: crenellated rampart, flanking towers, Via Agrippa in the foreground and the Cure Valley below.'}
              </p>
              <Link href={`/${locale}/histoire`} className="btn-secondary">
                {locale === 'fr' ? 'Découvrir l\'histoire complète' : 'Discover the full history'}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
