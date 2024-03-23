import Head from 'next/head';
import { useAuth } from '../components/AuthProvider';
import FeaturedSpecies from '../components/FeaturedSpecies';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import RecentlyAddedSpecies from '../components/RecentlyAddedSpecies';
import CtaSection from '../components/CtaSection';
import { useEffect } from 'react';

export default function LandingPage() {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      console.log(`index.js loaded. Current user: ${user.email}`);
    } else {
      console.log('index.js loaded. No user is currently authenticated.');
    }
  }, [user]);

  return (
    <div className="bg-zinc-900 text-white min-h-screen">
      <Head>
        <title>ArachneGuild - The World&apos;s Largest Tarantula Resource</title>
        <meta name="description" content="Discover, learn, and contribute to the most comprehensive database of tarantula species. ArachneGuild is the ultimate platform for tarantula enthusiasts worldwide." />
      </Head>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold mb-8 text-red-500 font-rock-salt">Welcome to ArachneGuild</h1>
        <p className="text-2xl mb-12 text-zinc-300">Discover the world&apos;s (soon to be) largest tarantula database.</p>
        <SearchBar />
        <section className="my-16">
          <FeaturedSpecies />
        </section>
        <section className="my-16">
          <h2 className="text-4xl font-bold mb-8 text-red-500 font-rock-salt">Check These Out</h2>
          <RecentlyAddedSpecies />
        </section>
        {!user && (
          <section className="my-16">
            <CtaSection />
          </section>
        )}
      </main>
    </div>
  );
}