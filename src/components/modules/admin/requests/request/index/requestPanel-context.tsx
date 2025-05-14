import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Report } from "@lib/api/models/report";
import { Request } from "@/lib/api/models/request";
import { useGetRequest } from "@/lib/api/api-hooks/requests/use-get-request";
import { useGetReportsByRequest } from "@lib/api/api-hooks/reports/use-get-reports-by-request";

import { useCreateReport } from "@lib/api/api-hooks/reports/use-create-report";
import { useUpdateReport } from "@lib/api/api-hooks/reports/use-update-report";
import { useDeleteReport } from "@lib/api/api-hooks/reports/use-delete-report";
import { useDownloadReport } from "@lib/api/api-hooks/reports/use-download-report";
import { useToast } from "@/lib/hooks/use-toast";
import { useLocation, useParams } from "react-router-dom";
import { useGetReportsItem } from "@/lib/api/api-hooks/reports/use-get-reports-by-item";
import { useUpdateRequest } from "@/lib/api/api-hooks/requests/use-update-request";

interface UpdateInput {
  item_id?: number;
  document_name?: string;
  feedback?: string;
  coordinator_id?: number;
  request_id?: number;
  report_number?: number;
  status?: number;
  file?: File | null;
}
interface UpdateRequestInput {
  student_id?: number;
  program_id?: number;
  coordinator_id?: number;
  acceptance_status?: number;
  progress_status?: number;
  completed_hours?: number;
  feedback?: string;
}



interface ContextValue {
  reportsRequest: Report[];
  loading: boolean;
  totalPages: number;
  currentPage: number;
  query: string;
  setPage: (p: number) => void;
  setQuery: (q: string) => void;
  refetch: () => Promise<void>;

  request: Request | null;
  loadingRequest: boolean;
  refetchRequest: () => Promise<void>;

  isEditOpen: boolean;
  selected: Report | null;
  openEdit: (i: Report) => void;
  closeEdit: () => void;
  handleUpdate: (data: UpdateInput) => Promise<void>;
  handleUpdateRequest: (data: UpdateRequestInput) => Promise<void>;
  isDeleteOpen: boolean;
  openDelete: (i: Report) => void;
  closeDelete: () => void;
  handleDelete: () => Promise<void>;

  isShowOpen: boolean;
  openShow: (i: Report) => void;
  closeShow: () => void;

  onDownload: (id: number) => void;
}

const RequestPanelContext = createContext<ContextValue | null>(null);
export const useReports = () => {
  const ctx = useContext(RequestPanelContext);
  if (!ctx) throw new Error("useReports must be inside ReportsProvider");
  return ctx;
};

export const ReportsProvider = ({ children }: { children: ReactNode }) => {
  const { id, requestId } = useParams<{
    id: string;
    requestId: string;
  }>();
  const request_Id = Number(requestId);
  const location = useLocation();
  const {
    reportsRequest,
    loading,
    totalPages,
    currentPage,
    setPage,
    query,
    setQuery,
    refetch,
  } = useGetReportsByRequest(request_Id, 1, 10);

  const {
    request,
    loading: loadingRequest,
    refetch: refetchRequest,
  } = useGetRequest(request_Id);

  const { updateReport } = useUpdateReport();
   const { updateRequest } = useUpdateRequest();
  const { deleteReport } = useDeleteReport();
  const { downloadReport } = useDownloadReport();
  const { toastSuccess, toastError } = useToast();

  const [isEditOpen, setEditOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isShowOpen, setShowOpen] = useState(false);
  const [selected, setSelected] = useState<Report | null>(null);

  // useEffect(() => {
  //   setPage(1);
  //   setQuery("");
  //   refetch();
  //   refetchRequest();
  // }, []);

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
        ...(data.document_name !== undefined && {
          document_name: data.document_name,
        }),
        ...(data.item_id !== undefined && { item_id: data.item_id }),
        ...(data.feedback !== undefined && { feedback: data.feedback }),
        ...(data.coordinator_id !== undefined && {
          coordinator_id: data.coordinator_id,
        }),
        ...(data.request_id !== undefined && { request_id: data.request_id }),
        ...(data.report_number !== undefined && {
          report_number: data.report_number,
        }),
        ...(data.status !== undefined && { status: data.status }),
        ...(data.file !== undefined && { file: data.file }),
      });
      await refetch();
      toastSuccess({
        id: 5,
        title: "¡Éxito!",
        message: "Reporte actualizado correctamente",
      });
      closeEdit();
    } catch (e: any) {
      toastError({
        id: 6,
        title: "Error",
        message: e.message || "Error al actualizar reporte",
      });
    }
  };
  const handleUpdateRequest = async (data: UpdateRequestInput) => {
    if (!request) return;
    try {
      await updateRequest(request.request_id, {
        ...(data.student_id !== undefined && {
          student_id: data.student_id,
        }),
        ...(data.program_id !== undefined && {
          program_id: data.program_id,
        }),
        ...(data.coordinator_id !== undefined && {
          coordinator_id: data.coordinator_id,
        }),
        ...(data.acceptance_status !== undefined && {
          acceptance_status: data.acceptance_status,
        }),
        ...(data.progress_status !== undefined && {
          progress_status: data.progress_status,
        }),
        ...(data.completed_hours !== undefined && {
          completed_hours: data.completed_hours,
        }),
        ...(data.feedback !== undefined && {
          feedback: data.feedback,
        }),
      });
      await refetch();
      toastSuccess({
        id: 12,
        title: "¡Éxito!",
        message: "Solicitud actualizada correctamente",
      });
      closeEdit();
    } catch {
      toastError({
        id: 13,
        title: "Error",
        message: "Error al actualizar solicitud",
      });
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
      toastSuccess({
        id: 7,
        title: "¡Éxito!",
        message: "Reporte eliminado correctamente",
      });
      closeDelete();
    } catch (e: any) {
      toastError({
        id: 8,
        title: "Error",
        message: e.message || "Error al eliminar reporte",
      });
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
    <RequestPanelContext.Provider
      value={{
        reportsRequest,
        loading,
        totalPages,
        currentPage,
        query,
        setPage,
        setQuery,
        refetch,
        request,
        loadingRequest,
        refetchRequest,
        isEditOpen,
        selected,
        openEdit,
        closeEdit,
        handleUpdate,
        handleUpdateRequest,
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
    </RequestPanelContext.Provider>
  );
};
