// components/PopularSpecies.js
import { useEffect, useState } from 'react';
import Link from 'next/link';

const PopularSpecies = () => {
  const [popularSpecies, setPopularSpecies] = useState([]);

  useEffect(() => {
    // Simulated API call to fetch popular species
    const fetchPopularSpecies = async () => {
      try {
        const response = await fetch('/api/species/popular');
        const data = await response.json();
        setPopularSpecies(data);
      } catch (error) {
        console.error('Error fetching popular species:', error);
      }
    };

    fetchPopularSpecies();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {popularSpecies.map((species) => (
        <Link key={species.id} href={`/species/${species.id}`}>
          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300">
            <img src={species.image} alt={species.name} className="w-full h-40 object-cover mb-4 rounded-md" />
            <h3 className="text-xl font-semibold mb-2">{species.name}</h3>
            <p className="text-gray-600">{species.scientificName}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PopularSpecies;