import React from "react";
import Icon from "@icons/iconG.svg";
import { IconButton } from "../buttons/iconButton";
import { useNavigate } from "react-router-dom";
import Header from "@components/ui-componets/general/header";
import Footer from "@components/login/footer";

const Terms = () => {
  return (
    <div className="flex h-screen w-screen flex-col ">
      <div className="fixed top-0 left-0 right-0 z-10  shadow ">
        <Header />
      </div>

      <div className="flex flex-col flex-1 items-center py-30 px-6 justify-center ">
        <div className="flex flex-col flex-1 text-justify justify-center items-center w-full md:w-[70%] gap-10 ">
          <section className="flex flex-col gap-2">
            <h1 className="font-bold text-3xl text-primary text-center">
              Términos y Condiciones de Uso - SocialITEC
            </h1>
            <p>
              Al utilizar la plataforma SocialITEC, aceptas los siguientes
              términos y condiciones:
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-bold text-2xl text-primary text-center">
              Uso de la Plataforma
            </h2>
            <p>
              SocialITEC debe ser utilizada únicamente para fines relacionados
              con la gestión del Servicio Social en el Instituto Tecnológico de
              León. El mal uso puede resultar en la suspensión del acceso.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-bold text-2xl text-primary text-center">
              Privacidad de Datos
            </h2>
            <p>
              Nos comprometemos a proteger tus datos personales. Toda la
              información recabada será utilizada exclusivamente para gestionar
              el servicio social y no será compartida con terceros.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-bold text-2xl text-primary text-center">
              Modificaciones
            </h2>
            <p>
              SocialITEC se reserva el derecho de actualizar o modificar estos
              términos en cualquier momento para mejorar el servicio.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="font-bold text-2xl text-primary text-center">
              Contacto
            </h2>
            <p>
              Para dudas o aclaraciones sobre estos términos, puedes
              contactarnos en:
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

export default Terms;
