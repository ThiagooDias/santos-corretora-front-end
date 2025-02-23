import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputField from "./InputField";
import TextareaField from "./TextareaField";
import { MapPicker } from "./MapPicker";

const propertySchema = z.object({
  title: z.string().min(3, "Título muito curto"),
  address: z.object({
    street: z.string().min(3, "Rua inválida"),
    number: z.string().min(1, "Número obrigatório"),
    neighborhood: z.string(),
    city: z.string(),
    state: z.string().length(2, "Estado deve ter 2 letras"),
    googleMapsLink: z.string().url("Link inválido").optional(),
  }),
  description: z.string().min(10, "Descrição muito curta"),
  status: z.enum(["draft", "published"]),
  type: z.enum(["house", "apartment"]),
  businessType: z.enum(["rent", "sale"]),
  price: z.string(),
  area: z.string(),
  bedrooms: z.number().min(1, "Mínimo 1 quarto"),
  bathrooms: z.number().min(1, "Mínimo 1 banheiro"),
  garageSpaces: z.number().min(0),
  finishes: z.array(z.string()),
});

const PropertyForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: "",
      address: {
        street: "",
        number: "",
        neighborhood: "",
        city: "",
        state: "",
        googleMapsLink: "",
      },
      description: "",
      status: "draft",
      type: "house",
      businessType: "rent",
      price: "",
      area: "",
      bedrooms: 1,
      bathrooms: 1,
      garageSpaces: 0,
      finishes: [],
    },
  });

  const [location, setLocation] = useState(null);
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);

  console.log(location);
  

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

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-4 gap-x-8 gap-y-6 mb-8"
      >
        <InputField
          label="Título"
          name="title"
          register={register}
          errors={errors}
        />
        <TextareaField
          label="Descrição"
          name="description"
          register={register}
          errors={errors}
          placeholder="Descreva o imóvel..."
          rows={5}
          className={"col-span-4"}
        />

        <h2 className="text-xl font-bold mt-4 col-span-full">Endereço</h2>

        <div className="flex col-span-full justify-between">
          <div className="max-w-24">
            <label className="block text-sm font-medium">Estado</label>
            <select
              {...register("address.state")}
              onChange={(e) => setValue("address.state", e.target.value)}
              className="w-full border border-gray-300 rounded p-2 mt-1"
            >
              <option value="">UF</option>
              {estados.map((estado) => (
                <option key={estado.sigla} value={estado.sigla}>
                  {estado.sigla}
                </option>
              ))}
            </select>
            {errors.address?.state && (
              <p className="text-red-500 text-sm">
                {errors.address.state.message}
              </p>
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
              <p className="text-red-500 text-sm">
                {errors.address.city.message}
              </p>
            )}
          </div>
          <InputField
            label="Rua"
            name="address.street"
            register={register}
            errors={errors}
          />
          <InputField
            label="Número"
            name="address.number"
            register={register}
            errors={errors}
          />

          <InputField
            label="Bairro"
            name="address.neighborhood"
            register={register}
            errors={errors}
          />
        </div>

        <MapPicker className={'col-span-full'}  onLocationSelect={setLocation} />

        <InputField
          label="Preço"
          name="price"
          register={register}
          errors={errors}
        />
        <InputField
          label="Área (m²)"
          name="area"
          register={register}
          errors={errors}
        />
        <InputField
          label="Quartos"
          name="bedrooms"
          register={register}
          errors={errors}
          type="number"
        />
        <InputField
          label="Banheiros"
          name="bathrooms"
          register={register}
          errors={errors}
          type="number"
        />
        <InputField
          label="Garagem"
          name="garageSpaces"
          register={register}
          errors={errors}
          type="number"
        />
      </form>

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
          {isSubmitting ? "Enviando..." : "Cadastrar"}
        </button>
      </div>
    </div>
  );
};

export default PropertyForm;
