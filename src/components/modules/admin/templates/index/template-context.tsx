import React, { createContext, useContext, useState, ReactNode } from "react";
import { Template } from "@lib/api/models/template";
import { useGetTemplates } from "@lib/api/api-hooks/templates/use-get-templates";
import { useCreateTemplate } from "@lib/api/api-hooks/templates/use-create-template";
import { useUpdateTemplate } from "@lib/api/api-hooks/templates/use-update-template";
import { useDeleteTemplate } from "@lib/api/api-hooks/templates/use-delete-template";
import { useDownloadTemplate } from "@lib/api/api-hooks/templates/use-download-template";
import { useToast } from "@/lib/hooks/use-toast";
import { id } from "@material-tailwind/react/types/components/tabs";

interface CreateInput {
  document_name: string;
  description: string;
  coordinator_id: number;
  file: File | null;
}
interface UpdateInput {
  document_name?: string;
  description?: string;
  coordinator_id?: number;
  file?: File | null;
}

interface ContextValue {
  templates: Template[];
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
  selected: Template | null;
  openEdit: (i: Template) => void;
  closeEdit: () => void;
  handleUpdate: (data: UpdateInput) => Promise<void>;

  isDeleteOpen: boolean;
  openDelete: (i: Template) => void;
  closeDelete: () => void;
  handleDelete: () => Promise<void>;

  isShowOpen: boolean;
  openShow:(i: Template) => void;
  closeShow: () => void;

  onDownload:(id: number) => void;
}

const TemplatesContext = createContext<ContextValue | null>(null);
export const useTemplates = () => {
  const ctx = useContext(TemplatesContext);
  if (!ctx)
    throw new Error("useTemplates must be inside TemplatesProvider");
  return ctx;
};

export const TemplatesProvider = ({ children }: { children: ReactNode }) => {
  const {
    templates,
    loading,
    totalPages,
    currentPage,
    setPage,
    query,
    setQuery,
    refetch,
  } = useGetTemplates(1, 20);
  const { createTemplate } = useCreateTemplate();
  const { updateTemplate } = useUpdateTemplate();
  const { deleteTemplate } = useDeleteTemplate();
  const { downloadTemplate } = useDownloadTemplate();
  const { toastSuccess, toastError, toastWarning } = useToast();

  const [isCreateOpen, setCreateOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isShowOpen, setShowOpen] = useState(false);
  const [selected, setSelected] = useState<Template | null>(null);

  const openCreate = () => setCreateOpen(true);
  const closeCreate = () => setCreateOpen(false);

  const handleCreate = async (data: CreateInput) => {
    try {
      await createTemplate({
        document_name: data.document_name,
        description: data.description,
        coordinator_id: data.coordinator_id,
        file: data.file,
      });
      await refetch();
      toastSuccess({ id: 2, title: "¡Éxito!", message: "Plantilla creada correctamente" });
      closeCreate();
    } catch (e: any) {
      toastError({ id: 3, title: "Error", message: e.message || "Error al crear plantilla" });
    }
  };

  const openEdit = (i: Template) => {
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
      await updateTemplate(selected.document_id, {
        ...(data.document_name !== undefined && { document_name: data.document_name }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.file !== undefined && { file: data.file }),
      });
      await refetch();
      toastSuccess({ id: 5, title: "¡Éxito!", message: "Plantilla actualizada correctamente" });
      closeEdit();
    } catch (e: any) {
      toastError({ id: 6, title: "Error", message: e.message || "Error al actualizar plantilla" });
    }
  };

  const openDelete = (i: Template) => {
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
      await deleteTemplate(selected.document_id);
      await refetch();
      toastSuccess({ id: 7, title: "¡Éxito!", message: "Plantilla eliminada correctamente" });
      closeDelete();
    } catch (e: any) {
      toastError({ id: 8, title: "Error", message: e.message || "Error al eliminar plantilla" });
    }
  };
  const openShow = (i: Template) => {
    setSelected(i);
    setShowOpen(true);
  };
  const closeShow = () => {
    setSelected(null);
    setShowOpen(false);
  }
  const onDownload = (id: number) => {
    downloadTemplate(id);
  };

  return (
    <TemplatesContext.Provider
      value={{
        templates,
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
    </TemplatesContext.Provider>
  );
};
