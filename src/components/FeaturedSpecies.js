// components/FeaturedSpecies.js
import Image from 'next/image';

const FeaturedSpecies = () => {
  const featuredSpecies = [
    {
      name: 'Brachypelma hamorii',
      image: '/species1.jpg',
      description: 'The Mexican Red Knee tarantula is a popular choice for beginners due to its docile nature and striking appearance.',
    },
    {
      name: 'Chromatopelma cyaneopubescens',
      image: '/species2.jpg',
      description: 'The Green Bottle Blue tarantula is known for its vibrant colors and webbing abilities.',
    },
    {
      name: 'Grammostola pulchra',
      image: '/species3.jpg',
      description: 'The Brazilian Black tarantula is a large, jet-black species with a calm temperament.',
    },
  ];

  return (
    <section className="featured-species bg-black py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Species</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredSpecies.map((species, index) => (
            <div key={index} className="species-card bg-zinc-900 rounded-lg shadow-md p-6">
              <Image
                src={species.image}
                alt={species.name}
                width={400}
                height={300}
                className="w-full h-auto rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-2">{species.name}</h3>
              <p className="text-gray-600">{species.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSpecies;