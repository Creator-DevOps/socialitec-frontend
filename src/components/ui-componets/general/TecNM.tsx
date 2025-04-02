import React from "react";
import Icon from "@icons/iconG.svg";
import { IconButton } from "../buttons/iconButton";
import { useNavigate } from "react-router-dom";
import Header from "@components/ui-componets/general/header";
import Footer from "@components/login/footer";

const Contact = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen w-screen flex-col">
      <div className="fixed top-0 left-0 right-0 z-10  shadow ">
        <Header />
      </div>


      <div className="flex flex-col flex-1 items-center py-25 px-6 ">
        <h1 className="font-bold text-xl sm:text-6xl text-primary text-center">
          TecNM
        </h1>
        <img src={Icon} alt="Icon" className="w-20 sm:w-50" />
        <span className="text-sm sm:text-base text-justify min-w-1/2 sm:min-w-1/2 max-w-[95%] sm:max-w-1/2 leading-[1.5]">
          ¿Tienes preguntas, sugerencias o necesitas soporte? Nuestro equipo está
          aquí para ayudarte. Escríbenos a{" "}
          <a
            href="mailto:soporte@ragbridge.com"
            className="text-blue-500 hover:underline"
          >
            soporte@ragbridge.com
          </a>
          , llámanos al <span className="font-bold">+54 11 1234‑5678</span> o
          completa el formulario de contacto en nuestra web. Nos comprometemos a
          responder todas tus consultas en un plazo de 24 horas hábiles.
          ¡Estamos ansiosos por colaborar contigo y llevar tu gestión de
          contenido al siguiente nivel!
        </span>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
