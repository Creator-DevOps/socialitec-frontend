import React from "react";
import Icon from "@icons/iconG.svg";
import { IconButton } from "../buttons/iconButton";
import Button from "../buttons/submitButton";
import { useNavigate } from "react-router-dom";
import Header from "@components/ui-componets/general/header";
import Footer from "@components/login/footer";

const AboutRAG = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen w-screen flex-col">
      <div className="fixed top-0 left-0 right-0 z-10  shadow">
        <Header />
      </div>

      <div className="flex flex-col flex-1 items-center y-25 px-6 ">
        <h1 className="font-bold text-xl sm:text-6xl text-primary text-center">
          SocialITEC
        </h1>
        <img src={Icon} alt="Icon" className="w-20 sm:w-50" />
        <span className="text-sm sm:text-base text-justify min-w-1/2 max-w-[95%] sm:max-w-1/2 leading-[1.5]">
          RAG (Retrieval‑Augmented Generation) es la tecnología que combina la
          búsqueda avanzada de información con modelos de lenguaje de última
          generación. En RAGBridge, aprovechamos esta metodología para entregar
          respuestas precisas y contextualizadas: primero recuperamos contenido
          relevante desde tu repositorio y luego generamos texto enriquecido que
          mejora la interacción con tus clientes. Esto se traduce en respuestas
          más acertadas, actualizadas y alineadas con la voz de tu marca,
          potenciando la eficacia de tus chatbots y asistentes virtuales.
        </span>
        <Button title="Guardar" />
        <button className="cancel my-4">Cancelar</button>
        <button className="delete my-4">Eliminar</button>
      </div>
      <Footer />
    </div>
  );
};

export default AboutRAG;
