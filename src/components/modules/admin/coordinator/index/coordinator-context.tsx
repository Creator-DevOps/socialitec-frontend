import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Coordinator } from '@lib/api/models/coordinator';
import { useGetCoordinators } from '@lib/api/api-hooks/coordinators/use-get-coordinators';
import { useCreateCoordinator } from '@lib/api/api-hooks/coordinators/use-create-coordinator';
import { useUpdateCoordinator } from '@lib/api/api-hooks/coordinators/use-update-coordinators';
import { useDeleteCoordinator } from '@lib/api/api-hooks/coordinators/use-delete-coordinator';
import { useToast } from '@/lib/hooks/use-toast';

interface CreateInput {
  name: string;
  email: string;
  departament: string;
  password: string;
  confirmPassword: string;
}
interface UpdateInput {
  name: string;
  email?: string;
  departament?: string;
  password?: string;
  confirmPassword?: string;
}

interface ContextValue {
  coordinators: Coordinator[];
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
  selected: Coordinator | null;
  openEdit: (c: Coordinator) => void;
  closeEdit: () => void;
  handleUpdate: (data: UpdateInput) => Promise<void>;

  isDeleteOpen: boolean;
  openDelete: (c: Coordinator) => void;
  closeDelete: () => void;
  handleDelete: () => Promise<void>;
}

const CoordinatorsContext = createContext<ContextValue | null>(null);
export const useCoordinators = () => {
  const ctx = useContext(CoordinatorsContext);
  if (!ctx) throw new Error('useCoordinators must be inside CoordinatorsProvider');
  return ctx;
};

export const CoordinatorsProvider = ({ children }: { children: ReactNode }) => {
  const { coordinators, loading, totalPages, currentPage, setPage, query, setQuery, refetch } = useGetCoordinators(1, 10);
  const { createCoordinator } = useCreateCoordinator();
  const { updateCoordinator } = useUpdateCoordinator();
  const { deleteCoordinator } = useDeleteCoordinator();
  const { toastSuccess, toastError, toastWarning } = useToast();

  const [isCreateOpen, setCreateOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [selected, setSelected] = useState<Coordinator | null>(null);

  const openCreate = () => setCreateOpen(true);
  const closeCreate = () => setCreateOpen(false);

  const handleCreate = async (data: CreateInput) => {
    if (data.password !== data.confirmPassword) {
      toastWarning({ id: 1, title: 'Aviso', message: 'Contraseñas no coinciden' });
      return;
    }
    try {
      await createCoordinator({ name: data.name, email: data.email, departament: data.departament, password: data.password });
      await refetch();
      toastSuccess({ id: 2, title: '¡Éxito!', message: 'Coordinador creado correctamente' });
      closeCreate();
    } catch {
      toastError({ id: 3, title: 'Error', message: 'Error al crear coordinador' });
    }
  };

  const openEdit = (c: Coordinator) => { setSelected(c); setEditOpen(true); };
  const closeEdit = () => { setSelected(null); setEditOpen(false); };

  const handleUpdate = async (data: UpdateInput) => {
    if (data.password && data.password !== data.confirmPassword) {
      toastWarning({ id: 4, title: 'Aviso', message: 'Contraseñas no coinciden' });
      return;
    }
    if (!selected) return;
    try {
      await updateCoordinator(selected.user_id, {
        name: data.name,
        ...(data.email !== undefined && { email: data.email }),
        ...(data.departament !== undefined && { departament: data.departament }),
        ...(data.password && { password: data.password }),
      });
      await refetch();
      toastSuccess({ id: 5, title: '¡Éxito!', message: 'Coordinador actualizado correctamente' });
      closeEdit();
    } catch {
      toastError({ id: 6, title: 'Error', message: 'Error al actualizar coordinador' });
    }
  };

  const openDelete = (c: Coordinator) => { setSelected(c); setDeleteOpen(true); };
  const closeDelete = () => { setSelected(null); setDeleteOpen(false); };

  const handleDelete = async () => {
    if (!selected) return;
    try {
      await deleteCoordinator(selected.user_id);
      await refetch();
      toastSuccess({ id: 7, title: '¡Éxito!', message: 'Coordinador eliminado correctamente' });
      closeDelete();
    } catch {
      toastError({ id: 8, title: 'Error', message: 'Error al eliminar coordinador' });
    }
  };

  return (
    <CoordinatorsContext.Provider value={{
      coordinators,
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
    }}>
      {children}
    </CoordinatorsContext.Provider>
  );
};