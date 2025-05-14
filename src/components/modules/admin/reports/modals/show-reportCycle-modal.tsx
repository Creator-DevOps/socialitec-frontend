import React from "react";
import ModalContainer from "@/components/containers/modal.container";
import { useReportCycles } from "../index/reportCycle-context";


const ShowReportCycleModal: React.FC = () => {
  const { isShowOpen, selected, closeShow } = useReportCycles();
  const item = selected;

  if (!isShowOpen || !item) return null;
 


  return (
    <ModalContainer visible onClose={closeShow}>
      <div className="flex flex-col gap-6 md:px-6 text-center">
        <h2 className="text-2xl font-bold text-primary">Plantilla</h2>
        <p className="font-semibold">{item.name}</p>
        <div className="flex flex-col gap-6 text-left">
          <div className="flex flex-col text-gray-500 gap-2">
            <p>
              <span className="font-semibold">Solicitud: </span>
              {item.folder_name}
            </p>
          </div>
          <div className="flex justify-center">

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

export default ShowReportCycleModal;
