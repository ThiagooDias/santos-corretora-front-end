import React, { useEffect, useState } from "react";
import { API } from "../api/api";
import { Search, PlusCircle, Pencil, Trash2 } from "lucide-react";
import OwnerModal from "../components/OwnerModal";

const AdminOwner = () => {
  const [owners, setOwners] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOwner, setModalOwner] = useState(null);

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

  const handleEditClick = (owner) => {
    setModalOwner(owner);
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setModalOwner(null);
    setIsModalOpen(true);
  };

  const handleModalSubmit = (data) => {
    if (modalOwner) {
      // Lógica para editar
      console.log("Editando dono:", data);
    } else {
      // Lógica para adicionar
      console.log("Adicionando dono:", data);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center ">
      <div
        className="  bg-white p-6 rounded-lg shadow-lg flex flex-col"
        style={{ height: "90vh", maxWidth: "calc(100% - 256px)" }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Lista de Donos</h2>
          <div className="flex gap-2">
            <button
              className={`flex items-center gap-2 ${
                selectedOwner
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-400 text-gray-700 cursor-not-allowed"
              } px-4 py-2 rounded-lg`}
              disabled={!selectedOwner}
              onClick={() =>
                handleEditClick(
                  owners.find((owner) => owner._id === selectedOwner)
                )
              }
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
            >
              <Trash2 size={18} />
              Excluir
            </button>
            <button
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              onClick={handleAddClick}
            >
              <PlusCircle size={18} />
              Adicionar Dono
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
        <div className="overflow-x-auto w-full">
          <table className="min-w-full border-collapse whitespace-nowrap">
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
                      />
                    </td>
                    <td className="p-3">{owner.name}</td>
                    <td className="p-3">{owner.cpf}</td>
                    <td className="p-3">{owner.email}</td>
                    <td className="p-3">{owner.phoneNumber}</td>
                    <td className="p-3">{owner.rg}</td>
                    <td className="p-3">{owner.birthDate}</td>
                    <td className="p-3">{owner.address}</td>
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

      <OwnerModal
        isOpen={isModalOpen}
        onClose={() => (setIsModalOpen(false))}
        owner={modalOwner}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default AdminOwner;
