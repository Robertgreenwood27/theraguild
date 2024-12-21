import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';
import { BasicInfoFields } from './BasicInfoFields';
import { MeasurementFields } from './MeasurementFields';
import { CharacteristicsFields } from './CharacteristicsFields';
import { useAuth } from '@/components/AuthProvider';

const INITIAL_FORM_STATE = {
  genus: '',
  species: '',
  description: '',
  alt_name: '',
  max_body_length: '',
  max_leg_span: '',
  lifespan: '',
  distribution: '',
  habitat: '',
  temperament: '',
  urticating_setae: '',
  venom_potency: '',
  keeping_difficulty: '',
  images: [],
  image: null,
  newImages: []
};

export const SpeciesForm = ({ mode = 'add', initialData = null }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(initialData || INITIAL_FORM_STATE);
  const [primaryImagePreview, setPrimaryImagePreview] = useState(initialData?.image || null);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [isDraggingPrimary, setIsDraggingPrimary] = useState(false);
  const [isDraggingGallery, setIsDraggingGallery] = useState(false);

  const handleDragEnterPrimary = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingPrimary(true);
  };

  const handleDragEnterGallery = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingGallery(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingPrimary(false);
    setIsDraggingGallery(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDropPrimary = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingPrimary(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        setFormData(prev => ({ ...prev, image: [file] }));
        const reader = new FileReader();
        reader.onloadend = () => {
          setPrimaryImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }, []);

  const handleDropGallery = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingGallery(false);

    const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
    if (files.length > 0) {
      setFormData(prev => ({
        ...prev,
        newImages: [...(prev.newImages || []), ...files]
      }));

      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setGalleryPreviews(prev => [...prev, reader.result]);
        };
        reader.readAsDataURL(file);
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      if (name === 'image') {
        setFormData(prev => ({ ...prev, [name]: Array.from(files) }));
        const reader = new FileReader();
        reader.onloadend = () => {
          setPrimaryImagePreview(reader.result);
        };
        reader.readAsDataURL(files[0]);
      } else if (name === 'images') {
        const newFiles = Array.from(files);
        setFormData(prev => ({
          ...prev,
          newImages: [...(prev.newImages || []), ...newFiles]
        }));

        newFiles.forEach(file => {
          const reader = new FileReader();
          reader.onloadend = () => {
            setGalleryPreviews(prev => [...prev, reader.result]);
          };
          reader.readAsDataURL(file);
        });
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const removeImage = (index, type) => {
    if (type === 'primary') {
      setFormData(prev => ({ ...prev, image: null }));
      setPrimaryImagePreview(null);
    } else {
      setGalleryPreviews(prev => prev.filter((_, i) => i !== index));
      setFormData(prev => ({
        ...prev,
        newImages: prev.newImages.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!user) {
      setError('You must be logged in to perform this action');
      setLoading(false);
      return;
    }

    try {
      const slug = `${formData.genus}-${formData.species}`.toLowerCase().replace(/ /g, '-');
      let primaryImageUrl = formData.image;

      if (formData.image && typeof formData.image !== 'string') {
        const file = formData.image[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${slug}-${Date.now()}.${fileExt}`;
        const filePath = `primary/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('species-images')
          .upload(filePath, file, { 
            upsert: true,
            cacheControl: '3600'
          });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('species-images')
          .getPublicUrl(filePath);

        primaryImageUrl = publicUrl;
      }

      let galleryImageUrls = formData.images || [];
      if (Array.isArray(formData.newImages)) {
        for (const image of formData.newImages) {
          const fileExt = image.name.split('.').pop();
          const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
          const filePath = `gallery/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('species-images')
            .upload(filePath, image);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('species-images')
            .getPublicUrl(filePath);

          galleryImageUrls.push(publicUrl);
        }
      }

      const speciesData = {
        ...formData,
        image: primaryImageUrl,
        images: galleryImageUrls,
        max_body_length: formData.max_body_length ? parseFloat(formData.max_body_length) : null,
        max_leg_span: formData.max_leg_span ? parseFloat(formData.max_leg_span) : null,
        lifespan: formData.lifespan ? parseInt(formData.lifespan) : null,
        slug,
        user_id: user.id
      };
      
      delete speciesData.newImages;

      if (mode === 'edit') {
        const { error } = await supabase
          .from('species')
          .update(speciesData)
          .eq('id', initialData.id)
          .eq('user_id', user.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('species')
          .insert([speciesData]);

        if (error) throw error;
      }

      router.push(`/species/${slug}`);
    } catch (error) {
      console.error('Error saving species:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
      {error && (
        <div className="col-span-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <BasicInfoFields formData={formData} handleChange={handleChange} />
      <MeasurementFields formData={formData} handleChange={handleChange} />
      <CharacteristicsFields formData={formData} handleChange={handleChange} />

      <div className="col-span-2">
        <label className="block mb-2 text-lg font-medium text-white">
          Primary Image:
        </label>
        <div
          className={`border-2 border-dashed rounded-lg p-4 text-center ${
            isDraggingPrimary ? 'border-blue-500 bg-blue-50 bg-opacity-10' : 'border-gray-300'
          }`}
          onDragEnter={handleDragEnterPrimary}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDropPrimary}
        >
          {primaryImagePreview ? (
            <div className="relative inline-block">
              <img
                src={primaryImagePreview}
                alt="Preview"
                className="max-h-48 rounded"
              />
              <button
                type="button"
                onClick={() => removeImage(0, 'primary')}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          ) : (
            <div className="text-gray-300">
              <p>Drag and drop your primary image here, or</p>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                accept="image/*"
                className="mt-2"
              />
            </div>
          )}
        </div>
      </div>

      <div className="col-span-2">
        <label className="block mb-2 text-lg font-medium text-white">
          Gallery Images:
        </label>
        <div
          className={`border-2 border-dashed rounded-lg p-4 text-center ${
            isDraggingGallery ? 'border-blue-500 bg-blue-50 bg-opacity-10' : 'border-gray-300'
          }`}
          onDragEnter={handleDragEnterGallery}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDropGallery}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {formData.images && formData.images.map((imageUrl, index) => (
              <div key={index} className="relative">
                <img
                  src={imageUrl}
                  alt={`Gallery Image ${index + 1}`}
                  className="w-full h-auto rounded"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index, 'gallery')}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}
            {galleryPreviews.map((preview, index) => (
              <div key={`preview-${index}`} className="relative">
                <img
                  src={preview}
                  alt={`New Gallery Image ${index + 1}`}
                  className="w-full h-auto rounded"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index, 'gallery')}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="text-gray-300">
            <p>Drag and drop your gallery images here, or</p>
            <input
              type="file"
              name="images"
              onChange={handleChange}
              accept="image/*"
              multiple
              className="mt-2"
            />
          </div>
        </div>
      </div>

      <div className="col-span-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {loading ? `${mode === 'edit' ? 'Updating' : 'Adding'} Species...` : `${mode === 'edit' ? 'Update' : 'Add'} Species`}
        </button>
      </div>
    </form>
  );
};
