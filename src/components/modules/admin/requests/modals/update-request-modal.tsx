import React, { useEffect, useState } from "react";
import ModalContainer from "@/components/containers/modal.container";
import { useForm } from "react-hook-form";
import { FormInput } from "@/components/forms/inputs/form-input";
import { useRequests } from "../index/request-context";
import { useAuth } from "@/contexts/authContext";
import { useToast } from "@/lib/hooks/use-toast";
import { useGetAllInstitutions } from "@/lib/api/api-hooks/institutions/use-get-all-institutions";
import { useGetProgramsByInstitution } from "@/lib/api/api-hooks/programs/use-get-programs-by-institution";
import { useGetReportCycle } from "@/lib/api/api-hooks/reports/cycles/use-get-cycle";

interface FormValues {
  request_id?: number;
  student_id?: number;
  institution_id: number;
  program_id: number;
  acceptance_status?: number;
  progress_status: number;
  completed_hours: number;
  feedback: string;
  [key: string]: unknown;
}

const UpdateRequestModal: React.FC = () => {
  const { isEditOpen, selected, closeEdit, handleUpdate, requests } = useRequests();
  const { toastSuccess, toastError, toastWarning } = useToast();
  const { user } = useAuth();
  const { institutions } = useGetAllInstitutions();
  const [selectedInstitution, setSelectedInstitution] = useState<number | null>(null);
  const { programs } = useGetProgramsByInstitution(selectedInstitution || 0);
  const {reportCycle,loading}=useGetReportCycle(selected?.cycle_id||0);
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
  const watchInstitution = watch("institution_id");
  const watchProgram = watch("program_id");

  // Set initial values when selected changes
  useEffect(() => {
    if (selected) {
      setValue("student_id", selected.student_id);
      setValue("institution_id", selected.institution.institution_id);
      setValue("program_id", selected.program_id);
      setValue("acceptance_status", selected.acceptance_status);
      setValue("progress_status", selected.progress_status);
      setValue("completed_hours", selected.completed_hours);
      setValue("feedback", selected.feedback || "");
      setSelectedInstitution(selected.institution.institution_id);
    }
  }, [selected, setValue]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isEditOpen) reset();
  }, [isEditOpen, reset]);

  // Update selected institution when institution_id changes
  useEffect(() => {
    if (watchInstitution) {
      setSelectedInstitution(watchInstitution);
    }
  }, [watchInstitution]);

  // Field-level validation
  useEffect(() => {
    // completed_hours validation
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

    // progress_status validation
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
    
    await handleUpdate({ 
      ...data, 
      coordinator_id: user?.user_id || 0
    });
    closeEdit();
  };

  if (!isEditOpen || !selected) return null;

  return (
    <ModalContainer visible onClose={closeEdit}>
      <div className="flex flex-col gap-6 md:px-6">
        <h2 className="text-2xl font-bold text-primary text-center">Editar Solicitud</h2>
        <h3 className="text-sm text-center font-bold text-secondary">
          {loading?"Cargando...":reportCycle?.name}
        </h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Student Info (readonly) */}
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
          <input type="hidden" {...register("student_id", { valueAsNumber: true })} />

          {/* Institución (editable) */}
          <div className="flex flex-col gap-1">
            <label htmlFor="institution_id" className="font-semibold text-xs md:text-sm">Institución</label>
            <select
              id="institution_id"
              {...register("institution_id", { 
                required: "Institución obligatoria", 
                valueAsNumber: true 
              })}
              defaultValue={selected?.institution.institution_id || ""}
              onChange={(e) => {
                setValue("institution_id", Number(e.target.value));
                setValue("program_id", 0); // Reset program when institution changes
              }}
              className={`border-b border-gray-300 focus:outline-none focus:border-secondary text-xs md:text-sm py-1 ${
                errors.institution_id ? "border-red-500" : ""
              }`}
            >
              <option value="">— Selecciona —</option>
              {institutions.map((inst) => (
                <option 
                  key={inst.institution_id} 
                  value={inst.institution_id}
                >
                  {inst.institution_name}
                </option>
              ))}
            </select>
            {errors.institution_id && (
              <p className="text-red-500 !text-xs mt-1">{errors.institution_id.message}</p>
            )}
          </div>

          {/* Programa (editable, depends on institution) */}
          <div className="flex flex-col gap-1">
            <label htmlFor="program_id" className="font-semibold text-xs md:text-sm">Programa</label>
            <select
              id="program_id"
              {...register("program_id", { 
                valueAsNumber: true 
              })}
              defaultValue={selected?.program_id || ""}
              disabled={!watchInstitution}
              className={`border-b border-gray-300 focus:outline-none focus:border-secondary text-xs md:text-sm py-1 ${
                errors.program_id ? "border-red-500" : ""
              }`}
            >
              <option value="">— Selecciona —</option>
              {programs.map((prog) => (
                <option 
                  key={prog.program_id} 
                  value={prog.program_id}
                >
                  {prog.program_name}
                </option>
              ))}
            </select>
            {errors.program_id && (
              <p className="text-red-500 !text-xs mt-1">{errors.program_id.message}</p>
            )}
          </div>

          {/* Resto del formulario (sin cambios)... */}
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
            <label htmlFor="acceptance_status" className="font-semibold text-xs md:text-sm">
              Estado de Aceptación
            </label>
            <select
              id="acceptance_status"
              {...register("acceptance_status", { valueAsNumber: true })}
              defaultValue={selected?.acceptance_status}
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
            <label htmlFor="progress_status" className="font-semibold text-xs md:text-sm">
              Estado de Progreso
            </label>
            <select
              id="progress_status"
              {...register("progress_status", { valueAsNumber: true })}
              defaultValue={selected?.progress_status}
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