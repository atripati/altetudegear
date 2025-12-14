import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { HeroSection } from '@/components/HeroSection';
import { CollectionsSection } from '@/components/CollectionsSection';
import { BestSellersSection } from '@/components/BestSellersSection';
import { WhySection } from '@/components/WhySection';
import { BrandStorySection } from '@/components/BrandStorySection';
import { NewsletterSection } from '@/components/NewsletterSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />
      
      <main>
        <HeroSection />
        <CollectionsSection />
        <BestSellersSection />
        <WhySection />
        <BrandStorySection />
        <NewsletterSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
