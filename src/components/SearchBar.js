import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { db } from '../../firebase-config';
import { collection, getDocs } from 'firebase/firestore';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [species, setSpecies] = useState([]);
  const [filteredSpecies, setFilteredSpecies] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const speciesRef = collection(db, 'species');
        const speciesSnapshot = await getDocs(speciesRef);
        const speciesData = speciesSnapshot.docs.map((doc) => doc.data());
        const sortedSpeciesData = speciesData.sort((a, b) => {
          if (a.genus === b.genus) {
            return a.species.localeCompare(b.species); // Sort by species if genera are the same
          }
          return a.genus.localeCompare(b.genus); // Sort by genus
        });
        setSpecies(sortedSpeciesData);
      } catch (error) {
        console.error('Error fetching species:', error);
      }
    };

    fetchSpecies();
  }, []);

  useEffect(() => {
    const filtered = species.filter((s) =>
      `${s.genus} ${s.species}`.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSpecies(filtered);
  }, [searchQuery, species]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      router.push(`/species/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setShowDropdown(true);
  };

  const handleSpeciesClick = (selectedSpecies) => {
    setSearchQuery(`${selectedSpecies.genus} ${selectedSpecies.species}`);
    setShowDropdown(false);
    router.push(`/species/${selectedSpecies.slug}`);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="relative max-w-md mx-auto">
      <form onSubmit={handleSearch} className="flex items-center">
        <input
          type="text"
          placeholder="Search for a tarantula species..."
          value={searchQuery}
          onChange={handleInputChange}
          className="w-full px-4 py-2 text-lg text-white placeholder-zinc-400 bg-zinc-800 border border-zinc-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <button
          type="button"
          onClick={toggleDropdown}
          className="px-4 py-2 text-lg font-semibold text-white bg-gradient-to-r from-red-600 to-black hover:from-red-700 hover:to-black focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 transform hover:scale-105"
        >
          <svg
            className={`w-5 h-5 fill-current transition duration-300 transform ${
              showDropdown ? 'rotate-180' : ''
            }`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </form>
      {showDropdown && (
        <ul className="absolute z-10 w-full mt-1 bg-zinc-800 border border-zinc-700 rounded-md shadow-lg overflow-auto max-h-60">
          {filteredSpecies.map((species) => (
            <li
              key={species.id}
              onClick={() => handleSpeciesClick(species)}
              className="px-4 py-2 cursor-pointer text-zinc-200 hover:bg-gradient-to-r hover:from-red-600 hover:to-black transition duration-300"
            >
              {species.genus} {species.species}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;