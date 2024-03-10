// pages/index.js
import Head from 'next/head';
import Hero from '../components/Hero';
import FeaturedSpecies from '../components/FeaturedSpecies';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <div>
      <Head>
        <title>ArachneGuild - A Community for Tarantula Enthusiasts</title>
        <meta name="description" content="Discover, learn, and share knowledge about tarantulas with ArachneGuild, the ultimate platform for tarantula enthusiasts worldwide." />
      </Head>
      <Hero />
      <FeaturedSpecies />
      <CtaSection />
      <Footer />
    </div>
  );
}