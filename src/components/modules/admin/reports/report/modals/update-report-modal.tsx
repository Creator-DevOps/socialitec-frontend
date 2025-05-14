import React, { useEffect } from "react";
import ModalContainer from "@/components/containers/modal.container";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormInput } from "@/components/forms/inputs/form-input";
import FileInput from "@/components/forms/files/FileInput";
import { useReports } from "../index/report-context";
import { useParams } from "react-router-dom";

interface FormValues {
  item_id?:number;
  document_name?: string;
  report_number?: number;
  status?: number;
  file?: FileList;
  [key: string]: unknown;
}

const UpdateReportModal: React.FC = () => {
  const { isEditOpen, selected, closeEdit, handleUpdate } = useReports();
  const { id, cycleId, itemId } = useParams<{
    id: string;
    cycleId: string;
    itemId?: string;
  }>();
  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  // Pre-llenar el formulario con los valores del reporte seleccionado
  useEffect(() => {
    if (selected) {
      setValue("document_name", selected.document_name);
      setValue("report_number", selected.report_number);
      setValue("status", selected.status);
    }
  }, [selected, setValue]);

  // Limpiar al cerrar el modal
  useEffect(() => {
    if (!isEditOpen) {
      reset();
    }
  }, [isEditOpen, reset]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // Convertir FileList a File | undefined
    const file = data.file?.[0];
    await handleUpdate({
      ...(data.item_id  !== undefined && { item_id: Number(itemId ) }),
      ...(data.document_name   !== undefined && { document_name: data.document_name }),
      ...(data.report_number   !== undefined && { report_number: data.report_number }),
      ...(data.status          !== undefined && { status: data.status }),
      ...(file                  && { file }),
    });
    reset();
    closeEdit();
  };

  if (!isEditOpen || !selected) return null;

  return (
    <ModalContainer
      visible
      onClose={() => {
        reset();
        closeEdit();
      }}
    >
      <div className="flex flex-col gap-6 md:px-6">
        <h2 className="text-2xl font-bold text-primary text-center">
          Editar Reporte
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <FormInput
            name="document_name"
            label="Nombre del documento"
            placeholder="Ej. Informe Final"
            register={register}
            errors={errors}
            rules={{ required: "El nombre es obligatorio" }}
          />

          <FormInput
            name="report_number"
            label="Número de Reporte"
            type="number"
            placeholder="Ej. 1"
            register={register}
            errors={errors}
            rules={{ valueAsNumber: true, required: "Número obligatorio" }}
          />

          <FormInput
            name="status"
            label="Estatus"
            type="number"
            placeholder="Ej. 0"
            register={register}
            errors={errors}
            rules={{ valueAsNumber: true, required: "Estatus obligatorio" }}
          />

          <FileInput
            name="file"
            control={control}
            label="Archivo"
            accept=".pdf,.docx,.txt,.xls,.png,.jpg,.mp4,.mp3"
          />

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => {
                reset();
                closeEdit();
              }}
              className="cancel"
            >
              Cancelar
            </button>
            <button type="submit" className="create">
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </ModalContainer>
  );
};

export default UpdateReportModal;
