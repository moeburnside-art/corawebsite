import HeroSection from '@/components/sections/HeroSection';
import HighlightsSection from '@/components/sections/HighlightsSection';
import SaintMoreSection from '@/components/sections/SaintMoreSection';
import TimelinePreview from '@/components/sections/TimelinePreview';
import ReconstitutionSection from '@/components/sections/ReconstitutionSection';
import NewsPreview from '@/components/sections/NewsPreview';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HighlightsSection />
      <SaintMoreSection />
      <ReconstitutionSection />
      <TimelinePreview />
      <NewsPreview />
    </>
  );
}
