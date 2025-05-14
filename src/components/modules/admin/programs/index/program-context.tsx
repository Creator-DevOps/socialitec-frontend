import React, { createContext, useContext, useState, ReactNode } from "react";
import { Program } from "@lib/api/models/program";
import { useGetPrograms } from "@lib/api/api-hooks/programs/use-get-programs";
import { useCreateProgram } from "@lib/api/api-hooks/programs/use-create-program";
import { useUpdateProgram } from "@lib/api/api-hooks/programs/use-update-program";
import { useDeleteProgram } from "@lib/api/api-hooks/programs/use-delete-program";
import { useToast } from "@/lib/hooks/use-toast";

interface CreateInput {
  institution_id: number;
  program_name: string;
  description: string;
  activities: string;
  supervisor_name: string;
  supervisor_phone: string;
  supervisor_email: string;
}
interface UpdateInput {
  institution_id?: number;
  program_name?: string;
  description?: string;
  activities?: string;
  supervisor_name?: string;
  supervisor_phone?: string;
  supervisor_email?: string;
}

interface ContextValue {
  programs: Program[];
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
  selected: Program | null;
  openEdit: (p: Program) => void;
  closeEdit: () => void;
  handleUpdate: (data: UpdateInput) => Promise<void>;

  isDeleteOpen: boolean;
  openDelete: (p: Program) => void;
  closeDelete: () => void;
  handleDelete: () => Promise<void>;

  isShowOpen: boolean;
  openShow: (p: Program) => void;
  closeShow: () => void;
}

const ProgramsContext = createContext<ContextValue | null>(null);
export const usePrograms = () => {
  const ctx = useContext(ProgramsContext);
  if (!ctx) throw new Error("usePrograms must be inside ProgramsProvider");
  return ctx;
};

export const ProgramsProvider = ({ children }: { children: ReactNode }) => {
  const {
    programs,
    loading,
    totalPages,
    currentPage,
    setPage,
    query,
    setQuery,
    refetch,
  } = useGetPrograms(1, 10);
  
  const { createProgram } = useCreateProgram();
  const { updateProgram } = useUpdateProgram();
  const { deleteProgram } = useDeleteProgram();
  const { toastSuccess, toastError, toastWarning } = useToast();

  const [isCreateOpen, setCreateOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isShowOpen, setShowOpen] = useState(false);
  const [selected, setSelected] = useState<Program | null>(null);

  const openCreate = () => setCreateOpen(true);
  const closeCreate = () => setCreateOpen(false);

  const handleCreate = async (data: CreateInput) => {
    try {
      await createProgram({
        institution_id: data.institution_id,
        program_name: data.program_name,
        description: data.description,
        activities: data.activities,
        supervisor_name: data.supervisor_name,
        supervisor_email: data.supervisor_email.toLowerCase(),
        supervisor_phone: data.supervisor_phone,
      });
      await refetch();
      toastSuccess({
        id: 2,
        title: "¡Éxito!",
        message: "Programa creado correctamente",
      });
      closeCreate();
    } catch {
      toastError({
        id: 3,
        title: "Error",
        message: "Error al crear programa",
      });
    }
  };

  const openEdit = (p: Program) => {
    setSelected(p);
    setEditOpen(true);
  };
  const closeEdit = () => {
    setSelected(null);
    setEditOpen(false);
  };

  const handleUpdate = async (data: UpdateInput) => {
    if (!selected) return;
    try {
      await updateProgram(selected.program_id, {
        ...(data.institution_id !== undefined && {
          institution_id: data.institution_id,
        }),
        ...(data.program_name !== undefined && {
          program_name: data.program_name,
        }),
        ...(data.description !== undefined && {
          description: data.description,
        }),
        ...(data.activities !== undefined && {
          activities: data.activities,
        }),
        ...(data.supervisor_name !== undefined && {
         supervisor_name: data.supervisor_name,
        }),
        ...(data.supervisor_email !== undefined && {
          supervisor_email: data.supervisor_email,
        }),
        ...(data.supervisor_phone !== undefined && {
          supervisor_phone: data.supervisor_phone,
        })       
      });
      await refetch();
      toastSuccess({
        id: 5,
        title: "¡Éxito!",
        message: "Programa actualizado correctamente",
      });
      closeEdit();
    } catch {
      toastError({
        id: 6,
        title: "Error",
        message: "Error al actualizar programa",
      });
    }
  };

  const openDelete = (p: Program) => {
    setSelected(p);
    setDeleteOpen(true);
  };
  const closeDelete = () => {
    setSelected(null);
    setDeleteOpen(false);
  };

  const handleDelete = async () => {
    if (!selected) return;
    try {
      await deleteProgram(selected.program_id);
      await refetch();
      toastSuccess({
        id: 7,
        title: "¡Éxito!",
        message: "Programa eliminado correctamente",
      });
      closeDelete();
    } catch {
      toastError({
        id: 8,
        title: "Error",
        message: "Error al eliminar programa",
      });
    }
  };

  const openShow = (p: Program) => {
    setSelected(p);
    setShowOpen(true);
  };
  const closeShow = () => {
    setSelected(null);
    setShowOpen(false);
  };


  return (
    <ProgramsContext.Provider
      value={{
        programs,
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
    </ProgramsContext.Provider>
  );
};
