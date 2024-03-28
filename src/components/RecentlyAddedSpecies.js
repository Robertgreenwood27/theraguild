// components/RecentlyAddedSpecies.js
import Link from 'next/link';
import Image from 'next/image';

const RecentlyAddedSpecies = ({ species }) => {
  if (!species || species.length === 0) {
    return <div className="text-zinc-400">No species found.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {species.map((species) => (
        <Link key={species.id} href={`/species/${species.slug}`}>
          <div className="bg-zinc-800 rounded-lg shadow-md p-6 hover:bg-zinc-700 transition duration-300 cursor-pointer relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-black opacity-70"></div>
              <div className="absolute inset-0 bg-grid-pattern bg-repeat bg-center"></div>
            </div>
            <div className="relative z-10">
              {species.image && (
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={species.image}
                    alt={`${species.genus} ${species.species}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md shadow-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300">
                    <span className="text-white text-lg font-bold bg-red-600 px-4 py-2 rounded-full shadow-md">
                      View Details
                    </span>
                  </div>
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2 text-white">
                {species.genus} {species.species}
              </h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RecentlyAddedSpecies;