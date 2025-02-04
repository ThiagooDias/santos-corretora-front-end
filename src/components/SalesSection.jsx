import React from 'react'
import { useProperties } from '../hooks/useProperties'
import CardProperty from './CardProperty'

const SalesSection = () => {
  const {properties, loading, error} = useProperties({limit: 1})
  return (
    <section className='p-10 flex flex-col items-center'>
      <h2 className='text-center font-semibold text-4xl mb-5'>Casas à venda</h2>

      <div className='grid grid-cols-3 place-items-center gap-10'>
        {properties.map(property => (
          <CardProperty
            key={property?.id}
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
  )
}

export default SalesSection