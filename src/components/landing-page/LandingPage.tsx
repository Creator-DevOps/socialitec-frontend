import Header from "./header";
import Footer from "../login/footer";
import TecIMage from "@images/png/SociaItec.svg";
const LandingPage = () => {
  return (
    <div className="flex flex-col relative m-0 p-0 h-screen w-full">
      <Header />
      <main className="flex flex-col flex-1 pt-20 w-full">
        <section className="w-full flex flex-col-reverse lg:flex-row  px-10 py-16 items-center bg-gray-fondo gap-8 justify-center md:justify-between text-center">
          <div className="flex flex-col md:px-10 gap-4">
            <h2 className="font-bold text-2xl md:text-4xl">
              Simplifica el proceso del Servicio Social
            </h2>
            <span className="text-sm md:text-lg">
              SocialITEC te permite solicitar, gestionar, revisar y obtener tu
              carta de liberación de Servicio Social de una forma sencilla y
              rápida
            </span>
          </div>
          <img src={TecIMage} alt="SocialITEC" className="w-80 md:w-100" />
        </section>
        <section className="w-full flex flex-col px-10 py-16 items-center  gap-8 justify-center  text-center">
          <h2 className="font-bold text-xl md:text-2xl">Características</h2>
          <div className="flex md:flex-row flex-col gap-6">
            <div className="flex flex-col bg-gray-fondo p-6  gap-2">
              <h3 className="font-bold text-sm md:text-lg">GESTIÓN</h3>
              <p>
                Gestiona todos tus documentos, solicitudes, reportes y avances
                sobre tu Servicio Social
              </p>
            </div>
            <div className="flex flex-col bg-gray-fondo p-6  gap-2">
              <h3 className="font-bold text-sm md:text-lg">FACILIDAD</h3>
              <p>
                Consulta y genera solicitud en instituciones disponibles
                fácilmente.
              </p>
            </div>
            <div className="flex flex-col bg-gray-fondo p-6  gap-2">
              <h3 className="font-bold text-sm md:text-lg">LIBERACIÓN</h3>
              <p>
                Acceso sencillo a plantillas de reportes y a carta de liberación
                de Servicio Social.
              </p>
            </div>
          </div>
        </section>
        <section className="w-full flex flex-col px-10 py-16 items-center gap-8 justify-center  text-center bg-gray-fondo">
          <div className="flex flex-col w-full md:w-130">
            <h2 className="font-bold text-xl md:text-2xl">SocialITEC</h2>
            <span className="text-sm md:text-lg">
              SocialITEC es una plataforma moderna que simplifica la gestión y
              manejo de documentos del Servicio Social en el Instituto
              Tecnológico de León.
            </span>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
export default LandingPage;
