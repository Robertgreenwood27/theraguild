// pages/index.js
import Head from 'next/head';
import { useAuth } from '../components/AuthProvider';
import FeaturedSpecies from '../components/FeaturedSpecies';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import RecentlyAddedSpecies from '../components/RecentlyAddedSpecies';
import CtaSection from '../components/CtaSection';
import { supabase } from '@/lib/supabaseClient';

export async function getServerSideProps() {
  // Fetch a random species for the featured section
  const { data: allSpecies, error: allSpeciesError } = await supabase
    .from('species')
    .select('*');

  if (allSpeciesError) {
    console.error('Error fetching all species:', allSpeciesError);
    return {
      props: {
        featuredSpecies: null,
        recentlyAddedSpecies: [],
      }
    };
  }

  // Get a random species for the featured section
  const featuredSpecies = allSpecies.length > 0 
    ? allSpecies[Math.floor(Math.random() * allSpecies.length)]
    : null;

  // Get the 3 most recently added species
  const { data: recentlyAddedSpecies, error: recentError } = await supabase
    .from('species')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3);

  if (recentError) {
    console.error('Error fetching recent species:', recentError);
    return {
      props: {
        featuredSpecies,
        recentlyAddedSpecies: [],
      }
    };
  }

  return {
    props: {
      featuredSpecies,
      recentlyAddedSpecies: recentlyAddedSpecies || [],
    },
  };
}

export default function LandingPage({ featuredSpecies, recentlyAddedSpecies }) {
  const { user } = useAuth();

  return (
    <div className="bg-zinc-900 text-white min-h-screen">
      <Head>
        <title>ArachneGuild - The World's Largest Tarantula Resource</title>
        <meta
          name="description"
          content="Discover, learn, and contribute to the most comprehensive database of tarantula species. ArachneGuild is the ultimate platform for tarantula enthusiasts worldwide."
        />
      </Head>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold mb-8 text-red-500 font-rock-salt">
          Welcome to ArachneGuild
        </h1>
        <p className="text-2xl mb-12 text-zinc-300">
          Discover the world's (soon to be) largest tarantula database.
        </p>
        <SearchBar />
        <section className="my-16">
          <FeaturedSpecies species={featuredSpecies} />
        </section>
        <section className="my-16">
          <h2 className="text-4xl font-bold mb-8 text-red-500 font-rock-salt">
            Check These Out
          </h2>
          <RecentlyAddedSpecies species={recentlyAddedSpecies} />
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