import React, { useEffect } from "react";
import ModalContainer from "@/components/containers/modal.container";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormInput } from "@/components/forms/inputs/form-input";
import { useReportCycles } from "../index/reportCycle-context";

interface FormValues {
  name?: string;
  folder_name?: string;
  start_date?: string;
  end_date?: string;
  [key: string]: unknown;

}

const UpdateReportCycleModal: React.FC = () => {
  const { isEditOpen, selected, closeEdit, handleUpdate } = useReportCycles();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<FormValues>();

  // Pre-llenar el formulario con los valores del ciclo seleccionado
  useEffect(() => {
    if (selected) {
      setValue("name", selected.name);
      setValue("folder_name", selected.folder_name);
      setValue("start_date", selected.start_date);
      setValue("end_date", selected.end_date);
    }
  }, [selected, setValue]);

  // Limpiar al cerrar
  useEffect(() => {
    if (!isEditOpen) reset();
  }, [isEditOpen, reset]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!selected) return;

    // Construir payload con sólo los campos modificados
    const payload: Record<string, unknown> = {};
    if (data.name !== undefined)        payload.name = data.name;
    if (data.folder_name !== undefined) payload.folder_name = data.folder_name;
    if (data.start_date !== undefined)  payload.start_date = data.start_date;
    if (data.end_date !== undefined)    payload.end_date = data.end_date;

    await handleUpdate(payload);
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
          Editar Ciclo de Reportes
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
          <FormInput
            name="name"
            label="Nombre del ciclo"
            placeholder="Ej. Reportes ciclo enero-junio"
            register={register}
            errors={errors}
            rules={{ required: "El nombre es obligatorio" }}
          />

          <FormInput
            name="folder_name"
            label="Nombre de carpeta"
            placeholder="Ej. 2025-ene-jun"
            register={register}
            errors={errors}
            rules={{ required: "La carpeta es obligatoria" }}
          />

          <FormInput
            name="start_date"
            label="Fecha inicio"
            type="date"
            register={register}
            errors={errors}
            rules={{ required: "La fecha de inicio es obligatoria" }}
          />

          <FormInput
            name="end_date"
            label="Fecha fin"
            type="date"
            register={register}
            errors={errors}
            rules={{ required: "La fecha de fin es obligatoria" }}
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
             Guardar
            </button>
          </div>
        </form>
      </div>
    </ModalContainer>
  );
};

export default UpdateReportCycleModal;