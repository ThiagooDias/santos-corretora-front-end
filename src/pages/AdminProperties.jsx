import React, { useState, useEffect } from "react";
import { Search, PlusCircle } from "lucide-react";
import { API } from "../api/api";
import PropertyItem from "../components/PropertyItem";
import { useNavigate } from "react-router-dom";
const AdminProperties = () => {
  const [properties, setProperties] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get("/properties");
        setProperties(response.data);
      } catch (error) {
        console.error(error);
        setProperties([]);
      }
    };

    fetchData();
  }, []);

  const handleAddClick = () => {
    navigate(`/admin/imoveis/novo`);
  };

  return (
    <div className="w-full mx-auto bg-white shadow-md rounded-lg p-6 space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Lista de Imóveis</h2>
        <button
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          onClick={handleAddClick}
        >
          <PlusCircle size={18} />
          Adicionar Imóvel
        </button>
      </div>

      <div className="relative ">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Buscar por nome"
          // value={search}
          // onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-green-300"
        />
      </div>
      <div className="bg-gray-300 py-2 px-4 rounded-md shadow-md">Filtros</div>

      {properties.length > 0 ? (
        properties.map((property) => (
          <PropertyItem
            key={property?.id}
            img={property?.images.length > 0 ? property?.images[0]?.url : ""}
            title={property?.title}
            businessType={property?.businessType}
            type={property?.type}
            address={property?.address}
            price={property?.price}
            garage={property?.garageSpaces}
            area={property?.area}
            bathroom={property?.bathrooms}
            bedroom={property.bedrooms}
          />
        ))
      ) : (
        <p className="text-gray-500">Nenhum imóvel encontrado.</p>
      )}
    </div>
  );
};

export default AdminProperties;
