// components/SpeciesList.js
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { db } from '../../firebase-config';
import { collection, getDocs } from 'firebase/firestore';

const SpeciesList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [allSpecies, setAllSpecies] = useState([]);

  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const speciesCollection = collection(db, 'species');
        const speciesSnapshot = await getDocs(speciesCollection);
        const speciesData = speciesSnapshot.docs.map((doc) => doc.data());
        setAllSpecies(speciesData);
      } catch (error) {
        console.error('Error fetching species:', error);
      }
    };

    fetchSpecies();
  }, []);

  const sortedSpecies = allSpecies.sort((a, b) => {
    if (a.genus === b.genus) {
      return a.species.localeCompare(b.species);
    }
    return a.genus.localeCompare(b.genus);
  });

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mt-8">
      <button
        onClick={toggleList}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {isOpen ? 'Close Species List' : 'View All Species'}
      </button>
      {isOpen && (
        <div className="mt-4 max-h-64 overflow-y-auto">
          <ul className="space-y-2">
            {sortedSpecies.map((species) => (
              <li key={species.id}>
                <Link href={`/species/${species.slug}`} legacyBehavior>
                  <a className="text-zinc-600 hover:text-blue-600">
                    {species.genus} {species.species}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SpeciesList;