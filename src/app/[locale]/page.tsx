import { useTranslations } from 'next-intl';
import Header from '@/components/header';
import Hero from '@/components/hero';
import Projects from '@/components/projects';
import Footer from '@/components/footer';

export default function HomePage() {
  const t = useTranslations('HomePage');
  return (
    <div>
      <Header />
      <Hero />
      <Projects />
      <Footer />
    </div>
  );
}
