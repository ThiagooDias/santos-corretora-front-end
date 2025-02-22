import React from "react";
import OwnerForm from "../components/OwnerForm";
import { API } from "../api/api";

const NewOwner = () => {
  const handleSubmit = async (formData) => {
    try {
      const response = await API.post("/owners", formData);
      console.log(response.data);

      alert("Proprietário salvo com sucesso!");
      window.history.back();
    } catch (error) {
      console.error("Erro ao enviar dados para a API:", error);
    }
  };
  return (
    <OwnerForm
      label={"Novo Propriétario"}
      onSubmit={handleSubmit}
    ></OwnerForm>
  );
};

export default NewOwner;
