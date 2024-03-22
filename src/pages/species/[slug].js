// pages/species/[slug].js
import { useRouter } from 'next/router';
import Image from 'next/image';
import Chat from '@/components/Chat';
import HeaderTwo from '@/components/HeaderTwo';
import { initAdmin } from '../../../firebaseAdmin';
import Link from 'next/link';

const MissingData = ({ children }) => (
  <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-md">
    <span className="font-bold">Missing Data:</span> {children}
  </div>
);

export async function getServerSideProps(context) {
  const { slug } = context.params;

  // Initialize Firebase Admin and Firestore
  let db;
  try {
    const firebaseAdmin = await initAdmin(); // Ensure this is awaited and matches your exported function
    db = firebaseAdmin.firestore();
  } catch (error) {
    console.error('Firebase admin initialization error:', error);
    return { notFound: true };
  }

  let speciesData = null;
  try {
    const speciesRef = db.collection('species').where('slug', '==', slug);
    const snapshot = await speciesRef.get();
    if (snapshot.empty) {
      console.log('No matching documents.');
      return { notFound: true };
    }
    snapshot.forEach(doc => {
      speciesData = { id: doc.id, ...doc.data() };
    });
  } catch (error) {
    console.error('Error getting documents:', error);
    return { notFound: true };
  }

  return {
    props: {
      species: speciesData,
    },
  };
}

const SpeciesDetail = ({ species }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <HeaderTwo />
      <div className="species-detail">
        <section className="hero bg-zinc-900 py-16">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {species.genus} {species.species}
            </h1>
            {species.altName && (
              <p className="text-xl text-zinc-400">{species.altName}</p>
            )}
          </div>
        </section>

        <section className="species-info py-16">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="mb-8">
                  {species.image ? (
                    <Image
                      src={species.image} // Make sure species.image is a valid https URL
                      alt={`${species.genus} ${species.species}`}
                      width={200}
                      height={200}
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
                  <h2 className="text-2xl font-bold mb-4">Distribution</h2>
                  {species.distribution ? (
                    <p className="text-zinc-600">{species.distribution}</p>
                  ) : (
                    <MissingData>No distribution information available</MissingData>
                  )}
                </div>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Habitat</h2>
                  {species.habitat ? (
                    <p className="text-zinc-600">{species.habitat}</p>
                  ) : (
                    <MissingData>No habitat information available</MissingData>
                  )}
                </div>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Size</h2>
                  {species.maxBodyLength || species.maxLegSpan ? (
                    <div>
                      {species.maxBodyLength && (
                        <p className="text-zinc-600">
                          Max Body Length: {species.maxBodyLength} cm
                        </p>
                      )}
                      {species.maxLegSpan && (
                        <p className="text-zinc-600">
                          Max Leg Span: {species.maxLegSpan} cm
                        </p>
                      )}
                    </div>
                  ) : (
                    <MissingData>No size information available</MissingData>
                  )}
                </div>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Lifespan</h2>
                  {species.lifespan ? (
                    <p className="text-zinc-600">
                      Average Lifespan: {species.lifespan} years
                    </p>
                  ) : (
                    <MissingData>No lifespan information available</MissingData>
                  )}
                </div>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Temperament</h2>
                  {species.temperament ? (
                    <p className="text-zinc-600">{species.temperament}</p>
                  ) : (
                    <MissingData>No temperament information available</MissingData>
                  )}
                </div>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Urticating Setae</h2>
                  {species.urticatingSetae ? (
                    <p className="text-zinc-600">{species.urticatingSetae}</p>
                  ) : (
                    <MissingData>No information available about urticating setae</MissingData>
                  )}
                </div>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Venom Potency</h2>
                  {species.venomPotency ? (
                    <p className="text-zinc-600">{species.venomPotency}</p>
                  ) : (
                    <MissingData>No information available about venom potency</MissingData>
                  )}
                </div>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Keeping Difficulty</h2>
                  {species.keepingDifficulty ? (
                    <p className="text-zinc-600">{species.keepingDifficulty}</p>
                  ) : (
                    <MissingData>No information available about keeping difficulty</MissingData>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">Image Gallery</h2>
                  {species.images && species.images.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {species.images.map((imageUrl, index) => (
                        <div key={index}>
                          <Image
                            src={imageUrl}
                            alt={`${species.genus} ${species.species} Gallery Image ${index + 1}`}
                            width={500}
                            height={500}
                            className="w-full h-auto rounded-lg shadow-md"
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
                <h2 className="text-2xl font-bold mb-4">Chat</h2>
                {/* Render chat component here */}
                <Chat />
              </div>
              <div className="mt-8">
                  <Link href={`/species/edit/${species.slug}`}>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">
                      Edit Species
                    </button>
                  </Link>
                </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SpeciesDetail;