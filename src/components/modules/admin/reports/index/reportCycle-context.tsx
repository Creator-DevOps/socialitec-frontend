import React, { createContext, useContext, useState, ReactNode } from "react";
import { ReportCycle } from "@/lib/api/models/report-cycle";
import { useGetReportCycles } from "@/lib/api/api-hooks/reports/cycles/use-get-cycles";
import { useCreateReportCycle } from "@/lib/api/api-hooks/reports/cycles/use-create-cycle";
import { useUpdateReportCycle } from "@/lib/api/api-hooks/reports/cycles/use-update-cycle";
import { useDeleteReportCycle } from "@/lib/api/api-hooks/reports/cycles/use-delete-cycle";
import { useToast } from "@/lib/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/authContext";

interface CreateInput {
  name: string;
  folder_name: string;
  start_date: string; // ISO date, e.g. "2025-01-15"
  end_date: string;
}
interface UpdateInput {
  name?: string;
  folder_name?: string;
  start_date?: string; // ISO date, e.g. "2025-01-15"
  end_date?: string;
}

interface ContextValue {
  reportCycles: ReportCycle[];
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
  selected: ReportCycle | null;
  openEdit: (i: ReportCycle) => void;
  closeEdit: () => void;
  handleUpdate: (data: UpdateInput) => Promise<void>;

  isDeleteOpen: boolean;
  openDelete: (i: ReportCycle) => void;
  closeDelete: () => void;
  handleDelete: () => Promise<void>;

  isShowOpen: boolean;
  openShow: (i: ReportCycle) => void;
  closeShow: () => void;
}

const ReportCyclesContext = createContext<ContextValue | null>(null);
export const useReportCycles = () => {
  const ctx = useContext(ReportCyclesContext);
  if (!ctx)
    throw new Error("useReportCycles must be inside ReportCyclesProvider");
  return ctx;
};

export const ReportCyclesProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const {user}= useAuth();
  const userId = user?.user_id;
  const {
    reportCycles,
    loading,
    totalPages,
    currentPage,
    setPage,
    query,
    setQuery,
    refetch,
  } = useGetReportCycles(1, 20);

  const { createReportCycle } = useCreateReportCycle();
  const { updateReportCycle } = useUpdateReportCycle();
  const { deleteReportCycle } = useDeleteReportCycle();
  const { toastSuccess, toastError } = useToast();

  const [isCreateOpen, setCreateOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isShowOpen, setShowOpen] = useState(false);
  const [selected, setSelected] = useState<ReportCycle | null>(null);

  // Create
  const openCreate = () => setCreateOpen(true);
  const closeCreate = () => setCreateOpen(false);
  const handleCreate = async (data: CreateInput) => {
    try {
      await createReportCycle({
        name: data.name,
        folder_name: data.folder_name,
        start_date: data.start_date,
        end_date: data.end_date,
      });
      await refetch();
      toastSuccess({
        id: 2,
        title: "¡Éxito!",
        message: "Ciclo creado correctamente",
      });
      closeCreate();
    } catch (e: any) {
      toastError({
        id: 3,
        title: "Error",
        message: e.message || "Error al crear ciclo",
      });
    }
  };

  // Update
  const openEdit = (i: ReportCycle) => {
    setSelected(i);
    setEditOpen(true);
  };
  const closeEdit = () => {
    setSelected(null);
    setEditOpen(false);
  };
  const handleUpdate = async (data: UpdateInput) => {
    if (!selected) return;
    try {
      await updateReportCycle(selected.cycle_id, {
        ...(data.name !== undefined && {
          name: data.name,
        }),
        ...(data.folder_name !== undefined && {
          folder_name: data.folder_name,
        }),
        ...(data.start_date !== undefined && {
          start_date: data.start_date,
        }),
        ...(data.end_date !== undefined && {
          end_date: data.end_date,
        }),
      });
      await refetch();
      toastSuccess({
        id: 5,
        title: "¡Éxito!",
        message: "Ciclo actualizado correctamente",
      });
      closeEdit();
    } catch (e: any) {
      toastError({
        id: 6,
        title: "Error",
        message: e.message || "Error al actualizar ciclo",
      });
    }
  };

  // Delete
  const openDelete = (i: ReportCycle) => {
    setSelected(i);
    setDeleteOpen(true);
  };
  const closeDelete = () => {
    setSelected(null);
    setDeleteOpen(false);
  };
  const handleDelete = async () => {
    if (!selected) return;
    try {
      await deleteReportCycle(selected.cycle_id);
      await refetch();
      toastSuccess({
        id: 7,
        title: "¡Éxito!",
        message: "Ciclo eliminado correctamente",
      });
      closeDelete();
    } catch (e: any) {
      toastError({
        id: 8,
        title: "Error",
        message: e.message || "Error al eliminar ciclo",
      });
    }
  };

  // Show modal
  const openShow = (i: ReportCycle) => {
    setSelected(i);
    navigate(`/admin/${userId}/cycles/${i.cycle_id}/reports`)
    
  };
  const closeShow = () => {
    setSelected(null);
    setShowOpen(false);
  };

  return (
    <ReportCyclesContext.Provider
      value={{
        reportCycles,
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
    </ReportCyclesContext.Provider>
  );
};
