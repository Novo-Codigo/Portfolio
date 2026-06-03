import { useTranslations } from 'next-intl';
import Header from '@/components/header';
import Hero from '@/components/hero';

export default function HomePage() {
  const t = useTranslations('HomePage');
  return (
    <div>
      <Header />
      <Hero />
    </div>
  );
}
