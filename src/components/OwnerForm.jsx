import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parseISO } from "date-fns";
import InputField from "./InputField";
import { applyMask } from "../utils/mask";
import { API } from "../api/api";
import React, { useEffect, useState } from "react";

const schema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido"),
  email: z.string().email("E-mail inválido"),
  phoneNumber: z.string().regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Telefone inválido"),
  rg: z.string().min(5, "RG inválido"),
  birthDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Data inválida")
    .transform((val) => format(parseISO(val), "dd/MM/yyyy")),
  address: z.object({
    state: z.string().min(2, "Selecione um estado"),
    city: z.string().min(2, "Selecione uma cidade"),
    street: z.string().min(3, "A rua deve ter pelo menos 3 caracteres"),
    number: z.string().min(1, "Informe o número"),
    neighborhood: z
      .string()
      .min(3, "O bairro deve ter pelo menos 3 caracteres"),
  }),
});

export default function OwnerForm({ onSubmit, ownerId, label }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      cpf: "",
      email: "",
      phoneNumber: "",
      rg: "",
      birthDate: "",
      address: {
        state: "",
        city: "",
        street: "",
        number: "",
        neighborhood: "",
      },
    },
  });

  

  useEffect(() => {
    if (!ownerId) return;

    const fetchData = async () => {
      try {
        const response = await API.get(`owners/${ownerId}`);
        const data = response.data;

        reset({
          name: data.name || "",
          cpf: data.cpf || "",
          email: data.email || "",
          phoneNumber: data.phoneNumber || "",
          rg: data.rg || "",
          birthDate: data.birthDate ? data.birthDate.split("T")[0] : "",
          address: {
            state: data.address?.state || "",
            city: data.address?.city || "",
            street: data.address?.street || "",
            number: data.address?.number || "",
            neighborhood: data.address?.neighborhood || "",
          },
        });
      } catch (error) {
        console.error("Erro ao buscar proprietário:", error);
      }
    };

    fetchData();
  }, [ownerId, reset]);

  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  
  const estadoSelecionado = watch("address.state");

  useEffect(() => {
    fetch(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
    )
      .then((res) => res.json())
      .then((data) => setEstados(data));
  }, []);

  useEffect(() => {
    if (estadoSelecionado) {
      fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios`
      )
        .then((res) => res.json())
        .then((data) => setCidades(data));
    }
  }, [estadoSelecionado]);

  const handleFormSubmit = (data) => {
    console.log("Dados do formulário:", data);
    onSubmit(data); 
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="w-full mx-auto bg-white shadow-md rounded-lg p-6 space-y-4"
    >
      <h2 className="text-2xl font-semibold mb-8">{label}</h2>
      <div className="grid grid-cols-2 gap-x-8 gap-y-6">
        <InputField
          label="Nome"
          name="name"
          register={register}
          errors={errors}
          placeholder="Ex: Ana Oliveira"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700">CPF</label>
          <input
            type="text"
            {...register("cpf")}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Ex: 987.654.321-00"
            onChange={(e) =>
              setValue("cpf", applyMask(e.target.value, "###.###.###-##"))
            }
          />
          {errors.cpf && (
            <p className="text-red-500 text-sm">{errors.cpf.message}</p>
          )}
        </div>

        <InputField
          label="E-mail"
          name="email"
          register={register}
          errors={errors}
          placeholder="Ex: ana@email.com"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Telefone
          </label>
          <input
            type="text"
            {...register("phoneNumber")}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Ex: (21) 98765-4321"
            onChange={(e) =>
              setValue(
                "phoneNumber",
                applyMask(e.target.value, "(##) #####-####")
              )
            }
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
          )}
        </div>

        <InputField
          label="RG"
          name="rg"
          register={register}
          errors={errors}
          placeholder="Ex: 123456789"
        />
        <InputField
          label="Data de Nascimento"
          name="birthDate"
          register={register}
          errors={errors}
          type="date"
        />

        <h2 className="text-xl font-bold mt-4 col-span-full">Endereço</h2>

        {/* Estado */}
        <div>
          <label className="block text-sm font-medium">Estado</label>
          <select
            {...register("address.state")}
            onChange={(e) => setValue("address.state", e.target.value)}
            className="w-full border border-gray-300 rounded p-2 mt-1"
          >
            <option value="">Selecione um estado</option>
            {estados.map((estado) => (
              <option key={estado.sigla} value={estado.sigla}>
                {estado.nome}
              </option>
            ))}
          </select>
          {errors.address?.state && (
            <p className="text-red-500 text-sm">{errors.address.state.message}</p>
          )}
        </div>

        {/* Cidade */}
        <div>
          <label className="block text-sm font-medium">Cidade</label>
          <select
            {...register("address.city")}
            onChange={(e) => setValue("address.city", e.target.value)}
            className="w-full border border-gray-300 rounded p-2 mt-1"
            disabled={!estadoSelecionado}
          >
            <option value="">Selecione uma cidade</option>
            {cidades.map((cidade) => (
              <option key={cidade.id} value={cidade.nome}>
                {cidade.nome}
              </option>
            ))}
          </select>
          {errors.address?.city && (
            <p className="text-red-500 text-sm">{errors.address.city.message}</p>
          )}
        </div>

        {/* Rua */}
        <InputField
          label="Rua"
          name="address.street"
          register={register}
          errors={errors}
          placeholder="Ex: Av. Brasil"
        />

        {/* Número */}
        <InputField
          label="Número"
          name="address.number"
          register={register}
          errors={errors}
          placeholder="Ex: 123"
          type="text"
        />

        {/* Bairro */}
        <InputField
          label="Bairro"
          name="address.neighborhood"
          register={register}
          errors={errors}
          placeholder="Ex: Centro"
        />
      </div>

      <div className="flex gap-7">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="w-full border-2 border-red-500 text-red-500 py-2 px-4 rounded hover:bg-red-500 hover:text-white transition"
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Salvar
        </button>
      </div>
    </form>
  );
}