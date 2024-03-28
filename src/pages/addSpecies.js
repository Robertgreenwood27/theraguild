// addSpecies.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { storage } from '../../firebase-config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuth } from '../components/AuthProvider';
import HeaderTwo from '@/components/HeaderTwo';

const AddSpeciesPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadedFileNames, setUploadedFileNames] = useState([]);


  useEffect(() => {
    if (user) {
      console.log(`addSpecies.js loaded. Current user: ${user.email}`);
    } else {
      console.log('addSpecies.js loaded. No user is currently authenticated.');
    }
  }, [user]);

  const [formData, setFormData] = useState({
    genus: '',
    species: '',
    genusHowToSay: '',
    speciesHowToSay: '',
    description: '',
    altName: '',
    maxBodyLength: '',
    maxLegSpan: '',
    lifespan: '',
    distribution: '',
    habitat: '',
    temperament: '',
    urticatingSetae: '',
    venomPotency: '',
    keepingDifficulty: '',
    images: [],
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      if (name === 'image') {
        setFormData((prevData) => ({
          ...prevData,
          [name]: Array.from(files),
        }));
      } else if (name === 'images') {
        setFormData((prevData) => ({
          ...prevData,
          [name]: prevData[name].concat(Array.from(files)),
        }));
        setUploadedFileNames((prevNames) => [
          ...prevNames,
          ...Array.from(files).map(file => file.name),
        ]);
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };





  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    if (!user) {
      console.error('User is not authenticated');
      // Redirect the user to the login page
      router.push('/login');
      return;
    }
  
    try {
      const token = await user.getIdToken();
  
      // Generate the slug based on genus and species
      const slug = `${formData.genus}-${formData.species}`.toLowerCase().replace(/ /g, '-');
  
      console.log('formData.image:', formData.image);
  
      // Upload gallery images to Firebase Storage
      const galleryImageUrls = await Promise.all(
        formData.images.map(async (image) => {
          const imageRef = ref(storage, `species/gallery/${image.name}`);
          await uploadBytes(imageRef, image);
          return await getDownloadURL(imageRef);
        })
      );
  
      // Upload primary image to Firebase Storage
      let primaryImageUrl = '';
      if (formData.image && formData.image.length > 0) {
        const originalFileName = formData.image[0].name;
        const fileExtension = originalFileName.split('.').pop();
        const imageName = `${slug}.${fileExtension}`;
        console.log('Uploading primary image:', originalFileName);
        const imageRef = ref(storage, `species/primary/${imageName}`);
        const snapshot = await uploadBytes(imageRef, formData.image[0]);
        primaryImageUrl = await getDownloadURL(snapshot.ref);
      }
  
      const currentTimestamp = new Date().toISOString();
  
      const speciesData = {
        ...formData,
        slug,
        images: galleryImageUrls,
        image: primaryImageUrl,
        createdAt: currentTimestamp,
        genusHowToSay: formData.genusHowToSay,
        speciesHowToSay: formData.speciesHowToSay,
      };
  
      const response = await fetch('/api/species', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(speciesData),
      });
  
      if (response.ok) {
        const cache = getCache();
        await cache.del('allSpecies');

        const app = await initAdmin();
        const db = app.firestore();
        const allSpeciesSnapshot = await db.collection('species').get();
        const allSpecies = allSpeciesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        await cache.set('allSpecies', JSON.stringify(allSpecies), 'EX', 3600); // Cache for 1 hour
        router.push(`/species/${slug}`);
      } else {
        console.error('Error adding species:', response.status);
        // Handle the error, show an error message, or perform any necessary actions
      }
    } catch (error) {
      console.error('Error adding species:', error);
      // Handle the error, show an error message, or perform any necessary actions
    }
  
    setLoading(false);
  };

  return (
    <>
    <HeaderTwo/>
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Species</h1>
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
    value={formData.genusHowToSay}
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
    value={formData.speciesHowToSay}
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
        
        
  <div>
  <label htmlFor="image" className="block mb-1 font-bold">
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
    <label htmlFor="images" className="block mb-1 font-bold">
        Gallery Images:
    </label>
    <input
        type="file"
        id="images"
        name="images"
        onChange={handleChange}
        className="w-full border border-white rounded px-2 py-1 bg-black text-white"
        multiple
    />
    
    
    <div className="mt-2">
  <strong>Uploaded files:</strong>
  <ul>
    {uploadedFileNames.map((fileName, index) => (
      <li key={index}>{fileName}</li>
    ))}
  </ul>
</div>
</div>
        <div className="col-span-2">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Species'}
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default AddSpeciesPage;