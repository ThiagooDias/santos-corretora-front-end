import React from "react";
import PropertyForm from "../components/PropertyForm";

const NewProperty = () => {
  const handleSubmit = (lat, lng) => {
    console.log(lat, lng);
    
  }
  return (
    <div className="w-full mx-auto bg-white shadow-md rounded-lg p-6 space-y-4">
      <h2 className="text-2xl font-semibold">Novo Imóvel</h2>
      <PropertyForm onLocationSelect={handleSubmit}/>
    </div>
  );
};

export default NewProperty;
