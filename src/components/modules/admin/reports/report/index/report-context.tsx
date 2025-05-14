import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Report } from "@lib/api/models/report";
import { useGetReports } from "@lib/api/api-hooks/reports/use-get-reports";
import { useCreateReport } from "@lib/api/api-hooks/reports/use-create-report";
import { useUpdateReport } from "@lib/api/api-hooks/reports/use-update-report";
import { useDeleteReport } from "@lib/api/api-hooks/reports/use-delete-report";
import { useDownloadReport } from "@lib/api/api-hooks/reports/use-download-report";
import { useToast } from "@/lib/hooks/use-toast";
import { useLocation, useParams } from "react-router-dom";
import { useGetReportsItem } from "@/lib/api/api-hooks/reports/use-get-reports-by-item";

interface CreateInput {
  item_id:number;
  document_name: string;
  feedback?: string;
  coordinator_id: number;
  request_id: number;
  report_number: number;
  status: number;
  file: File | null;
}
interface UpdateInput {
  item_id?:number;
  document_name?: string;
  feedback?: string;
  coordinator_id?: number;
  request_id?: number;
  report_number?: number;
  status?: number;
  file?: File | null;
}

interface ContextValue {
  reportsCycleItem: Report[];
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
  selected: Report | null;
  openEdit: (i: Report) => void;
  closeEdit: () => void;
  handleUpdate: (data: UpdateInput) => Promise<void>;

  isDeleteOpen: boolean;
  openDelete: (i: Report) => void;
  closeDelete: () => void;
  handleDelete: () => Promise<void>;

  isShowOpen: boolean;
  openShow: (i: Report) => void;
  closeShow: () => void;

  onDownload: (id: number) => void;
}

const ReportsContext = createContext<ContextValue | null>(null);
export const useReports = () => {
  const ctx = useContext(ReportsContext);
  if (!ctx) throw new Error("useReports must be inside ReportsProvider");
  return ctx;
};

export const ReportsProvider = ({ children }: { children: ReactNode }) => {
  const { id, cycleId, itemId } = useParams<{
    id: string;
    cycleId: string;
    itemId?: string;
  }>();
  const location = useLocation();
  const {
    reportsCycleItem,
    loading,
    totalPages,
    currentPage,
    setPage,
    query,
    setQuery,
    refetch,
  } = useGetReportsItem(Number(cycleId),Number(itemId),1, 10);

  const { createReport } = useCreateReport();
  const { updateReport } = useUpdateReport();
  const { deleteReport } = useDeleteReport();
  const { downloadReport } = useDownloadReport();
  const { toastSuccess, toastError } = useToast();

  const [isCreateOpen, setCreateOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isShowOpen, setShowOpen] = useState(false);
  const [selected, setSelected] = useState<Report | null>(null);

  // Create
  const openCreate = () => setCreateOpen(true);
  const closeCreate = () => setCreateOpen(false);
  const handleCreate = async (data: CreateInput) => {
    try {
      await createReport({
        item_id:data.item_id,
        document_name: data.document_name,
        feedback: data.feedback??"",
        coordinator_id: data.coordinator_id,
        request_id: data.request_id,
        report_number: data.report_number,
        status: data.status,
        file: data.file,
      });
      await refetch();
      toastSuccess({ id: 100, title: "¡Éxito!", message: "Reporte creado correctamente" });
      closeCreate();
    } catch (e: any) {
      toastError({ id: 110, title: "Error", message: e.message || "Error al crear reporte" });
    }
  };
   useEffect(() => {
    
    // opcional: resetear page/query
    setPage(1);
    setQuery("");
    refetch();
  }, []);

  // Update
  const openEdit = (i: Report) => {
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
      await updateReport(selected.document_id, {
        ...(data.document_name   !== undefined && { document_name: data.document_name }),
        ...(data.item_id  !== undefined && { item_id: data.item_id}),
        ...(data.feedback        !== undefined && { feedback: data.feedback }),
        ...(data.coordinator_id  !== undefined && { coordinator_id: data.coordinator_id }),
        ...(data.request_id      !== undefined && { request_id: data.request_id }),
        ...(data.report_number   !== undefined && { report_number: data.report_number }),
        ...(data.status          !== undefined && { status: data.status }),
        ...(data.file            !== undefined && { file: data.file }),
      });
      await refetch();
      toastSuccess({ id: 115, title: "¡Éxito!", message: "Reporte actualizado correctamente" });
      closeEdit();
    } catch (e: any) {
      toastError({ id: 120, title: "Error", message: e.message || "Error al actualizar reporte" });
    }
  };

  // Delete
  const openDelete = (i: Report) => {
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
      await deleteReport(selected.document_id);
      await refetch();
      toastSuccess({ id: 129, title: "¡Éxito!", message: "Reporte eliminado correctamente" });
      closeDelete();
    } catch (e: any) {
      toastError({ id: 125, title: "Error", message: e.message || "Error al eliminar reporte" });
    }
  };

  // Show modal
  const openShow = (i: Report) => {
    setSelected(i);
    setShowOpen(true);
  };
  const closeShow = () => {
    setSelected(null);
    setShowOpen(false);
  };

  // Download
  const onDownload = (id: number) => {
    downloadReport(id);
  };

  return (
    <ReportsContext.Provider
      value={{
        reportsCycleItem,
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
        onDownload,
      }}
    >
      {children}
    </ReportsContext.Provider>
  );
};
