import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { ReportCycleItem } from "@/lib/api/models/report-cycle-item";
import { ReportCycle } from "@/lib/api/models/report-cycle";

import { useGetReportCycleItems } from "@/lib/api/api-hooks/reports/cycle-report/use-get-report-cycles";
import { useCreateReportCycleItem } from "@/lib/api/api-hooks/reports/cycle-report/use-create-report-cycle";
import { useUpdateReportCycleItem } from "@/lib/api/api-hooks/reports/cycle-report/use-update-report-cycle";
import { useDeleteReportCycleItem } from "@/lib/api/api-hooks/reports/cycle-report/use-delete-report-cycle";
import { useToast } from "@/lib/hooks/use-toast";
import { useReportCycles } from "../../index/reportCycle-context";
import { useGetReportCycle } from "@/lib/api/api-hooks/reports/cycles/use-get-cycle";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAllReportCycles } from "@/lib/api/api-hooks/reports/cycles/use-get-all-cycles";

interface CreateInput {
  cycle_id: number;
  report_number: number;
  title: string;
  start_date: string;   // ISO date
  end_date: string; 
}
interface UpdateInput {
  cycle_id?: number;
  report_number?: number;
  title?: string;
  start_date?: string;   // ISO date
  end_date?: string; 
}

interface ContextValue {
  reportCycleItems: ReportCycleItem[];
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
  selected: ReportCycleItem | null;
  selectedCycle: ReportCycle | null;
  loadingCycle: boolean;
  cycleError: string | null;
  
  openEdit: (i: ReportCycleItem) => void;
  closeEdit: () => void;
  handleUpdate: (data: UpdateInput) => Promise<void>;

  isDeleteOpen: boolean;
  openDelete: (i: ReportCycleItem) => void;
  closeDelete: () => void;
  handleDelete: () => Promise<void>;

  isShowOpen: boolean;
  openShow: (i: ReportCycleItem) => void;
  closeShow: () => void;
}

const ReportCycleItemsContext = createContext<ContextValue | null>(null);
export const useReportCycleItems = () => {
  const ctx = useContext(ReportCycleItemsContext);
  if (!ctx)
    throw new Error("useReportCycleItems must be inside ReportCycleItemsProvider");
  return ctx;
};


export const ReportCycleItemsProvider = ({ children }: { children: ReactNode }) => {
  const { cycleId } = useParams<{cycleId:string}>();
 const cycle_id = Number(cycleId);
 const {
  reportCycle,        
  loading: loadingCycle,
  error:   cycleError,
  refetch: refetchCycle
} = useGetReportCycle(cycle_id);

  const {
    reportCycleItems,
    loading,
    totalPages,
    currentPage,
    setPage,
    query,
    setQuery,
    refetch,
  } = useGetReportCycleItems(cycle_id,1, 20);

  const { createReportCycleItem } = useCreateReportCycleItem();
  const { updateReportCycleItem } = useUpdateReportCycleItem();
  const { deleteReportCycleItem } = useDeleteReportCycleItem();
  const { toastSuccess, toastError } = useToast();

  const [isCreateOpen, setCreateOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isShowOpen, setShowOpen] = useState(false);
  const [selected, setselected] = useState<ReportCycleItem | null>(null);


  // Create
  const openCreate = () => setCreateOpen(true);
  const closeCreate = () => setCreateOpen(false);
  const handleCreate = async (data: CreateInput) => {
    try {
      await createReportCycleItem({
        title: data.title,
        cycle_id:data.cycle_id,
        report_number:data.report_number,
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
  const openEdit = (i: ReportCycleItem) => {
    setselected(i);
    setEditOpen(true);
  };
  const closeEdit = () => {
    setselected(null);
    setEditOpen(false);
  };
  const handleUpdate = async (data: UpdateInput) => {
    if (!selected) return;
    try {
      await updateReportCycleItem(selected.item_id, {
        ...(data.title !== undefined && {
          title: data.title,
        }),
        ...(data.cycle_id !== undefined && {
         cycle_id: data.cycle_id,
        }),
        ...(data.report_number !== undefined && {
          report_number: data.report_number,
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
  const openDelete = (i: ReportCycleItem) => {
    setselected(i);
    setDeleteOpen(true);
  };
  const closeDelete = () => {
    setselected(null);
    setDeleteOpen(false);
  };
  const handleDelete = async () => {
    if (!selected) return;
    try {
      await deleteReportCycleItem(selected.cycle_id, selected.item_id);
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
  const openShow = (i: ReportCycleItem) => {
    setselected(i);
    setShowOpen(true);
  };
  const closeShow = () => {
    setselected(null);
    setShowOpen(false);
  };

  return (
    <ReportCycleItemsContext.Provider
      value={{
        reportCycleItems,
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
        selectedCycle: reportCycle,
        loadingCycle,
        cycleError,
      }}
    >
      {children}
    </ReportCycleItemsContext.Provider>
  );
};
