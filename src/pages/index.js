// pages/index.js
import Head from 'next/head';
import { useAuth } from '../components/AuthProvider';
import FeaturedSpecies from '../components/FeaturedSpecies';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import RecentlyAddedSpecies from '../components/RecentlyAddedSpecies';
import CtaSection from '../components/CtaSection';
import { initAdmin } from '../../firebaseAdmin';
import { getCache } from '../cacheService';
import { unsortedSpeciesList, sortedSpeciesList } from '../lib/speciesList';

export async function getServerSideProps() {
  const cache = getCache();

  const fetchFeaturedSpecies = async () => {
    const cachedData = await cache.get('featuredSpecies');
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const featuredSpecies = sortedSpeciesList[Math.floor(Math.random() * sortedSpeciesList.length)];
    const app = await initAdmin();
    const db = app.firestore();
    const speciesQuery = db.collection('species')
      .where('genus', '==', featuredSpecies.genus)
      .where('species', '==', featuredSpecies.species);
    const speciesSnapshot = await speciesQuery.get();

    if (speciesSnapshot.empty) {
      console.log('Featured species not found in the database');
      return null;
    }

    const featuredSpeciesData = { id: speciesSnapshot.docs[0].id, ...speciesSnapshot.docs[0].data() };
    await cache.set('featuredSpecies', JSON.stringify(featuredSpeciesData), 'EX', 3600);

    return featuredSpeciesData;
  };

  const fetchRecentlyAddedSpecies = async () => {
    const cachedData = await cache.get('recentlyAddedSpecies');
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const recentlyAddedSpecies = unsortedSpeciesList.slice(-3);
    const app = await initAdmin();
    const db = app.firestore();
    const recentlyAddedSpeciesData = [];

    for (const species of recentlyAddedSpecies) {
      const speciesQuery = db.collection('species')
        .where('genus', '==', species.genus)
        .where('species', '==', species.species);
      const speciesSnapshot = await speciesQuery.get();

      if (!speciesSnapshot.empty) {
        recentlyAddedSpeciesData.push({ id: speciesSnapshot.docs[0].id, ...speciesSnapshot.docs[0].data() });
      }
    }

    await cache.set('recentlyAddedSpecies', JSON.stringify(recentlyAddedSpeciesData), 'EX', 3600);

    return recentlyAddedSpeciesData;
  };

  const [featuredSpecies, recentlyAddedSpecies] = await Promise.all([
    fetchFeaturedSpecies(),
    fetchRecentlyAddedSpecies(),
  ]);

  return {
    props: {
      featuredSpecies,
      recentlyAddedSpecies,
    },
  };
}


export default function LandingPage({ featuredSpecies, recentlyAddedSpecies }) {
  const { user } = useAuth();

  return (
    <div className="bg-zinc-900 text-white min-h-screen">
      <Head>
        <title>ArachneGuild - The World&apos;s Largest Tarantula Resource</title>
        <meta
          name="description"
          content="Discover, learn, and contribute to the most comprehensive database of tarantula species. ArachneGuild is the ultimate platform for tarantula enthusiasts worldwide."
        />
      </Head>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold mb-8 text-red-500 font-rock-salt">Welcome to ArachneGuild</h1>
        <p className="text-2xl mb-12 text-zinc-300">Discover the world&apos;s (soon to be) largest tarantula database.</p>
        <SearchBar />
    <section className="my-16">
      <FeaturedSpecies species={featuredSpecies} />
    </section>
    <section className="my-16">
      <h2 className="text-4xl font-bold mb-8 text-red-500 font-rock-salt">Check These Out</h2>
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