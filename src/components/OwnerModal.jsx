import React, { useState, useEffect } from "react";

const OwnerModal = ({ isOpen, onClose, owner, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    cpf: "",
    email: "",
    phoneNumber: "",
    rg: "",
    birthDate: "",
    address: "",
  });

  useEffect(() => {
    if (owner) {
      setFormData({
        name: owner.name || "",
        cpf: owner.cpf || "",
        email: owner.email || "",
        phoneNumber: owner.phoneNumber || "",
        rg: owner.rg || "",
        birthDate: owner.birthDate || "",
        address: owner.address || "",
      });
    }
  }, [owner]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">{owner ? "Editar Dono" : "Adicionar Dono"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Nome</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">CPF</label>
            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Telefone</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">RG</label>
            <input
              type="text"
              name="rg"
              value={formData.rg}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Aniversário</label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Endereço</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex justify-between gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              {owner ? "Salvar" : "Adicionar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OwnerModal;
