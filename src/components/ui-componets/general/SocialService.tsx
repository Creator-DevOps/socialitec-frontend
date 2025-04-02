import React from "react";
import Icon from "@icons/iconG.svg";
import { IconButton } from "../buttons/iconButton";
import Header from "@components/ui-componets/general/header";
import { useNavigate } from "react-router-dom";
import Footer from "@components/login/footer";

const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen w-screen flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 shadow">
        <Header />
      </div>

      <div className="flex flex-col flex-1 items-center py-25 px-6 ">
        <h1 className="font-bold text-xl sm:text-6xl text-primary text-center">
          Servicio Social
        </h1>
        <img src={Icon} alt="Icon" className="w-20 sm:w-50" />
        <span className="text-sm sm:text-base text-justify min-w-1/2 max-w-[95%] sm:max-w-1/2 leading-[1.5]">
          Somos RAGBridge, un equipo multidisciplinario dedicado a simplificar la
          gestión de contenido para empresas que buscan potenciar sus soluciones
          con texto generativo. Nuestra misión es ofrecer una plataforma intuitiva,
          segura y escalable que centralice todos tus recursos (textos, imágenes,
          videos y más) en un solo lugar. Con un enfoque centrado en la experiencia
          de usuario, facilitamos la creación, edición y publicación de información
          relevante, permitiéndote llegar a tus clientes de forma rápida, consistente y
          sin necesidad de conocimientos técnicos.
        </span>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
