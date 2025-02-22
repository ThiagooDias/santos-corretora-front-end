import React, { useState, useEffect } from "react";
import OwnerForm from "./OwnerForm";

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
        <OwnerForm></OwnerForm>
      </div>
    </div>
  );
};

export default OwnerModal;
