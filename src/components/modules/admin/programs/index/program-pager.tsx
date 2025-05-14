import React from 'react';
import Before from '@icons/before.svg';
import After from '@icons/after.svg';
import { IconButton } from '@/components/ui-componets/buttons/iconButton';
import { usePrograms } from './program-context';

const ProgramsPager = () => {
  const { currentPage, totalPages, setPage } = usePrograms();
  return (
    <div className="flex justify-center items-center">
      <IconButton onClick={() => setPage(currentPage - 1)} disabled={currentPage === 1} tooltip="Anterior">
        <img src={Before} alt="Anterior"/>
      </IconButton>
      <span className="bg-gray-200 text-primary rounded-full text-[10px] font-bold p-2">{currentPage} / {totalPages}</span>
      <IconButton onClick={() => setPage(currentPage + 1)} disabled={currentPage === totalPages} tooltip="Siguiente">
        <img src={After} alt="Siguiente"/>
      </IconButton>
    </div>
  );
};
export default ProgramsPager;