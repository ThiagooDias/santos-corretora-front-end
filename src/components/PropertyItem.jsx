import React from "react";
import { formatAddress } from "../utils/formatAddress";
import { propertyBusinessTypeLabels } from "../locales/property-business-type";
import { propertyTypeLabels } from "../locales/property-type";
import garageIcon from "../assets/garage-icon.svg";
import bedroomIcon from "../assets/bedroom-icon.svg";
import bathroomIcon from "../assets/bathroom-icon.svg";
import areaIcon from "../assets/area-icon.svg";

const PropertyItem = ({
  img,
  title,
  businessType,
  type,
  address,
  price,
  garage,
  bedroom,
  bathroom,
  area,
}) => {
  
  return (
    <div className="flex bg-gray-100 p-4 rounded-lg shadow-md">
      <img src={img} alt={title} className="size-36 object-cover rounded-md" />

      <div className="flex-1 grid grid-cols-2 ml-4 mr-4">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-500">{formatAddress(address)}</p>
        </div>

        <p className="text-secondary text-center font-black text-3xl self-start place-self-end">
          R$ {price}
        </p>

        <div className="flex gap-3 self-end">
          <span className="bg-secondary w-40 text-center text-white font-semibold py-[5px] rounded-md">
            {propertyTypeLabels[type]}
          </span>
          <span className="bg-primary w-40 text-center text-white font-semibold py-[5px] rounded-md">
            {propertyBusinessTypeLabels[businessType]}
          </span>
        </div>

        <div className="flex justify-end self-end">
          <div className=" text-xs flex justify-center gap-6">
            {(garage || garage === 0) && (
              <div className="flex flex-col items-center gap-1">
                <img src={garageIcon} alt=""></img>
                {garage === 1 ? (
                  <div>
                    <span className="font-semibold">{garage}</span> Vaga
                  </div>
                ) : (
                  <div>
                    <span className="font-semibold">{garage}</span> Vagas
                  </div>
                )}
              </div>
            )}

            {(bathroom || bathroom === 0) && (
              <div className="flex flex-col items-center gap-1">
                <img src={bathroomIcon} alt=""></img>
                {bathroom === 1 ? (
                  <div>
                    <span className="font-semibold">{bathroom}</span> Banheiro
                  </div>
                ) : (
                  <div>
                    <span className="font-semibold">{bathroom}</span> Banheiros
                  </div>
                )}
              </div>
            )}

            {(bedroom || bedroom === 0) && (
              <div className="flex flex-col items-center gap-1">
                <img src={bedroomIcon} alt=""></img>
                {bedroom === 1 ? (
                  <div>
                    <span className="font-semibold">{bedroom}</span> Quarto
                  </div>
                ) : (
                  <div>
                    <span className="font-semibold">{bedroom}</span> Quartos
                  </div>
                )}
              </div>
            )}

            {area && (
              <div className="flex flex-col items-center gap-1">
                <img src={areaIcon} alt=""></img>
                <div>
                  <span className="font-semibold">{area}</span> m²
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyItem;
