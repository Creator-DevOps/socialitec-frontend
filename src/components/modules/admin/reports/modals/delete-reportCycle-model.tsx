import React from 'react';
import ModalContainer from '@/components/containers/modal.container';
import { useReportCycles } from '../index/reportCycle-context';

const DeleteReportCycleModal: React.FC = () => {
  const { isDeleteOpen, selected, closeDelete, handleDelete } = useReportCycles();

  if (!isDeleteOpen || !selected) return null;
  return (
    <ModalContainer visible onClose={closeDelete}>
      <div className="flex flex-col gap-6 md:px-6 text-center">
        <h2 className="text-2xl font-bold text-primary">Eliminar Ciclo</h2>
        <p>¿Estás seguro de eliminar a <strong>{selected.folder_name}</strong>?</p>
        <div className="flex justify-end gap-4 pt-4">
          <button onClick={closeDelete} className="cancel">Cancelar</button>
          <button onClick={handleDelete} className="delete">Confirmar</button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default DeleteReportCycleModal;