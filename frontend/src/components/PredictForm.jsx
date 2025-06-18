// PredictForm.jsx
import React, { useState } from "react";
import axios from "axios";

export default function PredictForm() {
  const [features, setFeatures] = useState(Array(22).fill(""));
  const [result, setResult] = useState(null);

  const handleChange = (index, value) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/predict", {
        features: features.map(f => parseFloat(f)),
      });
      setResult(response.data);
    } catch (err) {
      alert("Prediction failed. Check console.");
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Parkinson’s Prediction Form</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-2">
        {features.map((val, idx) => (
          <input
            key={idx}
            type="number"
            step="any"
            placeholder={`Feature ${idx + 1}`}
            value={val}
            onChange={(e) => handleChange(idx, e.target.value)}
            className="p-2 border rounded"
            required
          />
        ))}
        <button type="submit" className="col-span-2 bg-blue-500 text-white p-2 rounded">
          Predict
        </button>
      </form>
      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <p><strong>Prediction:</strong> {result.prediction}</p>
          <p><strong>Probability:</strong> {(result.probability * 100).toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
}
