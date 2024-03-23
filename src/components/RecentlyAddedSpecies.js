import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { db } from '../../firebase-config';
import { collection, getDocs } from 'firebase/firestore';

const RecentlyAddedSpecies = () => {
  const [randomSpecies, setRandomSpecies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRandomSpecies = async () => {
      try {
        console.log('Fetching random species...');
        const speciesRef = collection(db, 'species');
        const querySnapshot = await getDocs(speciesRef);
        if (querySnapshot.empty) {
          console.log('No species found in the database');
          setError('No species found in the database');
        } else {
          const speciesData = querySnapshot.docs
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
            .filter((species) => species.image);
          const shuffledSpecies = shuffleArray(speciesData);
          const selectedSpecies = shuffledSpecies.slice(0, 3);
          console.log('Random species:', selectedSpecies);
          setRandomSpecies(selectedSpecies);
        }
      } catch (error) {
        console.error('Error fetching random species:', error);
        setError('Error fetching random species');
      } finally {
        setLoading(false);
      }
    };

    fetchRandomSpecies();
  }, []);

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {randomSpecies.length > 0 ? (
        randomSpecies.map((species) => (
          <Link key={species.id} href={`/species/${species.slug}`}>
            <div className="bg-zinc-800 rounded-lg shadow-md p-6 hover:bg-zinc-700 transition duration-300 cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-black opacity-70 transform rotate-6"></div>
              </div>
              <div className="relative z-10">
                <Image
                  src={species.image}
                  alt={`${species.genus} ${species.species}`}
                  width={500}
                  height={500}
                  className="w-full h-48 object-cover mb-4 rounded-md shadow-lg"
                />
                <h3 className="text-2xl font-bold mb-2 text-white">
                  {species.genus} {species.species}
                </h3>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="text-zinc-400">No species found.</div>
      )}
    </div>
  );
};

export default RecentlyAddedSpecies;