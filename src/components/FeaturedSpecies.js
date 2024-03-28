// components/FeaturedSpecies.js
import Image from 'next/image';
import Link from 'next/link';

const FeaturedSpecies = ({ species }) => {
  if (!species) {
    return <div>No featured species available</div>;
  }

  return (
    <section className="featured-species bg-zinc-900 py-16">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center text-red-500 font-rock-salt">
          Featured Species
        </h2>
        <div className="bg-zinc-800 rounded-lg shadow-md p-6 md:flex md:items-center md:justify-between relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-black opacity-70"></div>
          </div>
          {species.image && (
            <div className="md:w-1/2 relative z-10">
              <Image
                src={species.image}
                alt={`${species.genus} ${species.species}`}
                width={400}
                height={400}
                className="w-full h-auto rounded-lg mb-4 md:mb-0 shadow-lg transform -rotate-3"
              />
            </div>
          )}
          <div className="md:w-1/2 md:pl-8 relative z-10">
            <h3 className="text-3xl font-bold mb-2 text-white">
              {species.genus} {species.species}
            </h3>
            <p className="text-zinc-300 mb-4">{species.description}</p>
            <Link href={`/species/${species.slug}`} legacyBehavior>
              <a className="inline-block bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition duration-300 font-bold uppercase tracking-wider">
                Learn More
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSpecies;