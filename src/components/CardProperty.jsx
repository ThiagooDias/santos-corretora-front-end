import React from 'react'
import pin from '../assets/pin-map.svg'
import garageIcon from '../assets/garage-icon.svg'
import bedroomIcon from '../assets/bedroom-icon.svg'
import bathroomIcon from '../assets/bathroom-icon.svg'
import areaIcon from '../assets/area-icon.svg'

const CardProperty = ({ title, price, type, businessType, address, image, garage, bedroom, bathroom, area }) => {
  return (
    <div className='rounded-xl shadow-lg w-[350px] p-3 bg-white'>
      <div className='rounded-md overflow-hidden'>
        <img src={image} alt='' className="w-full h-full object-cover aspect-[4/3]" ></img>
      </div>

      <h3 className="my-3 text-2xl line-clamp-2 break-words whitespace-normal font-semibold text-secondary text-center">
        {title}
      </h3>

      <div className='flex gap-3 my-3'>
        <span className='bg-primary w-full text-center text-white font-semibold py-[5px] rounded-md'>{businessType}</span>
        <span className='bg-secondary w-full text-center text-white font-semibold py-[5px] rounded-md'>{type}</span>
      </div>

      <p className='my-4 text-secondary text-center font-bold text-3xl'>R$ {price}</p>
      
      <div className='flex items-center gap-[5px] justify-center'>
        <img src={pin} alt='' className='h-5'></img>
        <span className='text-center text-sm line-clamp-1'>{address.street}, nº {address.number} - {address.neighborhood} - {address.city}</span>
      </div>



      <div className='mt-5 mb-2 text-xs flex justify-center gap-6'>
        {(garage || garage === 0)  &&
          <div className='flex flex-col items-center gap-1'>
            <img src={garageIcon} alt=''></img>
            {garage === 1 ? (
              <div><span className='font-semibold'>{garage}</span> Vaga</div>
            ) : (
              <div><span className='font-semibold'>{garage}</span> Vagas</div>
            )}
          </div>}

        {(bathroom ||  bathroom === 0) &&
          <div className='flex flex-col items-center gap-1'>
            <img src={bathroomIcon} alt=''></img>
            {bathroom === 1 ? (
              <div><span className='font-semibold'>{bathroom}</span> Banheiro</div>
            ) : (
              <div><span className='font-semibold'>{bathroom}</span> Banheiros</div>
            )}
          </div>}

        {(bedroom || bedroom === 0) &&
          <div className='flex flex-col items-center gap-1'>
            <img src={bedroomIcon} alt=''></img>
            {bedroom === 1 ? (
              <div><span className='font-semibold'>{bedroom}</span> Quarto</div>
            ) : (
              <div><span className='font-semibold'>{bedroom}</span> Quartos</div>
            )}
          </div>}

        {(area) &&
          <div className='flex flex-col items-center gap-1'>
            <img src={areaIcon} alt=''></img>
            <div><span className='font-semibold'>{area}</span> m²</div>
          </div>}


      </div>


    </div>
  )
}

export default CardProperty