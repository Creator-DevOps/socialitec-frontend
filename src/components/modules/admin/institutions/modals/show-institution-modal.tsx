import React from "react";
import ModalContainer from "@/components/containers/modal.container";
import { useInstitutions } from "../index/institution-context";

const ShowInstitutionModal: React.FC = () => {
  const { isShowOpen, selected, closeShow } = useInstitutions();
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
