// pages/species.js
import Image from 'next/image';

const SpeciesPage = () => {
  const speciesList = [
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

  return (
    <div className="species-page">
      <section className="hero bg-zinc-900 py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Tarantula Species</h1>
          <p className="text-xl text-zinc-600 mb-8">
            Explore the diverse world of tarantulas and discover fascinating species from around the globe.
          </p>
        </div>
      </section>

      <section className="species-list py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {speciesList.map((species) => (
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
        </div>
      </section>
    </div>
  );
};

export default SpeciesPage;