import React from "react";
import ModalContainer from "@/components/containers/modal.container";
import { useReportCycleItems } from "../index/reportCycleItem-context";
import { useGetReportCycle } from "@/lib/api/api-hooks/reports/cycles/use-get-cycle";


const ShowReportCycleItemModal: React.FC = () => {
  const { isShowOpen, selected, closeShow } = useReportCycleItems();

  const item = selected;
  const {reportCycle,loading}= useGetReportCycle(item?.cycle_id||0)
  if (!isShowOpen || !item) return null;
 


  return (
    <ModalContainer visible onClose={closeShow}>
      <div className="flex flex-col gap-6 md:px-6 text-center">
        <h2 className="text-2xl font-bold text-primary">Lista de Reporte</h2>
        <p className="font-semibold">{item.title}</p>
        <div className="flex flex-col gap-6 text-left">
          <div className="flex flex-col text-gray-500 gap-2">
            <p>
              <span className="font-semibold">Ciclo: </span>
              {loading?"Cargando...":reportCycle?.name}
            </p>
            <p>
              <span className="font-semibold">Inicio: </span>
              {item.start_date}
            </p>
            <p>
              <span className="font-semibold">Fin: </span>
              {item.end_date}
            </p>
            <p>
              <span className="font-semibold">Reporte: </span>
              {item.report_number}
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

export default ShowReportCycleItemModal;
