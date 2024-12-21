export const ImageUpload = ({
    primaryImagePreview,
    galleryPreviews,
    formData,
    handleChange,
    removeImage
  }) => (
    <>
      <div className="col-span-2">
        <label className="block mb-2 text-lg font-medium text-white">
          Primary Image:
        </label>
        {primaryImagePreview && (
          <div className="relative inline-block mb-4">
            <img
              src={primaryImagePreview}
              alt="Primary image preview"
              className="max-h-48 rounded"
            />
            <button
              type="button"
              onClick={() => removeImage(0, 'primary')} // Use removeImage here
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
            >
              ×
            </button>
          </div>
        )}
        <input
          type="file"
          name="image"
          onChange={handleChange}
          accept="image/*"
          className="w-full border border-white rounded px-2 py-1 bg-black text-white"
        />
      </div>
  
      <div className="col-span-2">
        <label className="block mb-2 text-lg font-medium text-white">
          Gallery Images:
        </label>
        <div className="grid grid-cols-4 gap-4">
          {formData.images && formData.images.map((imageUrl, index) => (
            <div key={index} className="relative">
              <img
                src={imageUrl}
                alt={`Gallery Image ${index + 1}`}
                className="w-full h-auto rounded"
              />
              <button
                type="button"
                onClick={() => removeImage(index, 'gallery')} // Use removeImage here
                className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-full"
              >
                X
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
                onClick={() => removeImage(index, 'gallery')} // Use removeImage here
                className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-full"
              >
                X
              </button>
            </div>
          ))}
        </div>
        <input
          type="file"
          name="images"
          onChange={handleChange}
          multiple
          accept="image/*"
          className="mt-4 w-full border border-white rounded px-2 py-1 bg-black text-white"
        />
      </div>
    </>
  );
  