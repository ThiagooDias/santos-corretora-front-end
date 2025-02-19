import React, { useState } from 'react'
import Header from "../components/Header"
import Hero from "../components/Hero";
import SalesSection from "../components/SalesSection";
import Footer from "../components/Footer";
import RentalSection from "../components/RentalSection";
import CardProperty from '../components/CardProperty';
import { useProperties } from "../hooks/useProperties";
import { useLocations } from '../hooks/useLocations';
import Banner from '../components/Banner';
// import dotenv from "dotenv"

function Home() {
  const [filter, setFilter] = useState({});
  const [isSearching, setIsSearching] = useState(false);

  const [search, setSearch] = useState("");
  const [businessType, setBusinessType] = useState("")
  const [propertyType, setPropertyType] = useState("")
  const [city, setCity] = useState("")
  const [neighborhood, setNeighborhood] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")

  const { properties, loading, error } = useProperties(filter)

  const { locations } = useLocations()

  const handleSearch = async (event) => {
    event.preventDefault();

    const newFilter = {
      title: search,
      businessType,
      type: propertyType,
      city,
      neighborhood,
      maxPrice,
      minPrice
    };

    const isEmptyFilter = Object.values(newFilter).every(value => !value);

    setFilter(newFilter);
    setIsSearching(!isEmptyFilter);

  };

  const handleClear = async () => {
    setFilter({});

    setSearch('');
    setBusinessType('');
    setCity('');
    setNeighborhood('');
    setMaxPrice('');
    setMinPrice('');
    setPropertyType('');

    setIsSearching(false);
  };

  const filterSale = () => {
    setFilter((prevFilters) => {
      const newFilter = { ...prevFilters, type: 'house', businessType: 'sale' };
      setIsSearching(true);
      return newFilter;
    });
  };

  const filterRent = () => {
    setFilter((prevFilters) => {
      const newFilter = { ...prevFilters, type: 'house', businessType: 'rent' };
      setIsSearching(true);
      return newFilter;
    });
  };

  const showAllProperties = () => {
    setFilter({});
    setIsSearching(true);
  };

  return (
    <>
        <Banner></Banner>
        <Hero></Hero>

        <div className='flex justify-center -top-16 relative'>
          <form onSubmit={handleSearch} className="bg-[#388936] rounded-xl w-[75%] grid grid-cols-3 gap-y-4 gap-x-14 px-12 py-10">

            <div className='col-span-full text-center'>
              <h3 className='mb-4 text-3xl font-bold text-white'>O que você está procurando?</h3>
              <hr className='border-t-2 border-white' />
            </div>

            {/* TODO: ajeitar o label*/}
            <div className='flex flex-col'>
              <label className='text-white mb-1'>Tipo de negócio:</label>
              <select
                className="p-2 border rounded"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
              >
                <option value="" className='text-gray-500'>Selecione um tipo</option>
                <option value="sale">Venda</option>
                <option value="rent">Aluguel</option>
                <option value="transfer">Repasse</option>
              </select>
            </div>

            <div className='flex flex-col'>
              <label className='text-white mb-1'>Cidade:</label>
              <select
                className="p-2 border rounded"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="" className='text-gray-500'>Selecione uma cidade </option>
                {locations?.cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}

              </select>
            </div>

            <div className='flex flex-col'>
              <label htmlFor="" className='text-white mb-1'>Preço máximo:</label>
              <input
                type="text"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(e.target.value);
                }}
                className="p-2 border rounded"
              />
            </div>

            <div className='flex flex-col'>
              <label className='text-white mb-1'>Tipo do imóvel:</label>
              <select
                className="p-2 border rounded"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                <option value="" className='text-gray-500'>Selecione um tipo</option>
                <option value="house">Casa</option>
                <option value="apartment">Apartamento</option>
                <option value="land">Terreno</option>
                <option value="farm">Fazenda</option>
                <option value="commercial">Ponto comercial</option>
              </select>
            </div>

            <div className='flex flex-col'>
              <label className='text-white mb-1'>Bairro:</label>
              <select
                className="p-2 border rounded"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
              >
                <option value="" className='text-gray-500'>Selecione um bairro</option>
                {city && locations?.neighborhoodsByCity[city].map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className='flex flex-col'>
              <label htmlFor="" className='text-white mb-1'>Preço mínimo:</label>
              <input
                type="text"
                value={minPrice}
                onChange={(e) => {
                  setMinPrice(e.target.value);
                }}
                className="p-2 border rounded"
              />
            </div>

            <div className='col-span-full flex gap-3 items-center mt-3'>
              <input
                type="text"
                placeholder="Buscar imóveis..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                className="p-2 border rounded flex-grow"
              />

              <button type="submit" className="py-[9px] px-6 bg-primary text-white rounded">
                Buscar
              </button>

              <div onClick={handleClear} className="py-[9px] px-6 bg-gray-600 text-white rounded">
                Limpar filtros
              </div>
            </div>

            <p className="text-center col-span-full text-white underline cursor-pointer"
              onClick={showAllProperties}
            >
              Ver todos os imóveis
            </p>

          </form>
        </div>

        {isSearching ? (
          <section className='p-10 flex flex-col items-center'>
            <h2 className='text-center font-semibold text-4xl mb-5'>Resultados</h2>

            <div className='grid grid-cols-3 place-items-center gap-10'>
              {properties.map((property, index) => (

                <CardProperty
                  key={index}
                  title={property?.title}
                  address={property?.address}
                  image={property?.images[0].url}
                  businessType={property?.businessType}
                  price={property?.price}
                  type={property?.type}
                  garage={property?.garageSpaces}
                  area={property?.area}
                  bathroom={property?.bathrooms}
                  bedroom={property.bedrooms}
                />
              ))}
            </div>
          </section>
        ) : (
          <>
            <SalesSection></SalesSection>
            <div className='flex justify-center'>
              <button className='py-[9px] px-6 bg-primary text-white rounded font-semibold' onClick={filterSale}>
                Ver mais
              </button>
            </div>

            <RentalSection></RentalSection>
            <div className='flex justify-center'>
              <button className='py-[9px] px-6 bg-primary text-white rounded font-semibold mb-14' onClick={filterRent}>
                Ver mais
              </button>
            </div>
          </>
        )}
    </>
  );
}

export default Home;
