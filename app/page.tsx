import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SocialProof from '@/components/SocialProof';
import Problem from '@/components/Problem';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import Stats from '@/components/Stats';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      {/* Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:bg-accent focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:outline-none"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        <Hero />
        <SocialProof />
        <Problem />
        <Features />
        <HowItWorks />
        <Stats />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTASection />
      </main>

      <Footer />
    </>
  );
}
