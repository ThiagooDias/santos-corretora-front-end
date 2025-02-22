import React, { useEffect, useState } from "react";
import OwnerForm from "../components/OwnerForm";
import { useParams } from "react-router-dom";
import { API } from "../api/api";

const EditOwner = () => {
  const { id } = useParams();

  const handleSubmit = async (formData) => {
      try {
        const response = await API.put(`/owners/${id}`, formData);
        console.log(response.data);

        alert('Proprietário salvo com sucesso!')
        window.history.back()
      } catch (error) {
        console.error("Erro ao enviar dados para a API:", error);
      }
    };

  return <OwnerForm label={"Editando Propriétario"} ownerId={id} onSubmit={handleSubmit}></OwnerForm>;
};

export default EditOwner;
