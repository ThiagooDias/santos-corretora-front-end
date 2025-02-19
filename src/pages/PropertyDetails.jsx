import React from 'react'
import { useParams } from 'react-router-dom'
import { usePublicPropertyById } from '../hooks/UsePublicPropertyById'
import pin from '../assets/pin-map.svg'
import { propertyBusinessTypeLabels } from '../locales/property-business-type'
import { propertyTypeLabels } from '../locales/property-type'
import whatsappIcon from '../assets/whatsapp-icon.svg'
import areaIcon from '../assets/area-icon.svg'
import bedroomIcon from '../assets/bedroom-icon.svg'
import bathroomIcon from '../assets/bathroom-icon.svg'
import garageIcon from '../assets/garage-icon.svg'


const PropertyDetails = () => {
  const { id } = useParams()
  const { property, error, loading } = usePublicPropertyById(id)

  const urlMaps = `https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_API_KEY_MAPS}&q=Santos+Corretora+Paragominas@-2.9943294,-47.3635382`

  console.log(property);


  return (
    <div className='max-w-[1000px] self-center mb-16 text-[#222]'>
      <h1 className='text-3xl font-semibold mt-10 mb-2' >{property?.title}</h1>

      <div className='flex items-center gap-[5px] mb-4 ml-2'>
        <img src={pin} alt='' className='h-5'></img>
        <span className='text-center text-sm line-clamp-1'>{property?.address.street}, nº {property?.address.number} - {property?.address.neighborhood} - {property?.address.city} / {property?.address.state}</span>
      </div>

      <div className='grid grid-cols-3 gap-8 '>
        <img className="col-span-2 rounded-xl shadow-xl aspect-[4/3] object-fit "
          src={property?.images[0].url}
          alt={property?.images[0].title}
        />

        <div>
          <div className='rounded-xl shadow-xl bg-white flex flex-col items-center justify-center h-[200px] mb-8'>
            <div className='flex gap-3 my-3 px-3 w-full'>
              <span className='bg-primary w-full text-center text-white font-semibold py-[5px] rounded-md'>
                {propertyBusinessTypeLabels[property?.businessType]}
              </span>
              <span className='bg-secondary w-full text-center text-white font-semibold py-[5px] rounded-md'>
                {propertyTypeLabels[property?.type]}
              </span>
            </div>

            <p className='my-4 text-secondary text-center font-bold text-3xl'>R$ {property?.price}</p>

            <a
              href="#"
              className='bg-primary text-center text-white font-semibold py-2 w-[75%] rounded-md shadow-xl flex items-center gap-2 justify-center'>
              <img src={whatsappIcon} alt="" className='w-6' />
              Entre em contato
            </a>
          </div>

          <iframe
            title='mapa'
            src={urlMaps}
            width="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            className='h-[250px] rounded-xl shadow-xl'
          ></iframe>
        </div>
      </div>

      <section className='mt-5 mb-2 text-xs flex justify-around gap-6'>
        {(property?.garageSpaces) &&
          <div className='flex items-center px-10 py-3 gap-2 border-[3px] rounded-md border-secondary font-semibold text-base'>
            <img src={garageIcon} alt=''></img>
            {property?.garageSpaces === 1 ? (
              <span>{property?.garageSpaces} Vaga</span>
            ) : (
              <span>{property?.garageSpaces} Vagas</span>
            )}
          </div>}

        {(property?.bathrooms) &&
          <div className='flex items-center px-10 py-3 gap-2 border-[3px] rounded-md border-secondary font-semibold text-base'>
            <img src={bathroomIcon} alt=''></img>
            {property?.bathrooms === 1 ? (
              <div><span className='font-semibold'>{property?.bathrooms}</span> Banheiro</div>
            ) : (
              <div><span className='font-semibold'>{property?.bathrooms}</span> Banheiros</div>
            )}
          </div>}

        {property?.bedrooms &&
          <div className='flex items-center px-10 py-3 gap-2 border-[3px] rounded-md border-secondary font-semibold text-base'>
            <img src={bedroomIcon} alt=''></img>
            {property?.bedrooms === 1 ? (
              <div><span className='font-semibold'>{property?.bedrooms}</span> Quarto</div>
            ) : (
              <div><span className='font-semibold'>{property?.bedrooms}</span> Quartos</div>
            )}
          </div>}

        {(property?.area) &&
          <div className='flex items-center px-10 py-3 gap-2 border-[3px] rounded-md border-secondary font-semibold text-base'>
            <img src={areaIcon} alt=''></img>
            <div><span className='font-semibold'>{property?.area}</span> m²</div>
          </div>}
      </section>

      <section className='mt-8 mb-4 text-xl font-medium'>
        {property?.description}
        <hr className='mt-8 border-2' />
      </section>

      <section >
        <h2 className="text-3xl font-semibold">Acabamentos</h2>
        <ul className="list-disc pl-8 text-lg font-medium">
          {property?.finishes.map((finishe, index) => (
            <li key={index}>{finishe}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default PropertyDetails