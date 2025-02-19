import React from 'react'
import { propertyTypeLabels } from '../locales/property-type'

const SlideHero = ({ image, type, price }) => {  
  return (
    <div className="relative aspect-[4/3] rounded-2xl shadow-lg transition-transform duration-300 group hover:-translate-y-3">
      <img src={image} alt="" className="w-full h-full object-cover rounded-2xl" />

      <div className="absolute inset-0 -left-7 flex justify-between items-end p-4 text-white text-sm 2xl:text-2xl">
        <span className="font-bold rounded-md bg-primary px-4 py-2 shadow-lg transition-all duration-300 group-hover:-translate-y-3">
          {propertyTypeLabels[type]}
        </span>
        <span className="font-bold rounded-md bg-[#388936] px-4 py-2 shadow-lg transition-all duration-300 group-hover:-translate-y-3">
          R$ {price}
        </span>
      </div>
    </div>

  )
}

export default SlideHero
