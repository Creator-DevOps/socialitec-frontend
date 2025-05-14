import React from 'react';
import ModalContainer from '@/components/containers/modal.container';
import { useRequests } from '../index/request-context';
import { useGetStudent } from '@/lib/api/api-hooks/students/use-get-student';

const DeleteRequestModal: React.FC = () => {
  const { isDeleteOpen, selected, closeDelete, handleDelete } = useRequests();

  if (!isDeleteOpen || !selected) return null;
  return (
    <ModalContainer visible onClose={closeDelete}>
      <div className="flex flex-col gap-6 md:px-6 text-center">
        <h2 className="text-2xl font-bold text-primary">Eliminar Solicitud</h2>
        <p>¿Estás seguro de eliminar la solicitus de <strong>{selected.student.name}</strong>?</p>
        <div className="flex justify-end gap-4 pt-4">
          <button onClick={closeDelete} className="cancel">Cancelar</button>
          <button onClick={handleDelete} className="delete">Confirmar</button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default DeleteRequestModal;