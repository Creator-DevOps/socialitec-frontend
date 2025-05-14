import React from "react";
import ModalContainer from "@/components/containers/modal.container";
import { useTemplates } from "../index/template-context";
import { useShowPreviewTemplate } from "@/lib/api/api-hooks/templates/use-show-preview-template";

const ShowTemplateModal: React.FC = () => {
  const { isShowOpen, selected, closeShow } = useTemplates();
  const { openPreview, loading, error } = useShowPreviewTemplate();
  const item = selected;

  if (!isShowOpen || !item) return null;
 


  return (
    <ModalContainer visible onClose={closeShow}>
      <div className="flex flex-col gap-6 md:px-6 text-center">
        <h2 className="text-2xl font-bold text-primary">Plantilla</h2>
        <p className="font-semibold">{item.document_name}</p>
        <div className="flex flex-col gap-6 text-left">
          <div className="flex flex-col text-gray-500 gap-2">
            <p>
              <span className="font-semibold">Descripción: </span>
              {item.description}
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

export default ShowTemplateModal;
