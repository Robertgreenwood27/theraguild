// pages/index.js
import Head from 'next/head';
import Header from '../components/Header';
import Hero from '../components/Hero';
import FeaturedSpecies from '../components/FeaturedSpecies';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';

export default function LandingPage() {
  return (
    <div>
      <Head>
        <title>TheraGuild - A Community for Tarantula Enthusiasts</title>
        <meta name="description" content="Discover, learn, and share knowledge about tarantulas with TheraGuild, the ultimate platform for tarantula enthusiasts worldwide." />
      </Head>
      <Header />
      <Hero />
      <FeaturedSpecies />
      <CtaSection />
      <Footer />
    </div>
  );
}