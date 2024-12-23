// pages/species/[slug].js
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Chat from '@/components/Chat';
import HeaderTwo from '@/components/HeaderTwo';
import { supabase } from '@/lib/supabaseClient';
import { getCache } from '../../cacheService';
import { sortedSpeciesList } from '../../lib/speciesList';

const MissingData = ({ children }) => (
  <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-md">
    <span className="font-bold">Missing Data:</span> {children}
  </div>
);

const InfoSection = ({ title, content, missingText }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-bold mb-2 text-red-500">{title}</h2>
    {content ? (
      typeof content === 'string' ? (
        <div className="text-zinc-300">{content}</div>
      ) : (
        content
      )
    ) : (
      <MissingData>{missingText}</MissingData>
    )}
  </div>
);

const SpeciesDetail = ({ species }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const currentIndex = sortedSpeciesList.findIndex(
    (s) => s.slug === species.slug
  );
  const prevSpecies = sortedSpeciesList[currentIndex - 1];
  const nextSpecies = sortedSpeciesList[currentIndex + 1];

  return (
    <>
      <HeaderTwo />
      <div className="species-detail bg-gradient-to-b from-zinc-900 to-black min-h-screen">
        <section className="hero py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              {prevSpecies && (
                <Link href={`/species/${prevSpecies.slug}`} legacyBehavior>
                  <a className="text-red-500 hover:text-red-700">
                    &#8592; Prev: {prevSpecies.genus} {prevSpecies.species}
                  </a>
                </Link>
              )}
              {nextSpecies && (
                <Link href={`/species/${nextSpecies.slug}`} legacyBehavior>
                  <a className="text-red-500 hover:text-red-700">
                    Next: {nextSpecies.genus} {nextSpecies.species} &#8594;
                  </a>
                </Link>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
                  {species.genus} {species.species}
                </h1>
                {species.altName && (
                  <p className="text-xl text-red-500">{species.altName}</p>
                )}
              </div>
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-2 text-red-500">How to Say It</h2>
                {species.genusHowToSay || species.speciesHowToSay ? (
                  <div className="text-zinc-300">
                    {species.genusHowToSay && (
                      <p>{species.genusHowToSay}</p>
                    )}
                    {species.speciesHowToSay && (
                      <p>{species.speciesHowToSay}</p>
                    )}
                  </div>
                ) : (
                  <MissingData>No pronunciation information available</MissingData>
                )}
              </section>
              <div>
                {species.image ? (
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-black rounded-lg transform rotate-3"></div>
                    <Image
                      src={species.image}
                      alt={`${species.genus} ${species.species}`}
                      width={500}
                      height={500}
                      className="relative rounded-lg shadow-md border-4 border-zinc-800 p-2"
                    />
                  </div>
                ) : (
                  <MissingData>No image available</MissingData>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="species-info py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <InfoSection
                      title="Description"
                      content={species.description}
                      missingText="No description available"
                    />
                    <InfoSection
                      title="Distribution"
                      content={species.distribution}
                      missingText="No distribution information available"
                    />
                    <InfoSection
                      title="Habitat"
                      content={species.habitat}
                      missingText="No habitat information available"
                    />
                    <InfoSection
                      title="Size"
                      content={
                        <>
                          {species.maxBodyLength && (
                            <p className="text-zinc-300">
                              Max Body Length: {species.maxBodyLength} cm
                            </p>
                          )}
                          {species.maxLegSpan && (
                            <p className="text-zinc-300">
                              Max Leg Span: {species.maxLegSpan} cm
                            </p>
                          )}
                        </>
                      }
                      missingText="No size information available"
                    />
                  </div>
                  <div>
                    <InfoSection
                      title="Lifespan"
                      content={
                        species.lifespan && (
                          <p className="text-zinc-300">
                            Average Lifespan: {species.lifespan} years
                          </p>
                        )
                      }
                      missingText="No lifespan information available"
                    />
                    <InfoSection
                      title="Temperament"
                      content={species.temperament}
                      missingText="No temperament information available"
                    />
                    <InfoSection
                      title="Urticating Setae"
                      content={species.urticatingSetae}
                      missingText="No information available about urticating setae"
                    />
                    <InfoSection
                      title="Venom Potency"
                      content={species.venomPotency}
                      missingText="No information available about venom potency"
                    />
                    <InfoSection
                      title="Keeping Difficulty"
                      content={species.keepingDifficulty}
                      missingText="No information available about keeping difficulty"
                    />
                  </div>
                </div>
                <div className="mt-16">
                  <h2 className="text-3xl font-bold mb-4 text-white">Image Gallery</h2>
                  {species.images && species.images.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {species.images.map((imageUrl, index) => (
                        <div key={index} className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-black rounded-lg transform -rotate-3"></div>
                          <Image
                            src={imageUrl}
                            alt={`${species.genus} ${species.species} Gallery Image ${index + 1}`}
                            width={500}
                            height={500}
                            className="relative rounded-lg shadow-md"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <MissingData>No images available in the gallery</MissingData>
                  )}
                </div>
              </div>
              <div>
                <div className="bg-gradient-to-r from-red-600 to-black p-4 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold mb-4 text-white">Chat</h2>
                  <Chat />
                </div>
                <div className="mt-8">
                  <Link href={`/species/edit/${species.slug}`}>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
                      Edit Species
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const cache = getCache();

  // Check if the species data is available in the cache
  const cachedSpeciesData = await cache.get(`species:${slug}`);
  if (cachedSpeciesData) {
    return {
      props: {
        species: JSON.parse(cachedSpeciesData),
      },
    };
  }

  try {
    const { data: speciesData, error } = await supabase
      .from('species')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;

    if (!speciesData) {
      return { notFound: true };
    }

    // Store the fetched species data in the cache
    await cache.set(`species:${slug}`, JSON.stringify(speciesData), 'EX', 3600);

    return {
      props: {
        species: speciesData,
      },
    };
  } catch (error) {
    console.error('Error fetching species data:', error);
    return { notFound: true };
  }
}

export default SpeciesDetail;