import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ModalContainer from "@/components/containers/modal.container";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormInput } from "@/components/forms/inputs/form-input";
import { useReportCycleItems } from "../index/reportCycleItem-context";
import { useGetReportCycle } from "@/lib/api/api-hooks/reports/cycles/use-get-cycle";

interface FormValues {
  report_number?: number;
  title?: string;
  start_date?: string;
  end_date?: string;
  [key: string]: unknown;
}

const UpdateReportCycleItemModal: React.FC = () => {
  const { isEditOpen, selected, closeEdit, handleUpdate } = useReportCycleItems();
  const { cycleId } = useParams<{ cycleId: string }>();
  const { reportCycle } = useGetReportCycle(Number(cycleId));

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  // Pre-llenar el formulario con los valores del ítem seleccionado
  useEffect(() => {
    if (selected) {
      setValue("report_number", selected.report_number);
      setValue("title", selected.title);
      setValue("start_date", selected.start_date);
      setValue("end_date", selected.end_date);
    }
  }, [selected, setValue]);

  // Limpiar formulario al cerrar
  useEffect(() => {
    if (!isEditOpen) reset();
  }, [isEditOpen, reset]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!selected) return;
    // Combinar datos con cycle_id inmutable
    await handleUpdate({
      ...data,
      cycle_id: reportCycle!.cycle_id,
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
          Editar Asignación
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
          {/* Mostrar carpeta (solo lectura) */}
          <div className="flex flex-col gap-1 w-full text-left">
            <label htmlFor="cycle_display" className="font-semibold text-xs md:text-sm">
              Ciclo
            </label>
            <input
              id="cycle_display"
              type="text"
              disabled
              value={reportCycle?.folder_name ?? ""}
              className="border-b border-gray-300  text-xs md:text-sm py-1 cursor-not-allowed"
            />
          </div>

          {/* Select para número de reporte */}
          <div className="flex flex-col gap-1 w-full text-left">
            <label htmlFor="report_number" className="font-semibold text-xs md:text-sm">
              Número de Reporte
            </label>
            <select
              id="report_number"
              className={`border-b border-gray-300 focus:outline-none focus:border-secondary text-xs md:text-sm py-1 ${
                errors.report_number ? "border-red-500" : ""
              }`}
              defaultValue=""
              {...register("report_number", {
                required: "Número de reporte obligatorio",
                valueAsNumber: true,
              })}
            >
              <option value="" disabled>
                — Selecciona número de reporte —
              </option>
              <option value={1}>Reporte 1</option>
              <option value={2}>Reporte 2</option>
              <option value={3}>Reporte 3</option>
            </select>
            {errors.report_number && (
              <p className="text-red-500 text-sm mt-1">
                {errors.report_number.message}
              </p>
            )}
          </div>

          {/* Título de la entrega */}
          <FormInput
            name="title"
            label="Título de la Entrega"
            placeholder="Ej. Primer avance"
            register={register}
            errors={errors}
            rules={{ required: "Título obligatorio" }}
          />

          {/* Fecha de inicio */}
          <FormInput
            name="start_date"
            label="Fecha Inicio"
            type="date"
            register={register}
            errors={errors}
            rules={{ required: "Fecha inicio obligatoria" }}
          />

          {/* Fecha de fin */}
          <FormInput
            name="end_date"
            label="Fecha Fin"
            type="date"
            register={register}
            errors={errors}
            rules={{ required: "Fecha fin obligatoria" }}
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

export default UpdateReportCycleItemModal;
