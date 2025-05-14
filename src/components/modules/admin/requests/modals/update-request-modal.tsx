import React, { useEffect } from "react";
import ModalContainer from "@/components/containers/modal.container";
import { useForm } from "react-hook-form";
import { FormInput } from "@/components/forms/inputs/form-input";
import { useRequests } from "../index/request-context";
import { useAuth } from "@/contexts/authContext";
import { useToast } from "@/lib/hooks/use-toast";

interface FormValues {
  request_id?: number;
  student_id?: number;
  institution_id: number;
  program_id: number;
  acceptance_status: number;
  progress_status: number;
  completed_hours: number;
  feedback: string;
  [key: string]: unknown;
}

const UpdateRequestModal: React.FC = () => {
  const { isEditOpen, selected, closeEdit, handleUpdate, requests } =
    useRequests();

  const { toastSuccess, toastError, toastWarning } = useToast();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      institution_id: 0,
      program_id: 0,
      acceptance_status: 0,
      progress_status: 0,
      completed_hours: 0,
      feedback: "",
    },
  });

  const watchAcceptance = watch("acceptance_status");
  const watchProgress = watch("progress_status");
  const watchCompleted = watch("completed_hours");
  const selectedInstitution = watch("institution_id");

  useEffect(() => {
    if (selected) {
      setValue("student_id", selected.student_id);
      setValue("institution_id", selected.institution.institution_id);
      setValue("program_id", selected.program_id);
      setValue("acceptance_status", selected.acceptance_status);
      setValue("progress_status", selected.progress_status);
      setValue("completed_hours", selected.completed_hours);
      setValue("feedback", selected.feedback || "");
    }
  }, [selected, setValue]);

  useEffect(() => {
    if (!isEditOpen) reset();
  }, [isEditOpen, reset]);

  // Validation
  useEffect(() => {
    if (watchCompleted < 0) {
      setError("completed_hours", {
        type: "min",
        message: "No puede ser negativo",
      });
    } else if (
      (watchAcceptance === 0 || watchAcceptance === 2) &&
      watchCompleted > 0
    ) {
      setError("completed_hours", {
        type: "invalid",
        message: "Solicitud sin aceptar",
      });
    } else {
      clearErrors("completed_hours");
    }
    if (watchAcceptance !== 1 && watch("progress_status") > 0) {
      setError("progress_status", {
        type: "invalid",
        message: "Progreso solo si está aceptada",
      });
    } else if (watch("progress_status") === 2 && watchCompleted !== 480) {
      setError("progress_status", {
        type: "invalid",
        message: "Para finalizar horas deben ser 480",
      });
    } else {
      clearErrors("progress_status");
    }
  }, [watchAcceptance, watchCompleted, watch, setError, clearErrors]);

  const onSubmit = async (data: FormValues) => {
    if (selected!.student.credits < 180) {
      toastWarning({
        id: 8,
        title: "¡Advertencia!",
        message: "El alumno no cumple 180 créditos",
      });
      return;
    }
    await handleUpdate({ ...data, coordinator_id: user?.user_id || 0 });
    closeEdit();
  };
  const institutionName = selected?.institution.institution_name;
  const programName = selected?.program.program_name;

  if (!isEditOpen || !selected) return null;

  return (
    <ModalContainer visible onClose={closeEdit}>
      <div className="flex flex-col gap-6 md:px-6">
        <h2 className="text-2xl font-bold text-primary text-center">
          Editar Solicitud
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Student Info */}
          <FormInput
            name="control_number"
            label="Alumno"
            placeholder="Nombre del alumno"
            type="text"
            register={register}
            errors={errors}
            rules={{}}
            value={selected.student.name}
            disabled
          />
          <input
            type="hidden"
            {...register("student_id", { valueAsNumber: true })}
          />
          <FormInput
            name="institution_id"
            label="Institución"
            type="text"
            register={register}
            errors={errors}
            rules={{}}
            value={institutionName}
            disabled
          />
          <FormInput
            name="program_id"
            label="Programa"
            type="text"
            register={register}
            errors={errors}
            rules={{}}
            value={programName}
            disabled
          />
          {/* Horas Completadas & Feedback & Status */}
          <FormInput
            name="completed_hours"
            label="Horas Completadas"
            placeholder="0"
            type="number"
            register={register}
            errors={errors}
            rules={{
              valueAsNumber: true,
              min: { value: 0, message: "No valores negativos" },
            }}
          />
          <FormInput
            name="feedback"
            label="Feedback"
            placeholder="Comentarios (opcional)"
            register={register}
            errors={errors}
          />
          <div className="flex flex-col gap-1">
            <label
              htmlFor="acceptance_status"
              className="font-semibold text-xs md:text-sm"
            >
              Estado de Aceptación
            </label>
            <select
              id="acceptance_status"
              {...register("acceptance_status", { valueAsNumber: true })}
              className="border-b border-gray-300 focus:outline-none focus:border-secondary text-xs md:text-sm py-1"
              disabled={watchProgress >= 1}
            >
              <option value={0} disabled={watchProgress >= 1}>
                Pendiente
              </option>
              <option value={1} disabled={watchProgress >= 1}>
                Aceptada
              </option>
              <option value={2} disabled={watchProgress >= 1}>
                Rechazada
              </option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="progress_status"
              className="font-semibold text-xs md:text-sm"
            >
              Estado de Progreso
            </label>
            <select
              id="progress_status"
              {...register("progress_status", { valueAsNumber: true })}
              className="border-b border-gray-300 focus:outline-none focus:border-secondary text-xs md:text-sm py-1"
              disabled={watchAcceptance !== 1}
            >
              <option value={0} disabled={watchCompleted > 0}>
                Pendiente
              </option>
              <option value={1}>En proceso</option>
              <option value={2} disabled={watchCompleted < 480}>
                Finalizada
              </option>
            </select>
          </div>
          {/* Actions */}
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={closeEdit} className="cancel">
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

export default UpdateRequestModal;
