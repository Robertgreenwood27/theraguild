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
    <section
      className="species-page bg-gradient-to-b from-zinc-900 to-black py-16"
      style={{
        backgroundImage: "url('/webbing.png')",
        backgroundRepeat: 'repeat',
        backgroundBlendMode: 'overlay',
      }}
    >
      <HeaderTwo noBackground={true} />
      <div className="container mx-auto">
        <h1 className="text-5xl font-bold mb-8 text-center text-white">
          Explore the Incredible Diversity of Tarantulas
        </h1>
        <div className="relative mb-8">
          <input
            type="text"
            className="w-full p-4 bg-white bg-opacity-20 text-white placeholder-gray-300 border-0 rounded-md focus:outline-none"
            placeholder="Search for a genus or species"
            value={filter}
            onChange={handleFilterChange}
          />
          <div className="absolute inset-0 rounded-md border-2 border-transparent pointer-events-none animate-chase"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Object.entries(groupedSpecies).map(([genus, speciesList]) => {
            const filteredSpecies = filterSpecies(speciesList);
            return filteredSpecies.length > 0 ? (
              <div
                key={genus}
                className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4"
              >
                <h2 className="text-3xl font-bold mb-4 text-red-500">{genus}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {filteredSpecies.map((species) => (
                    <Link key={species.id} href={`/species/${species.slug}`} legacyBehavior>
                      <a className="bg-zinc-800 rounded-lg shadow-md p-6 hover:bg-zinc-700 transition duration-300 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-black opacity-70 transition duration-300 group-hover:opacity-80"></div>
                        <div className="relative z-10">
                          <div className="relative overflow-hidden rounded-lg mb-4">
                            <Image
                              src={species.image || '/noimage.png'}
                              alt={`${species.genus} ${species.species}`}
                              width={300}
                              height={200}
                              className="w-full h-auto rounded-lg shadow-lg transition duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-red-500 transition duration-300 pointer-events-none animate-chase"></div>
                          </div>
                          <h3 className="text-xl font-bold text-white">
                            {species.genus} {species.species}
                          </h3>
                        </div>
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