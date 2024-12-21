// components/species/CharacteristicsFields.js
export const CharacteristicsFields = ({ formData, handleChange }) => (
    <>
      <div>
        <label htmlFor="urticating_setae" className="block mb-1 font-bold text-white">
          Urticating Setae:
        </label>
        <input
          type="text"
          id="urticating_setae"
          name="urticating_setae"
          value={formData.urticating_setae}
          onChange={handleChange}
          className="w-full border border-white rounded px-2 py-1 bg-black text-white"
        />
      </div>
      <div>
        <label htmlFor="venom_potency" className="block mb-1 font-bold text-white">
          Venom Potency:
        </label>
        <input
          type="text"
          id="venom_potency"
          name="venom_potency"
          value={formData.venom_potency}
          onChange={handleChange}
          className="w-full border border-white rounded px-2 py-1 bg-black text-white"
        />
      </div>
      <div>
        <label htmlFor="keeping_difficulty" className="block mb-1 font-bold text-white">
          Keeping Difficulty:
        </label>
        <select
          id="keeping_difficulty"
          name="keeping_difficulty"
          value={formData.keeping_difficulty}
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
    </>
  );