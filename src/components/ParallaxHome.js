import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useAuth } from '../components/AuthProvider';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import FeaturedSpecies from '../components/FeaturedSpecies';
import RecentlyAddedSpecies from '../components/RecentlyAddedSpecies';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';

const ParallaxHome = ({ featuredSpecies, recentlyAddedSpecies }) => {
  const { user } = useAuth();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-zinc-900 text-white">
      <Head>
        <title>ArachneGuild - The World's Largest Tarantula Resource</title>
        <meta
          name="description"
          content="Discover, learn, and contribute to the most comprehensive database of tarantula species. ArachneGuild is the ultimate platform for tarantula enthusiasts worldwide."
        />
      </Head>

      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>

      {/* Hero Section with Parallax */}
      <div className="relative h-screen overflow-hidden">
        {/* Background Layer */}
        <div 
          className="absolute inset-0 bg-zinc-900"
          style={{ 
            transform: `translateY(${scrollY * 0.5}px)`,
            backgroundImage: "url('/cobwebsdark.png')",
            backgroundSize: 'cover',
            opacity: 0.5
          }}
        />

        {/* Middle Layer - Spider Silhouettes */}
        <div 
          className="absolute inset-0"
          style={{ 
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        >
          <div className="absolute top-1/4 left-1/4 w-32 h-32 opacity-30">
            <Image
              src="/tarantula-silhouette.png"
              alt="Tarantula Silhouette"
              width={128}
              height={128}
              className="transform rotate-45"
            />
          </div>
          <div className="absolute top-1/2 right-1/4 w-40 h-40 opacity-20">
            <Image
              src="/tarantula-silhouette-2.png"
              alt="Tarantula Silhouette"
              width={160}
              height={160}
              className="transform -rotate-12"
            />
          </div>
        </div>

        {/* Content Layer */}
        <div className="relative h-full flex items-center justify-center px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent">
              Welcome to ArachneGuild
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-zinc-300">
              Discover the world's most comprehensive tarantula database
            </p>
            <div className="max-w-xl mx-auto">
              <SearchBar />
            </div>
          </div>
        </div>

        {/* Foreground Web Elements */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ 
            transform: `translateY(${scrollY * 0.1}px)`,
            backgroundImage: "url('/web-overlay.png')",
            backgroundSize: 'cover',
            opacity: 0.3
          }}
        />
      </div>

      {/* Featured Species Section with Parallax */}
      <div className="relative py-24 bg-zinc-900">
        <div 
          className="absolute inset-0"
          style={{ 
            transform: `translateY(${(scrollY - 500) * 0.2}px)`,
            backgroundImage: "url('/cobwebsred.png')",
            backgroundSize: 'cover',
            opacity: 0.1
          }}
        />
        <div className="relative z-10">
          <FeaturedSpecies species={featuredSpecies} />
        </div>
      </div>

      {/* Recent Species Section */}
      <div className="relative py-24 bg-zinc-800">
        <div className="relative z-10">
          <RecentlyAddedSpecies species={recentlyAddedSpecies} />
        </div>
      </div>

      {/* CTA Section with Parallax */}
      {!user && (
        <div className="relative py-24">
          <div 
            className="absolute inset-0"
            style={{ 
              transform: `translateY(${(scrollY - 1000) * 0.15}px)`,
              backgroundImage: "url('/cobwebsblue.png')",
              backgroundSize: 'cover',
              opacity: 0.2
            }}
          />
          <div className="relative z-10">
            <CtaSection />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ParallaxHome;