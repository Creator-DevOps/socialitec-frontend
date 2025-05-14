import React, { createContext, useContext, useState, ReactNode } from "react";
import { Letter } from "@lib/api/models/letter";
import { useGetLetters } from "@/lib/api/api-hooks/release-letters/use-get-letters";
import { useCreateLetter } from "@/lib/api/api-hooks/release-letters/use-create-letter";
import { useUpdateLetter } from "@/lib/api/api-hooks/release-letters/use-update-letter";
import { useDeleteLetter } from "@/lib/api/api-hooks/release-letters/use-delete-letter";
import { useDownloadLetter } from "@/lib/api/api-hooks/release-letters/use-download-letter";
import { useToast } from "@/lib/hooks/use-toast";
import { id } from "@material-tailwind/react/types/components/tabs";

interface CreateInput {
  document_name: string;
  request_id:number;
  coordinator_id: number;
  file: File | null;
}
interface UpdateInput {
  document_name?: string;
  request_id?:number;
  coordinator_id?: number;
  file?: File | null;
}

interface ContextValue {
  letters: Letter[];
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
  selected: Letter | null;
  openEdit: (i: Letter) => void;
  closeEdit: () => void;
  handleUpdate: (data: UpdateInput) => Promise<void>;

  isDeleteOpen: boolean;
  openDelete: (i: Letter) => void;
  closeDelete: () => void;
  handleDelete: () => Promise<void>;

  isShowOpen: boolean;
  openShow:(i: Letter) => void;
  closeShow: () => void;

  onDownload:(id: number) => void;
}

const LettersContext = createContext<ContextValue | null>(null);
export const useLetters = () => {
  const ctx = useContext(LettersContext);
  if (!ctx)
    throw new Error("useLetters must be inside LettersProvider");
  return ctx;
};

export const LettersProvider = ({ children }: { children: ReactNode }) => {
  const {
    letters,
    loading,
    totalPages,
    currentPage,
    setPage,
    query,
    setQuery,
    refetch,
  } = useGetLetters(1, 20);
  const { createLetter } = useCreateLetter();
  const { updateLetter } = useUpdateLetter();
  const { deleteLetter } = useDeleteLetter();
  const { downloadLetter } = useDownloadLetter();
  const { toastSuccess, toastError, toastWarning } = useToast();

  const [isCreateOpen, setCreateOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isShowOpen, setShowOpen] = useState(false);
  const [selected, setSelected] = useState<Letter | null>(null);

  const openCreate = () => setCreateOpen(true);
  const closeCreate = () => setCreateOpen(false);

  const handleCreate = async (data: CreateInput) => {
    try {
      await createLetter({
        document_name: data.document_name,
        request_id:data.request_id,
        coordinator_id: data.coordinator_id,
        file: data.file,
      });
      await refetch();
      toastSuccess({ id: 42, title: "¡Éxito!", message: "Carta creada correctamente" });
      closeCreate();
    } catch (e: any) {
      toastError({ id: 43, title: "Error", message: e.message || "Error al crear carta" });
    }
  };

  const openEdit = (i: Letter) => {
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
      await updateLetter(selected.document_id, {
        ...(data.document_name !== undefined && { document_name: data.document_name }),
        ...(data.request_id !== undefined && { request_id: data.request_id}),
        ...(data.file !== undefined && { file: data.file }),
      });
      await refetch();
      toastSuccess({ id: 5, title: "¡Éxito!", message: "Carta actualizada correctamente" });
      closeEdit();
    } catch (e: any) {
      toastError({ id: 6, title: "Error", message: e.message || "Error al actualizar carta" });
    }
  };

  const openDelete = (i: Letter) => {
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
      await deleteLetter(selected.document_id);
      await refetch();
      toastSuccess({ id: 7, title: "¡Éxito!", message: "Carta eliminada correctamente" });
      closeDelete();
    } catch (e: any) {
      toastError({ id: 8, title: "Error", message: e.message || "Error al eliminar carta" });
    }
  };
  const openShow = (i: Letter) => {
    setSelected(i);
    setShowOpen(true);
  };
  const closeShow = () => {
    setSelected(null);
    setShowOpen(false);
  }
  const onDownload = (id: number) => {
    downloadLetter(id);
  };

  return (
    <LettersContext.Provider
      value={{
        letters,
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
        onDownload
      }}
    >
      {children}
    </LettersContext.Provider>
  );
};
