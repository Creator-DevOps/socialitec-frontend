import React from "react";
import ModalContainer from "@/components/containers/modal.container";
import { useStudents } from "../index/student-context";

const ShowInstitutionModal: React.FC = () => {
  const { isShowOpen, selected, closeShow } = useStudents();
  const item = selected;

  if (!isShowOpen || !selected) return null;
  return (
    <ModalContainer visible onClose={closeShow}>
      <div className="flex flex-col gap-6 md:px-6 text-center">
        <h2 className="text-2xl font-bold text-primary">Estudiante</h2>
        <p className="font-semibold">{item?.name}</p>
        <div className="flex flex-col gap-6 text-left">
          <div className="flex flex-col text-gray-500 gap-2">
            <p>
              <span className="font-semibold">Número de Control: : </span>
              {item?.control_number}
            </p>
            <p>
              <span className="font-semibold">Carrera: </span>
              {item?.major}
            </p>
            <p>
              <span className="font-semibold">Email: </span>
              {item?.email}
            </p>
          </div>
          <div className="flex flex-col text-gray-500">
            <p>
              <span className="font-semibold">Semestre: </span>
              {item?.semester}
            </p>
            <p>
              <span className="font-semibold">Creditos: </span>
              {item?.credits}
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
