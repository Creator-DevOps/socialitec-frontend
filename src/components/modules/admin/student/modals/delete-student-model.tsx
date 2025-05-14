import React from 'react';
import ModalContainer from '@/components/containers/modal.container';
import { useStudents } from '../index/student-context';
import Loader from '@/components/ui-componets/load/Loader';

const DeleteStudentModal: React.FC = () => {
  const { isDeleteOpen, selected, closeDelete, handleDelete } = useStudents();

  if (!isDeleteOpen || !selected) return null;
  return (
    <ModalContainer visible onClose={closeDelete}>
      <div className="flex flex-col gap-6 md:px-6 text-center">
        <h2 className="text-2xl font-bold text-primary">Eliminar Estudiante</h2>
        <p>¿Estás seguro de eliminar a <strong>{selected.name}</strong>?</p>
        <div className="flex justify-end gap-4 pt-4">
          <button onClick={closeDelete} className="cancel">Cancelar</button>
          <button onClick={handleDelete} className="delete">Confirmar</button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default DeleteStudentModal;