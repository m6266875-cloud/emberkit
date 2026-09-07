import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductPreview from '@/components/ProductPreview';
import TechStack from '@/components/TechStack';
import Features from '@/components/Features';
import WhyEmberkit from '@/components/WhyEmberkit';
import Showcase from '@/components/Showcase';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-paper text-ink dark:bg-ink dark:text-paper">
      <Navbar />

      <main>
        <Hero />
        <ProductPreview />
        <TechStack />
        <Features />
        <WhyEmberkit />
        <Showcase />
        <Pricing />
        <FAQ />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}