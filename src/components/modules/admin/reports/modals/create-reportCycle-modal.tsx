import React, { useEffect } from "react";
import ModalContainer from "@/components/containers/modal.container";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormInput } from "@/components/forms/inputs/form-input";
import { useReportCycles } from "../index/reportCycle-context";

interface FormValues {
  name: string;
  folder_name: string;
  start_date: string; // ISO date, e.g. "2025-01-15"
  end_date: string;
  [key: string]: unknown;
}

const CreateReportCycleModal: React.FC = () => {
  const { isCreateOpen, closeCreate, handleCreate } = useReportCycles();
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    await handleCreate(data);
    closeCreate();
    //reset();
  };

  if (!isCreateOpen) return null;

  return (
    <ModalContainer
      visible
      onClose={() => {
        reset();
        closeCreate();
      }}
    >
      <div className="flex flex-col gap-6 md:px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary">
            Agregar nuevo Ciclo
          </h2>
          <p>Completa los datos del ciclo a registrar.</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <FormInput
            name="name"
            label="Nombre del ciclo"
            placeholder="Ej. Reportes ciclo enero-junio"
            register={register}
            errors={errors}
            rules={{ required: "Nombre obligatorio" }}
          />

          <FormInput
            name="folder_name"
            label="Nombre del folder"
            placeholder="Ej. 2025-ene-jun"
            register={register}
            errors={errors}
            rules={{ required: "Nombre folder obligatorio" }}
          />
          <FormInput
            name="start_date"
            label="Fecha Inicio"
            placeholder="Ej. 2025/01/29"
            register={register}
            errors={errors}
            rules={{ required: "Fecha inicio obligatoria" }}
          />
          <FormInput
            name="end_date"
            label="Fecha fin"
            placeholder="Ej. 2025-06-10"
            register={register}
            errors={errors}
            rules={{ required: "Fecha fin obligatoria" }}
          />

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => {
                reset();
                closeCreate();
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

export default CreateReportCycleModal;
