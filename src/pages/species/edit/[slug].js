import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { initAdmin } from '../../../../firebaseAdmin';
import { storage } from '../../../../firebase-config';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { useAuth } from '../../../components/AuthProvider';

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
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(species);
  const [galleryImages, setGalleryImages] = useState(species.images || []);

  useEffect(() => {
    if (user) {
      console.log(`editSpecies.js loaded. Current user: ${user.email}`);
    } else {
      console.log('editSpecies.js loaded. No user is currently authenticated.');
    }
  }, [user]);

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

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Species</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {/* ... existing form fields ... */}

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
  );
};

export default EditSpeciesPage;