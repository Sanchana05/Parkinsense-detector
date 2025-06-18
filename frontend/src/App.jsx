import React from "react";
import PredictForm from "./components/PredictForm";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">
        Parkinson’s Disease Detector
      </h1>
      <PredictForm />
    </div>
  );
}

export default App;
