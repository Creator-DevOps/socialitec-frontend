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

      <div className="flex flex-col flex-1 items-center py-30 px-6 justify-center ">
        <div className="flex flex-col flex-1 text-justify justify-center items-center w-full md:w-[70%] gap-10 ">
          <section className="flex flex-col gap-2">
            <h1 className="font-bold text-xl md:text-3xl text-primary text-center">
              Servicio Social
            </h1>
            <p>
              El Servicio Social es una actividad obligatoria y temporal que
              permite a los estudiantes del TecNM aplicar sus conocimientos en
              beneficio de la sociedad. Es un requisito indispensable para la
              titulación profesional.
            </p>
          </section>
          <section className="flex flex-col gap-2">
            <h2 className="font-bold text-xl sm:text-2xl text-primary text-center">
             Requisitos
            </h2>
            <ul className="list-disc text-left px-10">
              <li>
              Haber aprobado al menos el 70% de los créditos del plan de estudios.
              </li>
              <li>
              Estar inscrito al momento de registrar el Servicio Social.
              </li>
              <li>
              Contar con un correo institucional.
              </li>
            </ul>
          </section>
          <section className="flex flex-col gap-2">
            <h2 className="font-bold text-xl sm:text-2xl text-primary text-center">
              Duración y créditos
            </h2>
            <p>
              El Servicio Social debe cubrir un mínimo de 480 horas en un
              periodo no menor a seis meses ni mayor a dos años.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-bold text-xl sm:text-2xl text-primary text-center">
              ¿Dónde se puede realizar?
            </h2>
            <ul className="list-disc text-left px-10">
              <li>
                <strong>Instituciones públicas: </strong>Dependencias
                municipales, estatales o federales.
              </li>
              <li>
                <strong>Organizaciones no gubernamentales: </strong>ONG en áreas
                como educación, salud o medio ambiente.
              </li>
              <li>
                <strong>Proyectos internos: </strong>Programas desarrollados
                dentro del TecNM con impacto social.
              </li>
            </ul>
          </section>
          <section className="flex flex-col gap-2">
            <h2 className="font-bold text-xl sm:text-2xl text-primary text-center">
              Beneficios del Servicio Social
            </h2>
            <ul className="list-disc text-left px-10">
              <li>
                <strong>Aplicación práctica: </strong>Utilizar conocimientos
                adquiridos en situaciones reales.
              </li>
              <li>
                <strong>Desarrollo profesional: </strong>Fortalecer habilidades
                como liderazgo y trabajo en equipo.
              </li>
              <li>
                <strong>Requisito de titulación: </strong>Es necesario para
                obtener el título profesional.
              </li>
            </ul>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
