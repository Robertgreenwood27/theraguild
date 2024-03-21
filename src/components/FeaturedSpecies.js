import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { db } from '../../firebase-config';
import { collection, getDocs } from 'firebase/firestore';

const FeaturedSpecies = () => {
  const [featuredSpecies, setFeaturedSpecies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedSpecies = async () => {
      try {
        console.log('Fetching featured species...');
        const speciesRef = collection(db, 'species');
        const speciesSnapshot = await getDocs(speciesRef);

        if (speciesSnapshot.empty) {
          console.log('No species found in the database');
          setError('No species found in the database');
        } else {
          const speciesData = speciesSnapshot.docs
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
            .filter((species) => species.image);

          if (speciesData.length === 0) {
            console.log('No species with valid images found');
            setError('No species with valid images found');
          } else {
            const randomIndex = Math.floor(Math.random() * speciesData.length);
            const selectedSpecies = speciesData[randomIndex];

            console.log('Selected featured species:', selectedSpecies);
            setFeaturedSpecies(selectedSpecies);
          }
        }
      } catch (error) {
        console.error('Error fetching featured species:', error);
        setError('Error fetching featured species');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedSpecies();
  }, []);

  console.log('Featured Species component rendered');

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!featuredSpecies) {
    return <div>No featured species available</div>;
  }

  return (
    <section className="featured-species bg-black py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Species</h2>
        <div className="bg-zinc-900 rounded-lg shadow-md p-6 md:flex md:items-center md:justify-between">
          <div className="md:w-1/2">
            <Image
              src={featuredSpecies.image}
              alt={`${featuredSpecies.genus} ${featuredSpecies.species}`}
              width={200} // Adjust the width as needed
              height={200} // Adjust the height as needed
              className="w-full h-auto rounded-lg mb-4 md:mb-0"
            />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <h3 className="text-2xl font-bold mb-2">
              {featuredSpecies.genus} {featuredSpecies.species}
            </h3>
            <p className="text-gray-400 mb-4">{featuredSpecies.description}</p>
            <Link href={`/species/${featuredSpecies.slug}`} legacyBehavior>
              <a className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300">
                Learn More
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSpecies;