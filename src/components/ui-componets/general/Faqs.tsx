import React from "react";
import Icon from "@icons/iconG.svg";
import { IconButton } from "../buttons/iconButton";
import { useNavigate } from "react-router-dom";
import Header from "@components/ui-componets/general/header";
import Footer from "@components/login/footer";

const Faqs = () => {
  return (
    <div className="flex h-screen w-screen flex-col ">
      <div className="fixed top-0 left-0 right-0 z-10  shadow ">
        <Header />
      </div>

      <div className="flex flex-col flex-1 items-center py-30 px-6 justify-center ">
        <div className="flex flex-col flex-1 text-justify justify-center items-center w-full md:w-[70%] gap-10 ">
          <section className="flex flex-col gap-2">
            <h1 className="font-bold text-3xl text-primary text-center">
              ¿Qué es SocialITEC?
            </h1>
            <p>
              SocialITEC es una plataforma moderna desarrollada por estudiantes
              del Instituto Tecnológico de León. Su propósito es facilitar la
              gestión del Servicio Social de forma sencilla, rápida y segura.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-bold text-2xl text-primary text-center">
              ¿Qué puedo hacer en SocialITEC?
            </h2>
            <ul className="list-disc text-left px-10">
              <li>Solicitar tu servicio social fácilmente.</li>
              <li>Gestionar documentos, reportes y avances.</li>
              <li>Consultar instituciones disponibles para realizarlo.</li>
              <li>Descargar tu carta de liberación cuando concluyas.</li>
            </ul>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-bold text-2xl text-primary text-center">
              ¿Quién puede usar SocialITEC?
            </h2>
            <p>
              Está dirigido a estudiantes del TecNM Campus León que desean
              realizar y administrar su Servicio Social de forma digital.
            </p>
          </section>
          <section className="flex flex-col gap-2">
            <h2 className="font-bold text-2xl text-primary text-center">
              ¿Cómo solicito mi Servicio Social?
            </h2>
            <p>
              Dentro de SocialITEC puedes consultar las instituciones
              disponibles y generar tu solicitud en pocos pasos, de forma rápida
              y segura.
            </p>
          </section>
          <section className="flex flex-col gap-2">
            <h2 className="font-bold text-2xl text-primary text-center">
              ¿Cómo obtengo mi carta de liberación?
            </h2>
            <p>
              Al completar tu Servicio Social y reportes, podrás generar tu
              carta de liberación directamente desde la plataforma con las
              plantillas disponibles.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-bold text-2xl text-primary text-center">
              ¿Cómo contacto al soporte?
            </h2>
            <p>
              Puedes escribirnos al correo:
              <a
                href="mailto:comunicacionydifusion@leon.tecnm.mx"
                className="underline text-primary ml-1"
              >
                comunicacionydifusion@leon.tecnm.mx
              </a>
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Faqs;
