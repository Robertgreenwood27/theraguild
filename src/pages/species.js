// pages/species.js
import { useState } from 'react';
import Image from 'next/image';
import SpeciesList from '@/components/SpeciesList';
import HeaderTwo from '@/components/HeaderTwo';

const SpeciesPage = () => {
  const allSpecies = [
    {
      id: 1,
      name: 'Brachypelma hamorii',
      image: '/species1.jpg',
      description: 'The Mexican Red Knee tarantula is a popular choice for beginners due to its docile nature and striking appearance.',
    },
    {
      id: 2,
      name: 'Chromatopelma cyaneopubescens',
      image: '/species2.jpg',
      description: 'The Green Bottle Blue tarantula is known for its vibrant colors and webbing abilities.',
    },
    // Add more species objects as needed
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter species based on search term
  const filteredSpecies = allSpecies.filter((species) =>
    species.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination values
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSpecies = filteredSpecies.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSpecies.length / itemsPerPage);

  // Handle search input change
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
    <HeaderTwo/>
    <div className="species-page">
      <section className="hero bg-zinc-900 py-16 center">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Tarantula Species</h1>
          <p className="text-xl text-zinc-600 mb-8">
            Explore the diverse world of tarantulas and discover fascinating species from around the globe.
          </p>
          <input
            type="text"
            placeholder="Search species..."
            value={searchTerm}
            onChange={handleSearch}
            className="px-4 py-2 w-full md:w-1/2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <SpeciesList/>
      </section>

      <section className="species-list py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentSpecies.map((species) => (
              <div key={species.id} className="species-card bg-black rounded-lg shadow-md overflow-hidden">
                <Image
                  src={species.image}
                  alt={species.name}
                  width={500}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-4">{species.name}</h2>
                  <p className="text-zinc-600">{species.description}</p>
                  <a href={`/species/${species.id}`} className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Learn More
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-1 px-4 py-2 rounded-md ${
                  currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default SpeciesPage;