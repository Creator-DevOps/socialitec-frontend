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

interface FormValues {
  control_number: string;
  student_id: number;
  institution_id: number;
  program_id: number;
  acceptance_status: number;
  progress_status: number;
  completed_hours: number;
  feedback: string;
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
};

const CreateRequestModal: React.FC = () => {
  const { isCreateOpen, closeCreate, handleCreate } = useRequests();
  const { institutions } = useGetAllInstitutions();
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
  } = useForm<FormValues>({ defaultValues });

  const watchAcceptance = watch("acceptance_status");
  const watchCompleted = watch("completed_hours");

  const {
    students,
    query: studentQuery,
    setQuery: setStudentQuery,
  } = useGetStudents(1, 10);
  const [selectedStudent, setSelectedStudent] = useState<(typeof students)[0] | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout>();
  const dropdownRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);


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
  }, [isCreateOpen, reset, setInputValue, setSelectedStudent, setStudentQuery, setShowDropdown]);

  // Debounce student search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setStudentQuery(inputValue.trim()), 300);
    return () => clearTimeout(debounceRef.current);
  }, [inputValue, setStudentQuery]);

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

  const onSelectStudent = (stu: (typeof students)[0]) => {
    setValue("student_id", stu.user_id);
    setValue("control_number", stu.control_number);
    setInputValue(stu.control_number);
    setSelectedStudent(stu);
    setShowDropdown(false);
  };

  // Selected institution for dependent programs
  const [selectedInstitution, setSelectedInstitution] = useState<number | null>(null);
  const { programs } = useGetProgramsByInstitution(selectedInstitution || 0);

  // Field-level validation side-effects
  useEffect(() => {
    // completed_hours ≥ 0 and only >0 if accepted
    if (watchCompleted < 0) {
      setError("completed_hours", { type: "min", message: "No puede ser negativo" });
    } else if ((watchAcceptance === 0 || watchAcceptance === 2) && watchCompleted > 0) {
      setError("completed_hours", { type: "invalid", message: "Si no está aceptado, horas debe ser 0" });
    } else {
      clearErrors("completed_hours");
    }
    // progress_status only if accepted; final only at 480h
    const prog = watch("progress_status");
    if (watchAcceptance !== 1 && prog > 0) {
      setError("progress_status", { type: "invalid", message: "Progreso solo si está aceptada" });
    } else if (prog === 2 && watchCompleted !== 480) {
      setError("progress_status", { type: "invalid", message: "Para finalizar horas deben ser 480" });
    } else {
      clearErrors("progress_status");
    }
  }, [watchAcceptance, watchCompleted, watch, setError, clearErrors]);

  const onSubmit = async (data: FormValues) => {
    if (!selectedStudent) {
      toastError({ id: 7, title: "Error", message: "Selecciona un alumno válido" });
      return;
    }
    
    if (selectedStudent.credits < 180) {
      toastWarning({ id: 8, title: "¡Advertencia!", message: "El alumno no cumple 180 créditos" });
      return;
    }
    const exists = requests.find(r => r.student_id === selectedStudent.user_id);
    if (exists) {
      toastError({ id: 8, title: "Error", message: "Este alumno ya tiene una solicitud registrada" });
      reset(defaultValues);
      setInputValue("");
      setSelectedStudent(null);
      setStudentQuery("");
      setShowDropdown(false);
      return;
    }
    try {
      await handleCreate({ ...data, coordinator_id: user?.user_id || 0 });
      toastSuccess({ id: 10, title: "¡Éxito!", message: "Solicitud creada correctamente" });
      // Limpia para una posible nueva creación
      reset(defaultValues);
      setInputValue("");
      setSelectedStudent(null);
      setStudentQuery("");
      setShowDropdown(false);
      closeCreate();
    } catch {
      toastError({ id: 11, title: "Error", message: "No se pudo crear la solicitud" });
    }
  };

  if (!isCreateOpen) return null;

  return (
    <ModalContainer visible onClose={closeCreate}>
      <div className="flex flex-col gap-6 md:px-6">
        <h2 className="text-2xl font-bold text-primary text-center">Agregar Solicitud</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 relative">
          {/* Autocomplete alumno */}
          <div className="relative flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="Buscar alumno por control"
              className="w-full border-b border-secondary h-8 px-2 text-xs md:text-sm focus:outline-none"
            />
            {inputValue ? (
              <IconButton onClick={() => { setInputValue(""); setStudentQuery(""); setValue("student_id", 0); }}>
                <img src={XLogo} alt="Limpiar" className="w-4 h-4" />
              </IconButton>
            ) : (
              <IconButton>
                <img src={SearchLogo} alt="Buscar" className="w-4 h-4" />
              </IconButton>
            )}
            {showDropdown && (
              <ul
                ref={dropdownRef}
                className="absolute z-10 w-60 md:w-80 bg-white border rounded-lg border-gray-200 mt-1 max-h-48 overflow-auto"
              >
                {students.map(stu => (
                  <li
                    key={stu.user_id}
                    className="px-2 py-1 hover:bg-gray-50 cursor-pointer text-xs md:text-sm"
                    onClick={() => onSelectStudent(stu)}
                  >
                    {stu.control_number} – {stu.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <input type="hidden" {...register("student_id", { required: "Selecciona un alumno válido", valueAsNumber: true })} />

          {/* Institución */}
          <div className="flex flex-col gap-1">
            <label htmlFor="institution_id" className="font-semibold text-xs md:text-sm">Institución</label>
            <select
              id="institution_id"
              {...register("institution_id", { required: "Institución obligatoria", valueAsNumber: true })}
              onChange={e => setSelectedInstitution(Number(e.target.value))}
              className={`border-b border-gray-300 focus:outline-none focus:border-secondary text-xs md:text-sm py-1 ${errors.institution_id ? "border-red-500" : ""}`}
            >
              <option value="">— Selecciona —</option>
              {institutions.map(inst => (
                <option key={inst.institution_id} value={inst.institution_id}>
                  {inst.institution_name}
                </option>
              ))}
            </select>
            {errors.institution_id && <p className="text-red-500 !text-xs mt-1">{errors.institution_id.message}</p>}
          </div>

          {/* Programa */}
          <div className="flex flex-col gap-1">
            <label htmlFor="program_id" className="font-semibold text-xs md:text-sm">Programa</label>
            <select
              id="program_id"
              {...register("program_id", { required: "Programa obligatorio", valueAsNumber: true })}
              disabled={!selectedInstitution}
              className={`border-b border-gray-300 focus:outline-none focus:border-secondary text-xs md:text-sm py-1 ${errors.program_id ? "border-red-500" : ""}`}
            >
              <option value="">— Selecciona —</option>
              {programs.map(prog => (
                <option key={prog.program_id} value={prog.program_id}>
                  {prog.program_name}
                </option>
              ))}
            </select>
            {errors.program_id && <p className="text-red-500 !text-xs mt-1">{errors.program_id.message}</p>}
          </div>

          {/* Horas Completadas */}
          <FormInput
            name="completed_hours"
            label="Horas Completadas"
            placeholder="0"
            type="number"
            register={register}
            errors={errors}
            rules={{ valueAsNumber: true, min: { value: 0, message: "No puede ser negativo" } }}
          />

          {/* Feedback */}
          <FormInput name="feedback" label="Feedback" placeholder="Comentarios (opcional)" register={register} errors={errors} />

          {/* Estado de Aceptación */}
          <div className="flex flex-col gap-1">
            <label htmlFor="acceptance_status" className="font-semibold text-xs md:text-sm">Estado de Aceptación</label>
            <select
              id="acceptance_status"
              {...register("acceptance_status", { valueAsNumber: true })}
              className="border-b border-gray-300 focus:outline-none focus:border-secondary text-xs md:text-sm py-1"
            >
              <option value={0}>Pendiente</option>
              <option value={1} disabled={!(selectedStudent && selectedStudent.credits >= 180)}>Aceptada</option>
              <option value={2}>Rechazada</option>
            </select>
          </div>

          {/* Estado de Progreso */}
          <div className="flex flex-col gap-1">
            <label htmlFor="progress_status" className="font-semibold text-xs md:text-sm">Estado de Progreso</label>
            <select
              id="progress_status"
              {...register("progress_status", { valueAsNumber: true })}
              className="border-b border-gray-300 focus:outline-none focus:border-secondary text-xs md:text-sm py-1"
            >
              <option value={0}>Pendiente</option>
              <option value={1} disabled={watchAcceptance !== 1}>En proceso</option>
              <option value={2} disabled={watchCompleted !== 480}>Finalizada</option>
            </select>
            {errors.progress_status && <p className="text-red-500 !text-xs mt-1">{errors.progress_status.message}</p>}
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={closeCreate} className="cancel">Cancelar</button>
            <button type="submit" className="create">Guardar</button>
          </div>
        </form>
      </div>
    </ModalContainer>
  );
};

export default CreateRequestModal;
