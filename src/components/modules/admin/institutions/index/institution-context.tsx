import React, { createContext, useContext, useState, ReactNode } from "react";
import { Institution } from "@lib/api/models/institution";
import { useGetInstitutions } from "@lib/api/api-hooks/institutions/use-get-institutions";
import { useCreateInstitution } from "@lib/api/api-hooks/institutions/use-create-institution";
import { useUpdateInstitution } from "@lib/api/api-hooks/institutions/use-update-institution";
import { useDeleteInstitution } from "@lib/api/api-hooks/institutions/use-delete-institution";
import { useToast } from "@/lib/hooks/use-toast";

interface CreateInput {
  institution_name: string;
  description: string;
  email: string;
  phone: string;
  neighborhood: string;
  street: string;
  number: string;
  postal_code: string;
}
interface UpdateInput {
  institution_name?: string;
  description?: string;
  email?: string;
  phone?: string;
  neighborhood?: string;
  street?: string;
  number?: string;
  postal_code?: string;
}

interface ContextValue {
  institutions: Institution[];
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
  selected: Institution | null;
  openEdit: (i: Institution) => void;
  closeEdit: () => void;
  handleUpdate: (data: UpdateInput) => Promise<void>;

  isDeleteOpen: boolean;
  openDelete: (i: Institution) => void;
  closeDelete: () => void;
  handleDelete: () => Promise<void>;

  isShowOpen: boolean;
  openShow:(i: Institution) => void;
  closeShow: () => void;

}

const InstitutionsContext = createContext<ContextValue | null>(null);
export const useInstitutions = () => {
  const ctx = useContext(InstitutionsContext);
  if (!ctx)
    throw new Error("useInstitutions must be inside InstitutionsProvider");
  return ctx;
};

export const InstitutionsProvider = ({ children }: { children: ReactNode }) => {
  const {
    institutions,
    loading,
    totalPages,
    currentPage,
    setPage,
    query,
    setQuery,
    refetch,
  } = useGetInstitutions(1, 10);
  const { createInstitution } = useCreateInstitution();
  const { updateInstitution } = useUpdateInstitution();
  const { deleteInstitution } = useDeleteInstitution();
  const { toastSuccess, toastError, toastWarning } = useToast();

  const [isCreateOpen, setCreateOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isShowOpen, setShowOpen] = useState(false);
  const [selected, setSelected] = useState<Institution | null>(null);

  const openCreate = () => setCreateOpen(true);
  const closeCreate = () => setCreateOpen(false);

  const handleCreate = async (data: CreateInput) => {
    try {
      await createInstitution({
        institution_name: data.institution_name,
        description: data.description,
        email: data.email.toLowerCase(),
        phone: data.phone,
        neighborhood: data.neighborhood,
        street: data.street,
        number: data.number,
        postal_code: data.postal_code,
      });
      await refetch();
      toastSuccess({
        id: 2,
        title: "¡Éxito!",
        message: "Institución creada correctamente",
      });
      closeCreate();
    } catch {
      toastError({
        id: 3,
        title: "Error",
        message: "Error al crear institución",
      });
    }
  };

  const openEdit = (i: Institution) => {
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
      await updateInstitution(selected.institution_id, {
        ...(data.institution_name!== undefined && { institution_name: data.institution_name}),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.email !== undefined && { email: data.email.toLowerCase() }),
        ...(data.phone!== undefined && { phone: data.phone }),
        ...(data.neighborhood !== undefined && { neighborhood: data.neighborhood}),
        ...(data.street!== undefined && { street: data.street }),
        ...(data.number !== undefined && { number: data.number}),
        ...(data.postal_code !== undefined && { postal_code: data.postal_code}),
      });
      await refetch();
      toastSuccess({
        id: 5,
        title: "¡Éxito!",
        message: "Institución actualizada correctamente",
      });
      closeEdit();
    } catch {
      toastError({
        id: 6,
        title: "Error",
        message: "Error al actualizar institución",
      });
    }
  };

  const openDelete = (i: Institution) => {
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
      await deleteInstitution(selected.institution_id);
      await refetch();
      toastSuccess({
        id: 7,
        title: "¡Éxito!",
        message: "Institución eliminada correctamente",
      });
      closeDelete();
    } catch {
      toastError({
        id: 8,
        title: "Error",
        message: "Error al eliminar institución",
      });
    }
  };
  const openShow = (i: Institution) => {
    setSelected(i);
    setShowOpen(true);
  };
  const closeShow = () => {
    setSelected(null);
    setShowOpen(false);
  };

  return (
    <InstitutionsContext.Provider
      value={{
        institutions,
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
    </InstitutionsContext.Provider>
  );
};
