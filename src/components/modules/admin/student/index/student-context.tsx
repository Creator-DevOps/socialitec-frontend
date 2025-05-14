import React, { createContext, useContext, useState, ReactNode } from "react";
import { Student } from "@lib/api/models/student";
import { useGetStudents } from "@/lib/api/api-hooks/students/use-get-students";
import { useCreateStudent } from "@lib/api/api-hooks/students/use-create-student";
import { useUpdateStudent } from "@lib/api/api-hooks/students/use-update-student";
import { useDeleteStudent } from "@lib/api/api-hooks/students/use-delete-student";
import { useToast } from "@/lib/hooks/use-toast";

interface CreateInput {
  name: string;
  email: string;
  control_number: string;
  major: string;
  semester: number;
  credits: number;
  password: string;
  confirmPassword: string;
}
interface UpdateInput {
  name?: string;
  email?: string;
  control_number?: string;
  major?: string;
  semester?: number;
  credits?: number;
  password?: string;
  confirmPassword?: string;
}

interface ContextValue {
  students: Student[];
  loading: boolean;
  totalPages: number;
  currentPage: number;
  query: string;
  setPage: (p: number) => void;
  setQuery: (q: string) => void;
  refetch: () => Promise<void>;

  isCreateOpen: boolean;
  openCreate: () => void;
  closeCreate: () => void;
  handleCreate: (data: CreateInput) => Promise<void>;

  isEditOpen: boolean;
  selected: Student | null;
  openEdit: (s: Student) => void;
  closeEdit: () => void;
  handleUpdate: (data: UpdateInput) => Promise<void>;

  isDeleteOpen: boolean;
  openDelete: (s: Student) => void;
  closeDelete: () => void;
  handleDelete: () => Promise<void>;

  isShowOpen: boolean;
  openShow: (s: Student) => void;
  closeShow: () => void;
}

const StudentsContext = createContext<ContextValue | null>(null);
export const useStudents = () => {
  const ctx = useContext(StudentsContext);
  if (!ctx) throw new Error("useStudents must be inside StudentsProvider");
  return ctx;
};

export const StudentsProvider = ({ children }: { children: ReactNode }) => {
  const {
    students,
    loading,
    totalPages,
    currentPage,
    setPage,
    query,
    setQuery,
    refetch,
  } = useGetStudents(1, 10);
  const { createStudent } = useCreateStudent();
  const { updateStudent } = useUpdateStudent();
  const { deleteStudent } = useDeleteStudent();
  const { toastSuccess, toastError, toastWarning } = useToast();

  const [isCreateOpen, setCreateOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isShowOpen, setShowOpen] = useState(false);
  const [selected, setSelected] = useState<Student | null>(null);

  const openCreate = () => setCreateOpen(true);
  const closeCreate = () => setCreateOpen(false);

  const handleCreate = async (data: CreateInput) => {
    if (data.password !== data.confirmPassword) {
      toastWarning({
        id: 1,
        title: "Aviso",
        message: "Contraseñas no coinciden",
      });
      return;
    }
    try {
      await createStudent({
        name: data.name,
        email: data.email.toLowerCase(),
        control_number: data.control_number,
        major: data.major,
        semester: data.semester,
        credits: data.credits,
        password: data.password,
      });
      await refetch();
      toastSuccess({
        id: 2,
        title: "¡Éxito!",
        message: "Estudiante creado correctamente",
      });
      closeCreate();
    } catch {
      toastError({
        id: 3,
        title: "Error",
        message: "Error al crear estudiante",
      });
    }
  };

  const openEdit = (s: Student) => {
    setSelected(s);
    setEditOpen(true);
  };
  const closeEdit = () => {
    setSelected(null);
    setEditOpen(false);
  };

  const handleUpdate = async (data: UpdateInput) => {
    if (data.password && data.password !== data.confirmPassword) {
      toastWarning({
        id: 4,
        title: "Aviso",
        message: "Contraseñas no coinciden",
      });
      return;
    }
    if (!selected) return;
    try {
      await updateStudent(selected.user_id, {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.email !== undefined && { email: data.email.toLowerCase() }),
        ...(data.control_number !== undefined && {
          control_number: data.control_number,
        }),
        ...(data.major !== undefined && { major: data.major }),
        ...(data.semester !== undefined && { semester: data.semester }),
        ...(data.credits !== undefined && { credits: data.credits }),
        ...(data.password && { password: data.password }),
      });
      await refetch();
      toastSuccess({
        id: 5,
        title: "¡Éxito!",
        message: "Estudiante actualizado correctamente",
      });
      closeEdit();
    } catch {
      toastError({
        id: 6,
        title: "Error",
        message: "Error al actualizar estudiante",
      });
    }
  };

  const openDelete = (s: Student) => {
    setSelected(s);
    setDeleteOpen(true);
  };
  const closeDelete = () => {
    setSelected(null);
    setDeleteOpen(false);
  };

  const handleDelete = async () => {
    if (!selected) return;
    try {
      await deleteStudent(selected.user_id);
      await refetch();
      toastSuccess({
        id: 7,
        title: "¡Éxito!",
        message: "Estudiante eliminado correctamente",
      });
      closeDelete();
    } catch {
      toastError({
        id: 8,
        title: "Error",
        message: "Error al eliminar estudiante",
      });
    }
  };
  const openShow = (s: Student) => { setSelected(s); setShowOpen(true); };
  const closeShow = () => { setSelected(null); setShowOpen(false); };
  return (
    <StudentsContext.Provider
      value={{
        students,
        loading,
        totalPages,
        currentPage,
        query,
        setPage,
        setQuery,
        refetch,
        isCreateOpen,
        openCreate,
        closeCreate,
        handleCreate,
        isEditOpen,
        selected,
        openEdit,
        closeEdit,
        handleUpdate,
        isDeleteOpen,
        openDelete,
        closeDelete,
        handleDelete,
        isShowOpen,
        openShow,
        closeShow,
      }}
    >
      {children}
    </StudentsContext.Provider>
  );
};
