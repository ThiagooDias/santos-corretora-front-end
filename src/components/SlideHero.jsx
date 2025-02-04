import React from 'react'

const SlideHero = ({ image }) => {
  return (
    <div className='aspect-[4/3] overflow-hidden rounded-2xl shadow-lg'>
      <img src={image} alt="" className="w-full h-full object-cover" />

      <div className='text-white text-2xl'>
        <span className='font-semibold absolute bottom-11 left-1 rounded-md bg-primary px-4 py-2 shadow-lg'>
          CASA
        </span>
        <span className='font-bold absolute bottom-11 right-10 rounded-md bg-[#388936] px-4 py-2 shadow-lg'>
          R$ 190.000,00
        </span>
      </div>
    </div>
  )
}

export default SlideHero
