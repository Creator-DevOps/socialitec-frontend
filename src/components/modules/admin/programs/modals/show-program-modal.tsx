import React from "react";
import ModalContainer from "@/components/containers/modal.container";
import { usePrograms } from "../index/program-context";
import Loader from "@/components/ui-componets/load/Loader";
import { useGetInstitution } from "@/lib/api/api-hooks/institutions/use-get-institution";

const ShowProgramModal: React.FC = () => {
  const { isShowOpen, selected, closeShow } = usePrograms();
  const item = selected;
  const{institution,loading}= useGetInstitution(item?.institution_id||0);

  if (!isShowOpen || !selected) return null;
  return (
    <ModalContainer visible onClose={closeShow}>
      <div className="flex flex-col gap-6 md:px-6 text-center">
        <h2 className="text-2xl font-bold text-primary">Programa</h2>
        <p className="font-semibold">{item?.program_name}</p>
        <div className="flex flex-col gap-6 text-left">
          <div className="flex flex-col text-gray-500 gap-2">
            <p>
              <span className="font-semibold">Institución: </span>{loading? "Cargando...":institution?.institution_name}
            </p>
            <p>
              <span className="font-semibold">Descripción: </span>
              {item?.description}
            </p>
            <p>
              <span className="font-semibold">Actividades: </span>
              {item?.activities}
            </p>
          </div>
          <div className="flex flex-col text-gray-500">
            <p className="text-black font-semibold">Responsable</p>
            <p>{item?.supervisor_name}</p>
            <p>
              <span className="font-semibold">Teléfono: </span>
              {item?.supervisor_phone}
            </p>
            <p>
              <span className="font-semibold">Email: </span>
              {item?.supervisor_email}
            </p>
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

export default ShowProgramModal;
