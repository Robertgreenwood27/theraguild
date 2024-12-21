// components/species/MeasurementFields.js
export const MeasurementFields = ({ formData, handleChange }) => (
    <>
      <div>
        <label htmlFor="max_body_length" className="block mb-1 font-bold text-white">
          Max Body Length (cm):
        </label>
        <input
          type="number"
          id="max_body_length"
          name="max_body_length"
          value={formData.max_body_length}
          onChange={handleChange}
          className="w-full border border-white rounded px-2 py-1 bg-black text-white"
          step="0.1"
        />
      </div>
      <div>
        <label htmlFor="max_leg_span" className="block mb-1 font-bold text-white">
          Max Leg Span (cm):
        </label>
        <input
          type="number"
          id="max_leg_span"
          name="max_leg_span"
          value={formData.max_leg_span}
          onChange={handleChange}
          className="w-full border border-white rounded px-2 py-1 bg-black text-white"
          step="0.1"
        />
      </div>
      <div>
        <label htmlFor="lifespan" className="block mb-1 font-bold text-white">
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
    </>
  );