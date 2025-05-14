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

      <div className="flex flex-col flex-1 items-center py-30 px-6 justify-center ">
        <div className="flex flex-col flex-1 text-justify justify-center items-center w-full md:w-[70%] gap-10 ">
          <section className="flex flex-col gap-2 items-center gap-4">
            <h1 className="font-bold text-xl md:text-3xl text-primary text-center">
              SocialITEC
            </h1>
            <img src={Icon} alt="Icon" className="w-20 md:w-40" />
            <p>
              SocialITEC es una plataforma desarrollada por estudiantes del
              Instituto Tecnológico de León con el propósito de simplificar el
              proceso de gestión del servicio social. Nuestro equipo está
              conformado por jóvenes apasionados por la tecnología y el
              desarrollo de soluciones innovadoras.
            </p>
          </section>
          {/* <section className="flex flex-col gap-2">
            <h2 className="font-bold text-xl sm:text-2xl text-primary text-center">
              Nuestro Equipo
            </h2>
            <ul>
              <li>Bustamante Servin Carlos Eduardo</li>
            </ul>
          </section> */}

          <section className="flex flex-col gap-2">
            <h2 className="font-bold text-xl sm:text-2xl text-primary text-center">
              Nuestra Misión
            </h2>
            <p>
              En SocialITEC, nuestra misión es brindar a los estudiantes y
              encargados del servicio social herramientas digitales que
              optimicen y simplifiquen los procesos administrativos, reduciendo
              tiempos y errores, y aumentando la satisfacción de los usuarios.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutRAG;
