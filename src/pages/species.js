import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { db } from '../../firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import HeaderTwo from '@/components/HeaderTwo';

const SpeciesPage = () => {
  const [groupedSpecies, setGroupedSpecies] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState(''); // Add state for filter

  useEffect(() => {
    const fetchAllSpecies = async () => {
      try {
        console.log('Fetching all species...');
        const speciesRef = collection(db, 'species');
        const speciesSnapshot = await getDocs(speciesRef);

        if (speciesSnapshot.empty) {
          console.log('No species found in the database');
          setError('No species found in the database');
        } else {
          const speciesData = speciesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          console.log('Fetched species:', speciesData);

          // Sort and group by genus
          const sortedSpecies = speciesData.sort((a, b) => a.genus.localeCompare(b.genus) || a.species.localeCompare(b.species));
          const speciesByGenus = sortedSpecies.reduce((acc, species) => {
            acc[species.genus] = [...(acc[species.genus] || []), species];
            return acc;
          }, {});

          setGroupedSpecies(speciesByGenus);
        }
      } catch (error) {
        console.error('Error fetching species:', error);
        setError('Error fetching species');
      } finally {
        setLoading(false);
      }
    };

    fetchAllSpecies();
  }, []);

  console.log('SpeciesPage component rendered');

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Function to filter species by regex pattern
 // Function to filter species by regex pattern against genus, species, or altName
const filterSpecies = (speciesList) => {
  try {
    const regex = new RegExp(filter, 'i'); // 'i' for case-insensitive
    return speciesList.filter((species) => 
      regex.test(species.genus) || 
      regex.test(species.species) ||
      (species.altName && regex.test(species.altName)) // Check altName if it exists
    );
  } catch (error) {
    console.error('Invalid regex:', error);
    return []; // Return empty list if regex is invalid
  }
};


  return (
    <>
      <section className="species-page bg-black py-16" style={{ backgroundImage: "url('/webbing.png')", backgroundRepeat: 'repeat' }}>
      <HeaderTwo noBackground={true} />
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">All Species</h1>
          {/* Add search input */}
          <input
  type="text"
  className="w-full p-4 bg-white bg-opacity-20 text-white placeholder-gray-300 border-0 rounded-md focus:ring-2 focus:ring-opacity-50 focus:ring-white focus:outline-none"
  placeholder="Search for a genus or species"
  value={filter}
  onChange={handleFilterChange}
/>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
            {Object.entries(groupedSpecies).map(([genus, speciesList]) => {
              const filteredSpecies = filterSpecies(speciesList);
              return filteredSpecies.length > 0 ? (
                <div key={genus} className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
                  <h2 className="text-2xl font-bold mb-4">{genus}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {filteredSpecies.map((species) => (
                      <Link key={species.id} href={`/species/${species.slug}`} legacyBehavior>
                        <a className="bg-zinc-900 rounded-lg shadow-md p-6 hover:bg-zinc-800 transition duration-300">
                          <Image
                            src={species.image || '/noimage.png'}
                            alt={`${species.genus} ${species.species}`}
                            width={300}
                            height={200}
                            className="w-full h-auto rounded-lg mb-4"
                          />
                                                    <h3 className="text-xl font-bold">{species.genus} {species.species}</h3>
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null;
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default SpeciesPage;

