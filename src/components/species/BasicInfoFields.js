// components/species/BasicInfoFields.js
export const BasicInfoFields = ({ formData, handleChange }) => (
    <>
      <div>
        <label htmlFor="genus" className="block mb-1 font-bold text-white">
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
        <label htmlFor="species" className="block mb-1 font-bold text-white">
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
        <label htmlFor="description" className="block mb-1 font-bold text-white">
          Description:
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border border-white rounded px-2 py-1 bg-black text-white"
          rows={4}
        />
      </div>
      <div>
        <label htmlFor="alt_name" className="block mb-1 font-bold text-white">
          Alternative Name:
        </label>
        <input
          type="text"
          id="alt_name"
          name="alt_name"
          value={formData.alt_name}
          onChange={handleChange}
          className="w-full border border-white rounded px-2 py-1 bg-black text-white"
        />
      </div>
    </>
  );