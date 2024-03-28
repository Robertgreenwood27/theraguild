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

export async function getServerSideProps() {
  // Initialize cache for all species, featured, and recently added species
  const cache = getCache();

  const fetchAllSpecies = async () => {
    const cachedData = await cache.get('allSpecies');
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const app = await initAdmin();
    const db = app.firestore();
    const speciesSnapshot = await db.collection('species').get();
    const speciesData = speciesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    await cache.set('allSpecies', JSON.stringify(speciesData), 'EX', 3600); // Cache for 1 hour

    return speciesData;
  };

  const fetchFeaturedSpecies = async () => {
    const cachedData = await cache.get('featuredSpecies');
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const app = await initAdmin();
    const db = app.firestore();
    const featuredSpeciesSnapshot = await db
      .collection('species')
      .where('image', '!=', '') // Filter species with non-empty image URLs
      .limit(1)
      .get();

    if (featuredSpeciesSnapshot.empty) {
      console.log('No species with valid images found');
      return null;
    }

    const featuredSpeciesData = featuredSpeciesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))[0];

    await cache.set('featuredSpecies', JSON.stringify(featuredSpeciesData), 'EX', 3600); // Cache for 1 hour

    return featuredSpeciesData;
  };

  const fetchRecentlyAddedSpecies = async () => {
    const cachedData = await cache.get('recentlyAddedSpecies');
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const app = await initAdmin();
    const db = app.firestore();
    const recentlyAddedSpeciesSnapshot = await db
      .collection('species')
      .orderBy('createdAt', 'desc')
      .limit(3)
      .get();

    if (recentlyAddedSpeciesSnapshot.empty) {
      console.log('No recently added species found');
      return [];
    }

    const recentlyAddedSpeciesData = recentlyAddedSpeciesSnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((species) => species.image); // Filter species with non-empty image URLs

    await cache.set('recentlyAddedSpecies', JSON.stringify(recentlyAddedSpeciesData), 'EX', 3600); // Cache for 1 hour

    return recentlyAddedSpeciesData;
  };

  const [allSpecies, featuredSpecies, recentlyAddedSpecies] = await Promise.all([
    fetchAllSpecies(),
    fetchFeaturedSpecies(),
    fetchRecentlyAddedSpecies(),
  ]);

  return {
    props: {
      allSpecies,
      featuredSpecies,
      recentlyAddedSpecies,
    },
  };
}


export default function LandingPage({ allSpecies, featuredSpecies, recentlyAddedSpecies }) {
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
        <SearchBar species={allSpecies} />
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