import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { initAdmin } from '../../../../firebaseAdmin';
import { storage } from '../../../../firebase-config';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { useAuth } from '../../../components/AuthProvider';
import HeaderTwo from '@/components/HeaderTwo';

export async function getServerSideProps(context) {
  const { slug } = context.params;

  // Initialize Firebase Admin and Firestore
  const firebaseAdmin = await initAdmin();
  const db = firebaseAdmin.firestore();

  // Fetch the species data based on the slug
  const speciesRef = db.collection('species').where('slug', '==', slug);
  const snapshot = await speciesRef.get();

  if (snapshot.empty) {
    return { notFound: true };
  }

  let speciesData = null;
  snapshot.forEach(doc => {
    speciesData = { id: doc.id, ...doc.data() };
  });

  return {
    props: {
      species: speciesData,
    },
  };
}

const EditSpeciesPage = ({ species }) => {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(species);
  const [galleryImages, setGalleryImages] = useState(species.images || []);

  useEffect(() => {
    if (!authLoading && !user) {
      // Redirect to the login page if the user is not authenticated
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      if (name === 'image') {
        setFormData((prevData) => ({
          ...prevData,
          [name]: Array.from(files),
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleImageRemove = async (imageUrl) => {
    try {
      // Remove the image from Firebase Storage
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);

      // Remove the image URL from the galleryImages state
      setGalleryImages((prevImages) => prevImages.filter((url) => url !== imageUrl));
    } catch (error) {
      console.error('Error removing image:', error);
    }
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    const uploadedImages = [];

    for (const file of files) {
      const imageRef = ref(storage, `species/gallery/${file.name}`);
      await uploadBytes(imageRef, file);
      const imageUrl = await getDownloadURL(imageRef);
      uploadedImages.push(imageUrl);
    }

    setGalleryImages((prevImages) => [...prevImages, ...uploadedImages]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!user) {
      console.error('User is not authenticated');
      router.push('/login');
      return;
    }

    try {
      const token = await user.getIdToken();

      const speciesData = {};

      for (const key in formData) {
        if (formData[key] !== '' && formData[key] !== undefined) {
          speciesData[key] = formData[key];
        }
      }

      // Set the updated gallery images in speciesData
      speciesData.images = galleryImages;

      // Check if a new primary image is selected
      if (Array.isArray(formData.image) && formData.image.length > 0) {
        const originalFileName = formData.image[0].name;
        const fileExtension = originalFileName.split('.').pop();
        const imageName = `${species.slug}.${fileExtension}`;
        console.log('Uploading primary image:', originalFileName);
        const imageRef = ref(storage, `species/primary/${imageName}`);
        const snapshot = await uploadBytes(imageRef, formData.image[0]);
        const primaryImageUrl = await getDownloadURL(snapshot.ref);
        speciesData.image = primaryImageUrl;
      } else {
        // No new primary image selected, use the existing URL from species data or formData
        speciesData.image = species.image || formData.image;
      }

      const currentTimestamp = new Date().toISOString();
      speciesData.editedAt = currentTimestamp; // Set the editedAt field to the current timestamp

      console.log('Form Data:', formData);
      console.log('Species Data:', speciesData);

      const response = await fetch(`/api/species/${species.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(speciesData),
      });

      if (response.ok) {
        router.push(`/species/${species.slug}`);
      } else {
        console.error('Error updating species:', response.status);
      }
    } catch (error) {
      console.error('Error updating species:', error);
    }

    setLoading(false);
  };

  if (authLoading) {
    // Show a loading state while checking the user's authentication status
    return <div>Loading...</div>;
  }

  return (
    <>
      <HeaderTwo />
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Edit Species</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="genus" className="block mb-1 font-bold">
              Genus:
            </label>
            <input
              type="text"
              id="genus"
              name="genus"
              value={formData.genus}
              onChange={handleChange}
              className="w-full border border-white rounded px-2 py-1 bg-black text-white"
              required
            />
          </div>
          <div>
            <label htmlFor="species" className="block mb-1 font-bold">
              Species:
            </label>
            <input
              type="text"
              id="species"
              name="species"
              value={formData.species}
              onChange={handleChange}
              className="w-full border border-white rounded px-2 py-1 bg-black text-white"
              required
            />
          </div>
          <div className="col-span-2">
  <h2 className="text-xl font-bold mb-2">How to Say It</h2>
</div>
<div>
  <label htmlFor="genusHowToSay" className="block mb-1 font-bold">
    Genus Pronunciation:
  </label>
  <input
    type="text"
    id="genusHowToSay"
    name="genusHowToSay"
    value={formData.genusHowToSay || ''}
    onChange={handleChange}
    className="w-full border border-white rounded px-2 py-1 bg-black text-white"
  />
</div>
<div>
  <label htmlFor="speciesHowToSay" className="block mb-1 font-bold">
    Species Pronunciation:
  </label>
  <input
    type="text"
    id="speciesHowToSay"
    name="speciesHowToSay"
    value={formData.speciesHowToSay || ''}
    onChange={handleChange}
    className="w-full border border-white rounded px-2 py-1 bg-black text-white"
  />
</div>
          <div className="col-span-2">
            <label htmlFor="description" className="block mb-1 font-bold">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-white rounded px-2 py-1 bg-black text-white"
              rows={4}
            ></textarea>
          </div>
          <div>
            <label htmlFor="altName" className="block mb-1 font-bold">
              Alternative Name:
            </label>
            <input
              type="text"
              id="altName"
              name="altName"
              value={formData.altName}
              onChange={handleChange}
              className="w-full border border-white rounded px-2 py-1 bg-black text-white"
            />
          </div>
          <div>
            <label htmlFor="maxBodyLength" className="block mb-1 font-bold">
              Max Body Length (cm):
            </label>
            <input
              type="number"
              id="maxBodyLength"
              name="maxBodyLength"
              value={formData.maxBodyLength}
              onChange={handleChange}
              className="w-full border border-white rounded px-2 py-1 bg-black text-white"
              step="0.1"
            />
          </div>
          <div>
            <label htmlFor="maxLegSpan" className="block mb-1 font-bold">
              Max Leg Span (cm):
            </label>
            <input
              type="number"
              id="maxLegSpan"
              name="maxLegSpan"
              value={formData.maxLegSpan}
              onChange={handleChange}
              className="w-full border border-white rounded px-2 py-1 bg-black text-white"
              step="0.1"
            />
          </div>
          <div>
            <label htmlFor="lifespan" className="block mb-1 font-bold">
              Lifespan (years):
            </label>
            <input
              type="number"
              id="lifespan"
              name="lifespan"
              value={formData.lifespan}
              onChange={handleChange}
              className="w-full border border-white rounded px-2 py-1 bg-black text-white"
            />
          </div>
          <div>
            <label htmlFor="distribution" className="block mb-1 font-bold">
              Distribution:
            </label>
            <input
              type="text"
              id="distribution"
              name="distribution"
              value={formData.distribution}
              onChange={handleChange}
              className="w-full border border-white rounded px-2 py-1 bg-black text-white"
            />
          </div>
          <div>
            <label htmlFor="habitat" className="block mb-1 font-bold">
              Habitat:
            </label>
            <input
              type="text"
              id="habitat"
              name="habitat"
              value={formData.habitat}
              onChange={handleChange}
              className="w-full border border-white rounded px-2 py-1 bg-black text-white"
            />
          </div>
          <div>
            <label htmlFor="temperament" className="block mb-1 font-bold">
              Temperament:
            </label>
            <input
              type="text"
              id="temperament"
              name="temperament"
              value={formData.temperament}
              onChange={handleChange}
              className="w-full border border-white rounded px-2 py-1 bg-black text-white"
            />
          </div>
          <div>
            <label htmlFor="urticatingSetae" className="block mb-1 font-bold">
              Urticating Setae:
            </label>
            <input
              type="text"
              id="urticatingSetae"
              name="urticatingSetae"
              value={formData.urticatingSetae}
              onChange={handleChange}
              className="w-full border border-white rounded px-2 py-1 bg-black text-white"
            />
          </div>
          <div>
            <label htmlFor="venomPotency" className="block mb-1 font-bold">
              Venom Potency:
            </label>
            <input
              type="text"
              id="venomPotency"
              name="venomPotency"
              value={formData.venomPotency}
              onChange={handleChange}
              className="w-full border border-white rounded px-2 py-1 bg-black text-white"
            />
          </div>
          <div>
            <label htmlFor="keepingDifficulty" className="block mb-1 font-bold">
              Keeping Difficulty:
            </label>
            <select
              id="keepingDifficulty"
              name="keepingDifficulty"
              value={formData.keepingDifficulty}
              onChange={handleChange}
              className="w-full border border-white rounded px-2 py-1 bg-black text-white"
            >
              <option value="">Select difficulty</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
          <div className="col-span-2">
            <label htmlFor="primaryImage" className="block mb-1 font-bold">
              Primary Image:
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleChange}
              className="w-full border border-white rounded px-2 py-1 bg-black text-white"
            />
            {formData.image && formData.image.length > 0 && (
              <div className="mt-2">
                <strong>Uploaded primary image:</strong>
                <p>{formData.image[0].name}</p>
              </div>
            )}
          </div>
          <div className="col-span-2">
            <label className="block mb-1 font-bold">Gallery Images:</label>
            <div className="grid grid-cols-4 gap-4">
              {galleryImages.map((imageUrl, index) => (
                <div key={index} className="relative">
                  <img src={imageUrl} alt={`Gallery Image ${index + 1}`} className="w-full h-auto" />
                  <button
                    type="button"
                    onClick={() => handleImageRemove(imageUrl)}
                    className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-full"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
            <label htmlFor="galleryImages" className="block mt-4 mb-1 font-bold">
              Add Gallery Images:
            </label>
            <input
              type="file"
              id="galleryImages"
              onChange={handleImageUpload}
              multiple
              className="w-full border border-white rounded px-2 py-1 bg-black text-white"
            />
          </div>
          <div className="col-span-2">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Species'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditSpeciesPage;