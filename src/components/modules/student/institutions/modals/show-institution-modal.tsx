import React from "react";
import ModalContainer from "@/components/containers/modal.container";
import { useInstitutions } from "../index/institution-context";
import Loader from "@/components/ui-componets/load/Loader";

const ShowInstitutionModal: React.FC = () => {
  const { isShowOpen, selected, closeShow, programs, load } = useInstitutions();
  const item = selected;

  if (!isShowOpen || !selected) return null;
  return (
    <ModalContainer visible onClose={closeShow}>
      <div className="flex flex-col gap-6 md:px-6 text-center">
        <h2 className="text-2xl font-bold text-primary">Institución</h2>
        <p className="font-semibold">{item?.institution_name}</p>
        <div className="flex flex-col gap-6 text-left">
          <div className="flex flex-col text-gray-500 gap-2">
            <p>
              <span className="font-semibold">Descripción: </span>
              {item?.description}
            </p>
            <p>
              <span className="font-semibold">Email: </span>
              {item?.email}
            </p>
            <p>
              <span className="font-semibold">teléfono: </span>
              {item?.phone}
            </p>
          </div>
          <div className="flex flex-col text-gray-500">
            <p className="text-black font-semibold">Dirección</p>
            <p>
              <span className="font-semibold">Localidad: </span>
              {item?.neighborhood}
            </p>
            <p>
              <span className="font-semibold">C.P: </span>
              {item?.postal_code}
            </p>
            <p>
              <span className="font-semibold">Calle: </span>
              {item?.street}
            </p>
            <p>
              <span className="font-semibold">Número: </span>
              {item?.number}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">Programas</h2>
            {load ? (
              <>
                <Loader />
                <div className="text-center text-gray-500 py-8">
                  Cargando...
                </div>
              </>
            ) : programs.length > 0 ? (
              programs.map((p) => (
                <div
                  key={p.program_id}
                  className="text-xs md:text-sm bg-gray-50 p-2 rounded-lg border border-gray-200 shadow-lg mb-4"
                >
                  <h3 className="text-lg font-semibold ">
                    {p.program_name}
                  </h3>
                  <p>
                    <strong>Descripción: </strong>
                    <span>{p.description}</span>
                  </p>
                  <p>
                    <strong>Actividades: </strong>
                    <span>{p.activities}</span>
                  </p>
                  <p>
                    <strong>Supervisor: </strong>
                    <span>{p.supervisor_name}</span>
                  </p>
                  <p>
                    <strong>Email Supervisor: </strong>
                    <span>{p.supervisor_email}</span>
                  </p>
                  <p>
                    <strong>Teléfono Supervisor: </strong>
                    <span>{p.supervisor_phone}</span>
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                No hay programas para mostrar.
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button onClick={closeShow} className="cancel">
            Cerrar
          </button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default ShowInstitutionModal;
