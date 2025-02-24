import React, { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputField from "./InputField";
import TextareaField from "./TextareaField";
import { MapPicker } from "./MapPicker";
import { API } from "../api/api";
import { propertyTypeLabels } from "../locales/property-type";

const baseSchema = z.object({
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
  price: z.coerce.number(),
  area: z.string(),
  owner: z.string().min(1, "Proprietário obrigatório"),
  commission: z.string().min(1, "Comissão obrigatória"),
  captureDate: z.string().min(1, "Data de captação obrigatória"),
  expirationDate: z.string().min(1, "Data de vencimento obrigatória"),
  isFeatured: z.boolean(),
  isFinanciable: z.boolean(),
  hasPlate: z.boolean(),
});

const houseSchema = baseSchema.extend({
  type: z.literal("house"),
  bedrooms: z.coerce.number().min(1, "Deve ter pelo menos 1 quarto"),
  bathrooms: z.coerce.number().min(1, "Deve ter pelo menos 1 banheiro"),
  garageSpaces: z.coerce.number(),
  constructedArea: z.coerce
    .number()
    .min(1, "Área construída deve ser maior que 0"),
  finishes: z.array(z.string()).min(1, "Adicione pelo menos um acabamento"),
});

const apartmentSchema = baseSchema.extend({
  type: z.literal("apartment"),
  bedrooms: z.coerce.number().min(1, "Deve ter pelo menos 1 quarto"),
  bathrooms: z.coerce.number().min(1, "Deve ter pelo menos 1 banheiro"),
  garageSpaces: z.coerce.number(),
  finishes: z.array(z.string()).min(1, "Adicione pelo menos um acabamento"),
});

const propertySchema = z.discriminatedUnion("type", [
  houseSchema,
  apartmentSchema,
]);

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
      price: 0,
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

  // console.log(location);

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

  const [owners, setOwners] = useState([]);

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
  }, [owners]);

  const price = watch("price");
  const commissionPercent = watch("commissionPercent");
  const commissionValue = watch("commissionValues");

  useEffect(() => {
    if (price && commissionPercent) {
      const calculatedValue =
        (parseFloat(price) * parseFloat(commissionPercent)) / 100;
      setValue("commissionValues", calculatedValue); // Atualiza o campo de valor
    }
  }, [commissionPercent, price, setValue]);

  useEffect(() => {
    if (price && commissionValue) {
      const calculatedPercent =
        (parseFloat(commissionValue) / parseFloat(price)) * 100;
      setValue("commissionPercent", calculatedPercent); // Atualiza o campo de porcentagem
    }
  }, [commissionValue, price, setValue]);

  const typeProperty = watch("type");

  const additionalFields = useMemo(() => {
    switch (typeProperty) {
      case "house":
        return [
          { name: "bedrooms", label: "Número de Quartos", type: "number" },
          { name: "bathrooms", label: "Número de Banheiros", type: "number" },
          {
            name: "garageSpaces",
            label: "Número de Banheiros",
            type: "number",
          },
          {
            name: "constructedArea",
            label: "Área construida",
            type: "number",
          },
          { name: "finishes", label: "Acabamentos", type: "number" },
        ];
      case "apartment":
        return [
          { name: "andar", label: "Andar", type: "number" },
          { name: "condominio", label: "Valor do Condomínio", type: "number" },
        ];
      default:
        return [];
    }
  }, [typeProperty]);

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-4 gap-x-8 gap-y-6 mb-8"
      >
        <InputField
          className={"col-span-2"}
          label="Título"
          name="title"
          register={register}
          errors={errors}
        />

        <div className="flex col-span-2 justify-between items-center mt-4">
          <div>
            <label className="flex items-center gap-2 text-base font-medium">
              <input
                type="checkbox"
                className="size-4"
                {...register("isFeatured")}
              />
              <span>Destaque</span>
            </label>
          </div>

          <div>
            <label className="flex items-center gap-2 text-base font-medium">
              <input
                type="checkbox"
                className="size-4"
                {...register("isFinanciable")}
              />
              <span>Financiável</span>
            </label>
          </div>

          <div>
            <label className="flex items-center gap-2 text-base font-medium">
              <input
                type="checkbox"
                className="size-4"
                {...register("hasPlate")}
              />
              <span>Possui Placa</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Tipo de Imóvel</label>
          <select {...register("type")} className="border p-2 w-full">
            <option value="house">Casa</option>
            <option value="apartment">Apartamento</option>
            <option value="commercial">Comercial</option>
            <option value="land">Terreno</option>
            <option value="farm">Fazenda</option>
          </select>
          {errors.type && (
            <p className="text-red-500 text-sm">{errors.type.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Tipo de Negócio</label>
          <select {...register("businessType")} className="border p-2 w-full">
            <option value="rent">Aluguel</option>
            <option value="sale">Venda</option>
            <option value="transfer">Repasse</option>
          </select>
          {errors.businessType && (
            <p className="text-red-500 text-sm">
              {errors.businessType.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Proprietário</label>
          <select {...register("owner")} className="border p-2 w-full">
            <option value="">Selecione um proprietário</option>
            {owners.map((owner, index) => (
              <option key={index} value={owner?.id}>
                {owner?.name}
              </option>
            ))}
          </select>
          {errors.owner && (
            <p className="text-red-500 text-sm">{errors.owner.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Status</label>
          <select {...register("status")} className="border p-2 w-full">
            <option value="archived">Arquivado</option>
            <option value="posted">Postado</option>
            {/* <option value="sold">Vendido</option> */}
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm">{errors.status.message}</p>
          )}
        </div>

        <InputField
          label="Área (m²)"
          name="area"
          register={register}
          errors={errors}
        />

        <InputField
          label="Data de Captação"
          name="captureDate"
          register={register}
          errors={errors}
          type="date"
        />

        <InputField
          label="Data de Vencimento"
          name="expirationDate"
          register={register}
          errors={errors}
          type="date"
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

        <h2 className="text-xl font-bold mt-4 col-span-full">Valores</h2>

        <InputField
          label="Preço"
          name="price"
          register={register}
          errors={errors}
        />

        <InputField
          label="Comissão (%)"
          name="commissionPercent"
          register={register}
          errors={errors}
          onBlur={() =>
            setValue(
              "commissionPercent",
              parseFloat(commissionPercent || "0").toFixed(2)
            )
          }
        />

        <InputField
          label="Comissão (Valor)"
          name="commissionValues"
          register={register}
          errors={errors}
          onBlur={() =>
            setValue(
              "commissionValues",
              parseFloat(commissionValue || "0").toFixed(2)
            )
          }
        />

        <InputField
          label="Corretores envolvidos"
          name="brokers"
          register={register}
          errors={errors}
        />

        {(typeProperty === 'house' ?? 'apartment') && (
          <h2 className="text-xl font-bold mt-4 col-span-full">
            {propertyTypeLabels[typeProperty]}
          </h2>
        )}

        {/* Campos adicionais */}
        {additionalFields.map((field, index) =>
          field?.name ? (
            <InputField
              key={index}
              name={field.name}
              label={field.label}
              type={field.type}
              register={register}
              errors={errors}
            />
          ) : null
        )}

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
            className={"w-[400px]"}
            label="Rua"
            name="address.street"
            register={register}
            errors={errors}
          />
          <InputField
            className={"w-24"}
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

        <div className="flex justify-center col-span-full">
          <MapPicker className={" w-[90%]"} onLocationSelect={setLocation} />
        </div>
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
