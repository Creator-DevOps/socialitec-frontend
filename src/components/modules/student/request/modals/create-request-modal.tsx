import React, { useEffect, useState, useRef } from "react";
import ModalContainer from "@/components/containers/modal.container";
import { useForm } from "react-hook-form";
import { FormInput } from "@/components/forms/inputs/form-input";
import { useRequests } from "../index/request-context";
import { useGetAllInstitutions } from "@/lib/api/api-hooks/institutions/use-get-all-institutions";
import { useGetProgramsByInstitution } from "@/lib/api/api-hooks/programs/use-get-programs-by-institution";
import { useAuth } from "@/contexts/authContext";
import { useGetStudents } from "@/lib/api/api-hooks/students/use-get-students";
import SearchLogo from "@icons/search.svg";
import XLogo from "@icons/X.svg";
import { IconButton } from "@/components/ui-componets/buttons/iconButton";
import { useToast } from "@/lib/hooks/use-toast";
import { useGetStudent } from "@/lib/api/api-hooks/students/use-get-student";
import { useGetReportCycle } from "@/lib/api/api-hooks/reports/cycles/use-get-cycle";
import { useGetReportCycles } from "@/lib/api/api-hooks/reports/cycles/use-get-cycles";

interface FormValues {
  control_number: string;
  student_id: number;
  institution_id: number;
  program_id: number;
  acceptance_status: number;
  progress_status: number;
  completed_hours: number;
  feedback: string;
  cycle_id: number;
  [key: string]: unknown;
}

const defaultValues: FormValues = {
  control_number: "",
  student_id: 0,
  institution_id: 0,
  program_id: 0,
  acceptance_status: 0,
  progress_status: 0,
  completed_hours: 0,
  feedback: "",
  cycle_id: 0,
};

const CreateRequestModal: React.FC = () => {
  const { isCreateOpen, closeCreate, handleCreate } = useRequests();
  const { institutions } = useGetAllInstitutions();
  const { toastSuccess, toastError, toastWarning } = useToast();
  const { user } = useAuth();
  const { reportCycles } = useGetReportCycles(1, 10);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ defaultValues });

  const {
    students,
    query: studentQuery,
    setQuery: setStudentQuery,
  } = useGetStudents(1, 10);
  const [selectedStudent, setSelectedStudent] = useState<
    (typeof students)[0] | null
  >(null);
  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout>();
  const dropdownRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [cycleOpen, setCycleOpen] = useState(false);
  const { requests } = useRequests();

  // Reset form & local state whenever the modal opens
  useEffect(() => {
    if (isCreateOpen) {
      reset(defaultValues);
      setInputValue("");
      setSelectedStudent(null);
      setStudentQuery("");
      setShowDropdown(false);
    }
  }, [
    isCreateOpen,
    reset,
    setInputValue,
    setSelectedStudent,
    setStudentQuery,
    setShowDropdown,
  ]);

  // Show/hide dropdown
  useEffect(() => {
    setShowDropdown(!!(studentQuery && students.length));
  }, [studentQuery, students]);

  // Click outside to close dropdown
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Selected institution for dependent programs
  const [selectedInstitution, setSelectedInstitution] = useState<number | null>(
    null
  );
  const { programs } = useGetProgramsByInstitution(selectedInstitution || 0);

  useEffect(() => {
  if (reportCycles.length === 0) {
    // aún no llegaron los ciclos, o no hay ninguno
    setValue("cycle_id", 0);
    setCycleOpen(false);
    return;
  }

  const today = new Date();
  const current = reportCycles.find(({ start_date, end_date }) => {
    return today >= new Date(start_date) && today <= new Date(end_date);
  });

  if (current) {
    setValue("cycle_id", current.cycle_id, { shouldValidate: true });
    setCycleOpen(true);
  } else {
    setValue("cycle_id", 0);
    setCycleOpen(false);
  }
}, [reportCycles, setValue]);

  const onSubmit = async (data: FormValues) => {
    // si no hay ciclo abierto, avisamos y salimos
    if (!cycleOpen) {
      toastWarning({
        id: 200,
        title: "Proceso cerrado",
        message: "No ha abierto el proceso aún",
      });
      return;
    }

    const exists = requests.find((r) => r.student_id === user?.user_id);
    if (exists) {
      toastError({
        id: 188,
        title: "Error",
        message: "Este alumno ya tiene una solicitud registrada",
      });
      // … limpia form
      return;
    }

    try {
      await handleCreate({ ...data, student_id: user?.user_id ||0,});
      toastSuccess({
        id: 140,
        title: "¡Éxito!",
        message: "Solicitud creada correctamente",
      });
      // … limpia y cierra
    } catch {
      toastError({
        id: 151,
        title: "Error",
        message: "No se pudo crear la solicitud",
      });
    }
  };

  if (!isCreateOpen) return null;

  return (
    <ModalContainer visible onClose={closeCreate}>
      <div className="flex flex-col gap-6 md:px-6">
        <h2 className="text-2xl font-bold text-primary text-center">
          Agregar Solicitud
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 relative">
          <FormInput
            name="student_id"
            label="Estudiante"
            placeholder={user?.name}
            disabled={true}
          />

          {/* Institución */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="institution_id"
              className="font-semibold text-xs md:text-sm"
            >
              Institución
            </label>
            <select
              id="institution_id"
              {...register("institution_id", {
                required: "Institución obligatoria",
                valueAsNumber: true,
              })}
              onChange={(e) => setSelectedInstitution(Number(e.target.value))}
              className={`border-b border-gray-300 focus:outline-none focus:border-secondary text-xs md:text-sm py-1 ${
                errors.institution_id ? "border-red-500" : ""
              }`}
            >
              <option value="">— Selecciona —</option>
              {institutions.map((inst) => (
                <option key={inst.institution_id} value={inst.institution_id}>
                  {inst.institution_name}
                </option>
              ))}
            </select>
            {errors.institution_id && (
              <p className="text-red-500 !text-xs mt-1">
                {errors.institution_id.message}
              </p>
            )}
          </div>

          {/* Programa */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="program_id"
              className="font-semibold text-xs md:text-sm"
            >
              Programa
            </label>
            <select
              id="program_id"
              {...register("program_id", {
                required: "Programa obligatorio",
                valueAsNumber: true,
              })}
              disabled={!selectedInstitution}
              className={`border-b border-gray-300 focus:outline-none focus:border-secondary text-xs md:text-sm py-1 ${
                errors.program_id ? "border-red-500" : ""
              }`}
            >
              <option value="">— Selecciona —</option>
              {programs.map((prog) => (
                <option key={prog.program_id} value={prog.program_id}>
                  {prog.program_name}
                </option>
              ))}
            </select>
            {errors.program_id && (
              <p className="text-red-500 !text-xs mt-1">
                {errors.program_id.message}
              </p>
            )}
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={closeCreate} className="cancel">
              Cancelar
            </button>
            <button type="submit" className="create"  disabled={!cycleOpen}>
              Guardar
            </button>
          </div>
        </form>
      </div>
    </ModalContainer>
  );
};

export default CreateRequestModal;
