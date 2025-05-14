import React from "react";
import ModalContainer from "@/components/containers/modal.container";
import { useLetters } from "../index/letter-context";
import { useShowPreviewLetter } from "@/lib/api/api-hooks/release-letters/use-show-preview-letter";

const ShowLetterModal: React.FC = () => {
  const { isShowOpen, selected, closeShow } = useLetters();
  const { openPreview, loading, error } = useShowPreviewLetter();
  const item = selected;

  if (!isShowOpen || !item) return null;
 
  const progress=(p?:number)=>{
    switch(p){
      case 0:
        return "Pendiente"
      case 1:
        return "En proceso"
      case 2:
        return "Finalizado"
    }
  };


  return (
    <ModalContainer visible onClose={closeShow}>
      <div className="flex flex-col gap-6 md:px-6 text-center">
        <h2 className="text-2xl font-bold text-primary">Carta</h2>
        <p className="font-semibold">{item.document_name}</p>
        <div className="flex flex-col gap-6 text-left">
          <div className="flex flex-col text-gray-500 gap-2">
            <p>
              <span className="font-semibold">Estudiante: </span>
              {item.request.student.name}
            </p>
            <p>
              <span className="font-semibold">Institución: </span>
              {item.request.institution.institution_name}
            </p>
             <p>
              <span className="font-semibold">Programa: </span>
              {item.request.program.program_name}
            </p>
             <p>
              <span className="font-semibold">Estatus: </span>
              {progress(item.request.progress_status)}
            </p>
          </div>
          <div className="flex justify-center">
            <button  onClick={() => openPreview(item.document_id, item.file_path)}
              disabled={loading} className="create  rounded-md">
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

export default ShowLetterModal;
