import { useEffect, useState } from 'react';
import Link from 'next/link';
import { db } from '../../firebase-config';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

const RecentlyAddedSpecies = () => {
  const [recentSpecies, setRecentSpecies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentSpecies = async () => {
      try {
        console.log('Fetching recently added species...');
        const speciesRef = collection(db, 'species');
        const q = query(speciesRef, orderBy('createdAt', 'desc'), limit(3));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.log('No recently added species found in the database');
          setError('No recently added species found in the database');
        } else {
          const speciesData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          console.log('Recently added species:', speciesData);
          setRecentSpecies(speciesData);
        }
      } catch (error) {
        console.error('Error fetching recently added species:', error);
        setError('Error fetching recently added species');
      } finally {
        setLoading(false);
      }
    };

    fetchRecentSpecies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {recentSpecies.length > 0 ? (
        recentSpecies.map((species) => (
          <Link key={species.id} href={`/species/${species.slug}`}>
            <div className="bg-zinc-800 rounded-lg shadow-md p-4 hover:bg-zinc-700 transition duration-300 cursor-pointer">
              <img
                src={species.image}
                alt={`${species.genus} ${species.species}`}
                className="w-full h-40 object-cover mb-4 rounded-md"
              />
              <h3 className="text-xl font-semibold mb-2">
                {species.genus} {species.species}
              </h3>
            </div>
          </Link>
        ))
      ) : (
        <div>No recent species added.</div>
      )}
    </div>
  );
};

export default RecentlyAddedSpecies;