import React, { useEffect, useState } from "react";
import { API } from "../api/api";
import { Search, PlusCircle, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDateToDDMMYYYY } from "../utils/formatDate";
import { formatAddress } from "../utils/formatAddress";

const AdminOwner = () => {
  const [owners, setOwners] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedOwner, setSelectedOwner] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get("/owners");
        setOwners(response.data);
      } catch (error) {
        console.error(error);
        setOwners([]);
      }
    };

    fetchData();
  }, []);

  const toggleSelection = (ownerId) => {
    setSelectedOwner((prev) => (prev === ownerId ? null : ownerId));
  };

  const filteredOwners = owners.filter(
    (owner) =>
      owner.name.toLowerCase().includes(search.toLowerCase()) ||
      owner.cpf.includes(search)
  );

  const handleEditClick = (ownerId) => {
    if (ownerId) {
      navigate(`/admin/proprietarios/edit/${ownerId}`);
    }
  };

  const handleAddClick = () => {
    navigate(`/admin/proprietarios/novo`);
  };

  const handleDelete = async (id) => {
    if (!id) return;
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este proprietário?"
    );
    if (!confirmDelete) return;

    try {
      const response = await API.delete(`/owners/${id}`);

      if (response.status !== 200) {
        throw new Error("Erro ao excluir o proprietário.");
      }

      setOwners((prevOwners) => prevOwners.filter((owner) => owner._id !== id));
      setSelectedOwner(null);
    } catch (error) {
      console.error("Erro ao excluir:", error);
      alert("Não foi possível excluir o proprietário.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col w-full ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Lista de Propriétarios</h2>
        <div className="flex gap-2">
          <button
            className={`flex items-center gap-2 ${
              selectedOwner
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            } px-4 py-2 rounded-lg`}
            disabled={!selectedOwner}
            onClick={() => handleEditClick(selectedOwner)}
          >
            <Pencil size={18} />
            Editar
          </button>
          <button
            className={`flex items-center gap-2 ${
              selectedOwner
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            } px-4 py-2 rounded-lg`}
            disabled={!selectedOwner}
            onClick={() => handleDelete(selectedOwner)}
          >
            <Trash2 size={18} />
            Excluir
          </button>
          <button
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            onClick={handleAddClick}
          >
            <PlusCircle size={18} />
            Adicionar Proprietário
          </button>
        </div>
      </div>

      {/* Barra de busca */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Buscar por nome ou CPF..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-green-300"
        />
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse whitespace-nowrap">
          <thead>
            <tr className="bg-gray-200 text-gray-600">
              <th className="p-3 text-left"></th>
              <th className="p-3 text-left">Nome</th>
              <th className="p-3 text-left">CPF</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Telefone</th>
              <th className="p-3 text-left">RG</th>
              <th className="p-3 text-left">Aniversário</th>
              <th className="p-3 text-left">Endereço</th>
            </tr>
          </thead>
          <tbody>
            {filteredOwners.length > 0 ? (
              filteredOwners.map((owner) => (
                <tr
                  key={owner._id}
                  className={`border-t cursor-pointer ${
                    selectedOwner === owner._id ? "bg-green-200" : ""
                  }`}
                  onClick={() => toggleSelection(owner._id)}
                >
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedOwner === owner._id}
                      readOnly
                    />
                  </td>
                  <td className="p-3">{owner.name}</td>
                  <td className="p-3">{owner.cpf}</td>
                  <td className="p-3">{owner.email}</td>
                  <td className="p-3">{owner.phoneNumber}</td>
                  <td className="p-3">{owner.rg}</td>
                  <td className="p-3">
                    {formatDateToDDMMYYYY(owner.birthDate)}
                  </td>
                  <td className="p-3">{formatAddress(owner.address)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="p-3 text-center text-gray-500">
                  Nenhum dono encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOwner;
