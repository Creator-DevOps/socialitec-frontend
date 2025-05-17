import React from "react";
import Icon from "@icons/iconG.svg";
import { IconButton } from "../buttons/iconButton";
import { useNavigate } from "react-router-dom";
import Header from "@components/ui-componets/general/header";
import Footer from "@components/login/footer";

const TecNM = () => {
  return (
    <div className="flex h-screen w-screen flex-col ">
      <div className="fixed top-0 left-0 right-0 z-10  shadow ">
        <Header />
      </div>

      <div className="flex flex-col flex-1 items-center py-30 px-6 justify-center ">
        <div className="flex flex-col flex-1 text-justify justify-center items-center w-full md:w-[70%] gap-10 ">
          <section className="flex flex-col gap-2">
            <h1 className="font-bold text-xl md:text-3xl text-primary text-center">
              Tecnológico Nacional de México Campus León
            </h1>
            <p>
              El TecNM León es una institución pública de educación superior
              dedicada a formar profesionales en áreas de ingeniería, tecnología
              y gestión empresarial. Es parte de la red educativa del
              Tecnológico Nacional de México, la más grande del país.
            </p>
          </section>
          <section className="flex flex-col gap-2">
            <h2 className="font-bold text-xl sm:text-2xl text-primary text-center">
              Carreras Ofrecidas
            </h2>
            <ul className="list-disc text-left px-10">
              <li>
                <strong>Ingeniería Industrial: </strong>Enfoque en diseño y
                optimización de sistemas de producción.
              </li>
              <li>
                <strong>Ingeniería en Gestión Empresarial: </strong>Liderazgo y
                competitividad en organizaciones.
              </li>
              <li>
                <strong>Ingeniería Electromecánica: </strong>Análisis y
                mantenimiento de sistemas electromecánicos.
              </li>
              <li>
                <strong>Ingeniería en Sistemas Computacionales: </strong>
                Desarrollo y gestión de soluciones informáticas.
              </li>
              <li>
                <strong>
                  Ingeniería en Tecnologías de la Información y Comunicaciones:{" "}
                </strong>
                Diseño y administración de sistemas de comunicación digital.
              </li>
            </ul>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-bold text-xl sm:text-2xl text-primary text-center" id="address">
              Instalaciones
            </h2>
            <p>
              El TecNM León cuenta con dos campus equipados con laboratorios
              especializados, bibliotecas, áreas deportivas y espacios
              destinados al desarrollo académico y extracurricular:
            </p>
            <ul className="list-disc text-left px-10">
              <li>
                <strong>Campus I: </strong>Av. Tecnológico s/n, Fraccionamiento
                Industrial Julián de Obregón, 37290 León, Gto.
              </li>
              <li>
                <strong>Campus II: </strong>Blvd. Juan Alonso de Torres Pte.
                3542, San José de Piletas, 37316 León, Gto.
              </li>
            </ul>
          </section>
          <section className="flex flex-col gap-2">
            <h2 className="font-bold text-xl sm:text-2xl text-primary text-center">
              Contacto
            </h2>
            <p className="text-center px-4">
              Para más información, puedes comunicarte con el TecNM León:
            </p>
            <ul className="list-disc text-left px-10">
              <li>
                <strong>Correo electrónico: </strong>
                <a
                  href="mailto:comunicacionydifusion@leon.tecnm.mx"
                  className="underline text-primary"
                >
                  comunicacionydifusion@leon.tecnm.mx
                </a>
              </li>
              <li>
                <strong>Teléfono: </strong>477 710 5200 Ext. 1000
              </li>
            </ul>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TecNM;
