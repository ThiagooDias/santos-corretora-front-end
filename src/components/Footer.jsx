import React, { useState } from "react";
import logo from "../assets/logo.svg";
import whatsappIcon from "../assets/whatsapp-icon.svg";
import instagramIcon from "../assets/instagram-icon.svg";
import emailIcon from "../assets/email-icon.svg";

const Footer = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText("seu@email.com");
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 1500);
  };

  const urlMaps = `https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_API_KEY_MAPS}&q=Santos+Corretora+Paragominas@-2.9943294,-47.3635382`;

  return (
    <footer className="w-full bg-[#224B21] text-white flex justify-center pt-16 pb-5">
      <div className="w-[1200px] grid grid-cols-2 gap-y-14">
        <img src={logo} alt="Santos corretora" className="w-[320px]" />

        <div className="">
          <h3 className="text-center text-xl font-bold mb-4">
            Entre em contato para encontrar seu imóvel ideal!
          </h3>

          <div className="flex gap-4 justify-center ">
            <div className="rounded-full bg-primary px-5 flex items-center gap-2 shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-3xl hover:bg-green-500">
              <img src={whatsappIcon} alt="" className="w-8" />
              <span className="text-lg font-semibold">Fale conosco!</span>
            </div>

            <div className="w-14 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 shadow-lg cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-3xl">
              <img src={instagramIcon} alt="" className="" />
            </div>

            <div className="relative flex items-center justify-center group">
              <div
                className={`absolute bottom-16 bg-gray-800 text-white text-sm px-3 py-1 rounded-md shadow-md opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 ${
                  showTooltip ? "opacity-100 translate-y-0" : ""
                }`}
              >
                {showTooltip ? "Copiado!" : "Copiar"}
              </div>

              <div
                className="w-14 h-14 rounded-full bg-slate-600 shadow-lg flex items-center justify-center cursor-pointer hover:bg-slate-700 transition-all duration-300 hover:scale-110 hover:shadow-3xl"
                onClick={copyToClipboard}
              >
                <img src={emailIcon} alt="Ícone de e-mail" className="w-8" />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full col-span-2 justify-self-center">
          <h2 className="text-center text-3xl font-medium mb-4">
            Venha nos visitar!
          </h2>
          <iframe
            title="Endereço no google maps"
            className="w-full h-[400px] rounded-lg shadow-lg"
            loading="lazy"
            src={urlMaps}
          ></iframe>
        </div>

        <div className="text-center col-span-2">
          <p>CRECI: 552-J</p>
          <p>
            &copy; {new Date().getFullYear()} Santos Corretora. Todos os
            direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
