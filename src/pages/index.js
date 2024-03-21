import Head from 'next/head';
import { useAuth } from '../components/AuthProvider'; // Update the path to your AuthProvider
import FeaturedSpecies from '../components/FeaturedSpecies';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import RecentlyAddedSpecies from '../components/RecentlyAddedSpecies';
import CtaSection from '../components/CtaSection';
import { useEffect } from 'react';

export default function LandingPage() {
  const { user } = useAuth(); // Use the useAuth hook from your AuthProvider

  useEffect(() => {
    if (user) {
      console.log(`index.js loaded. Current user: ${user.email}`);
    } else {
      console.log('index.js loaded. No user is currently authenticated.');
    }
  }, [user]);

  return (
    <div>
      <Head>
        <title>ArachneGuild - The World&apos;s Largest Tarantula Resource</title>
        <meta name="description" content="Discover, learn, and contribute to the most comprehensive database of tarantula species. ArachneGuild is the ultimate platform for tarantula enthusiasts worldwide." />
      </Head>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to ArachneGuild</h1>
        <p className="text-xl mb-8">Discover the world&apos;s (soon to be) largest tarantula database.</p>
        <SearchBar />
        <section className="my-12">
          <h2 className="text-3xl font-bold mb-4">Featured Species</h2>
          <FeaturedSpecies />
        </section>
        <section className="my-12">
          <h2 className="text-3xl font-bold mb-4">Recently Updated Species</h2>
          <RecentlyAddedSpecies />
        </section>
        {!user && (
          <section className="my-12">
            <CtaSection />
          </section>
        )}
      </main>
    </div>
  );
}