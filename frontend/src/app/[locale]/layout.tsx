import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter, Playfair_Display } from 'next/font/google';
import '../globals.css';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'Camp de Cora — Monument Historique, Saint-Moré, Yonne',
  description:
    "Découvrez le Camp de Cora, site archéologique gallo-romain classé Monument Historique depuis 1971, à Saint-Moré dans l'Yonne (Bourgogne). 6000 ans d'histoire sur la Via Agrippa.",
  keywords:
    'Camp de Cora, Saint-Moré, Yonne, gallo-romain, monument historique, archéologie, Bourgogne, Via Agrippa',
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable}`}>
      <body className={`${inter.className} bg-parchment-light text-gray-900`}>
        <NextIntlClientProvider messages={messages}>
          <Navbar locale={locale} />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
