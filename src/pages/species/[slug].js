// pages/species/[slug].js
import { useRouter } from 'next/router';
import Image from 'next/image';
import Chat from '@/components/Chat';
import HeaderTwo from '@/components/HeaderTwo';

const MissingData = ({ children }) => (
  <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-md">
    <span className="font-bold">Missing Data:</span> {children}
  </div>
);

const SpeciesDetail = () => {
  const router = useRouter();
  const { slug } = router.query;

  // Placeholder data for demonstration purposes
  const speciesData = {
    'brachypelma-hamorii': {
      name: 'Brachypelma hamorii',
      image: '/species1.jpg',
      description: 'The Mexican Red Knee tarantula is a popular choice for beginners due to its docile nature and striking appearance.',
      // Add more species details as needed
    },
    // Add more species data as needed
  };

  const species = speciesData[slug];

  if (!species) {
    return <div>Species not found</div>;
  }

  return (
    <>
    <HeaderTwo/>
    <div className="species-detail">
      <section className="hero bg-zinc-900 py-16">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{species.name}</h1>
        </div>
      </section>

      <section className="species-info py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="mb-8">
                {species.image ? (
                  <Image
                    src={species.image}
                    alt={species.name}
                    width={500}
                    height={500}
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                ) : (
                  <MissingData>No image available</MissingData>
                )}
              </div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Description</h2>
                {species.description ? (
                  <p className="text-zinc-600">{species.description}</p>
                ) : (
                  <MissingData>No description available</MissingData>
                )}
              </div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">In the Wild</h2>
                {species.inTheWild ? (
                  <p className="text-zinc-600">{species.inTheWild}</p>
                ) : (
                  <MissingData>No information available for in the wild</MissingData>
                )}
              </div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">In Captivity</h2>
                {species.inCaptivity ? (
                  <p className="text-zinc-600">{species.inCaptivity}</p>
                ) : (
                  <MissingData>No information available for in captivity</MissingData>
                )}
              </div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Caresheet</h2>
                {species.caresheet ? (
                  <p className="text-zinc-600">{species.caresheet}</p>
                ) : (
                  <MissingData>No caresheet available</MissingData>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">Image Gallery</h2>
                {species.gallery ? (
                  // Render image gallery component here
                  <div>Image Gallery</div>
                ) : (
                  <MissingData>No images available in the gallery</MissingData>
                )}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Chat</h2>
              {/* Render chat component here */}
              <Chat/>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default SpeciesDetail;