// components/SpeciesList.js
import Link from 'next/link';
import { useState } from 'react';

const SpeciesList = () => {
  const [isOpen, setIsOpen] = useState(false);

  const allSpecies = [
    'Brachypelma hamorii',
    'Chromatopelma cyaneopubescens',
    'Grammostola pulchra',
    'Lasiodora parahybana',
    'Tliltocatl albopilosus',
    // Add more species names as needed
  ];

  const sortedSpecies = allSpecies.sort();

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
        <ul className="mt-4 space-y-2">
          {sortedSpecies.map((species, index) => (
            <li key={index}>
              <Link href={`/species/${species.toLowerCase().replace(/ /g, '-')}`} legacyBehavior>
                <a className="text-zinc-600 hover:text-blue-600">{species}</a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SpeciesList;