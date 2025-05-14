import React from "react";
import ModalContainer from "@/components/containers/modal.container";
import { useReports } from "../index/requestPanel-context";
import { useShowPreviewReport } from "@/lib/api/api-hooks/reports/use-show-preview-report";

const ShowReportModal: React.FC = () => {
  const { isShowOpen, selected, closeShow } = useReports();
  const { openPreview, loading, error } = useShowPreviewReport();
  const item = selected;

  if (!isShowOpen || !item) return null;

  return (
    <ModalContainer visible onClose={closeShow}>
      <div className="flex flex-col gap-6 md:px-6 text-center">
        <h2 className="text-2xl font-bold text-primary">Reporte</h2>
        <p className="font-semibold">{item.document_name}</p>
        <div className="flex flex-col gap-6 text-left">
          <div className="flex flex-col text-gray-500 gap-2">
            <p className="text-black font-semibold !text-base md:!text-lg">
              Estudiante
            </p>
            <p>
              <span className="font-semibold">Nombre: </span>
              {item.request.student.name}
            </p>
            <p>
              <span className="font-semibold">No.Control: </span>
              {item.request.student.control_number}
            </p>
            <p className="text-black font-semibold !text-base md:!text-lg">
              Institución
            </p>

            <p>
              <span className="font-semibold">Nombre: </span>
              {item.request.institution.institution_name}
            </p>
            <p>
              <span className="font-semibold">Programa: </span>
              {item.request.program.program_name}
            </p>
            <p className="text-black font-semibold !text-base md:!text-lg">
              Reporte
            </p>
            <p>
              <span className="font-semibold">Número de reporte: </span>
              {item.report_number}
            </p>
            <p>
              <span className="font-semibold">Estatus: </span>
              {item.status===1?"Aceptada":item.status===2?"Rechazado":"Pendiente"}
            </p>
            <p>
              <span className="font-semibold">Retroalimentación: </span>
              {item.feedback}
            </p>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => openPreview(item.document_id, item.file_path)}
              disabled={loading}
              className="create  rounded-md"
            >
              Abrir
            </button>
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

export default ShowReportModal;
