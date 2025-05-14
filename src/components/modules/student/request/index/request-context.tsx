import React, { createContext, useContext, useState, ReactNode } from "react";
import { Request } from "@lib/api/models/request";
import { useGetRequests } from "@lib/api/api-hooks/requests/use-get-requests";
import { useCreateRequest } from "@lib/api/api-hooks/requests/use-create-request";
import { useUpdateRequest } from "@lib/api/api-hooks/requests/use-update-request";
import { useDeleteRequest } from "@lib/api/api-hooks/requests/use-delete-request";
import { useToast } from "@/lib/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/authContext";

interface CreateInput {
  student_id: number;
  program_id: number;
  acceptance_status: number;
  progress_status: number;
  completed_hours: number;
  coordinator_id?:number;
  feedback: string;
  cycle_id:number;
}
interface UpdateInput {
  student_id?: number;
  program_id?: number;
  cycle_id?:number;
  coordinator_id?:number;
  acceptance_status?: number;
  progress_status?: number;
  completed_hours?: number;
  feedback?: string;
}

interface ContextValue {
  requests: Request[];
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
  selected: Request | null;
  openEdit: (r: Request) => void;
  closeEdit: () => void;
  handleUpdate: (data: UpdateInput) => Promise<void>;

  isDeleteOpen: boolean;
  openDelete: (r: Request) => void;
  closeDelete: () => void;
  handleDelete: () => Promise<void>;

  isShowOpen: boolean;
  openShow: (r: Request) => void;
  closeShow: () => void;

  isPanelOpen: boolean;
  openPanel: (r: Request) => void;
  closePanel: () => void;
}

const RequestsContext = createContext<ContextValue | null>(null);
export const useRequests = () => {
  const ctx = useContext(RequestsContext);
  if (!ctx) throw new Error("useRequests must be inside RequestsProvider");
  return ctx;
};

export const RequestsProvider = ({ children }: { children: ReactNode }) => {
  const {
    requests,
    loading,
    totalPages,
    currentPage,
    setPage,
    query,
    setQuery,
    refetch,
  } = useGetRequests(1, 10);
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user?.user_id;
  const { createRequest } = useCreateRequest();
  const { updateRequest } = useUpdateRequest();
  const { deleteRequest } = useDeleteRequest();
  const { toastSuccess, toastError, toastWarning } = useToast();

  const [isCreateOpen, setCreateOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isShowOpen, setShowOpen] = useState(false);
  const [isPanelOpen, setPanelOpen] = useState(false);
  const [selected, setSelected] = useState<Request | null>(null);

  const openCreate = () => setCreateOpen(true);
  const closeCreate = () => setCreateOpen(false);

  const handleCreate = async (data: CreateInput) => {
    try {
      await createRequest({
        cycle_id:data.cycle_id,
        student_id: data.student_id,
        program_id: data.program_id,
        acceptance_status: data.acceptance_status,
        progress_status: data.progress_status,
        completed_hours: data.completed_hours,
        feedback: data.feedback,
      });
      await refetch();
      toastSuccess({
        id: 2,
        title: "¡Éxito!",
        message: "Solicitud creada correctamente",
      });
      closeCreate();
    } catch {
      toastError({
        id: 3,
        title: "Error",
        message: "Error al crear solicitud",
      });
    }
  };

  const openEdit = (r: Request) => {
    setSelected(r);
    setEditOpen(true);
  };
  const closeEdit = () => {
    setSelected(null);
    setEditOpen(false);
  };

  const handleUpdate = async (data: UpdateInput) => {
    if (!selected) return;
    try {
      await updateRequest(selected.request_id, {
        ...(data.student_id !== undefined && {
          student_id: data.student_id,
        }),
        ...(data.program_id !== undefined && {
          program_id: data.program_id,
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
        id: 5,
        title: "¡Éxito!",
        message: "Solicitud actualizada correctamente",
      });
      closeEdit();
    } catch {
      toastError({
        id: 6,
        title: "Error",
        message: "Error al actualizar solicitud",
      });
    }
  };

  const openDelete = (r: Request) => {
    setSelected(r);
    setDeleteOpen(true);
  };
  const closeDelete = () => {
    setSelected(null);
    setDeleteOpen(false);
  };

  const handleDelete = async () => {
    if (!selected) return;
    try {
      await deleteRequest(selected.request_id);
      await refetch();
      toastSuccess({
        id: 7,
        title: "¡Éxito!",
        message: "Solicitud eliminada correctamente",
      });
      closeDelete();
    } catch {
      toastError({
        id: 8,
        title: "Error",
        message: "Error al eliminar solicitud",
      });
    }
  };
  const openShow = (r: Request) => {
    setSelected(r);
    setShowOpen(true);
  };
  const closeShow = () => {
    setSelected(null);
    setShowOpen(false);
  };
  const openPanel = (r: Request) => {
    setSelected(r);
    navigate(`/admin/${userId}/requests/${r.request_id}`, { replace: true });
  };
  const closePanel = () => {
    setSelected(null);
    setPanelOpen(false);
  };

  return (
    <RequestsContext.Provider
      value={{
        requests,
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
        isPanelOpen,
        openPanel,
        closePanel,
      }}
    >
      {children}
    </RequestsContext.Provider>
  );
};
