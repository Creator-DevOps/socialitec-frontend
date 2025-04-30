import React from 'react';
import MenuDesplegable from '@/components/ui-componets/general/modals/myMenu';
import OpcionMenu from '@/components/ui-componets/general/modals/menuItem';
import EditIcon from '@icons/edit.svg';
import DeleteIcon from '@icons/delete.svg';
import DotsIcon from '@icons/miniMenu.svg';
import { Coordinator } from '@lib/api/models/coordinator';
import { useCoordinators } from './coordinator-context';

interface Props { item: Coordinator; }
const CoordinatorRow = ({ item }: Props) => {
  const { openEdit, openDelete } = useCoordinators();
  return (
    <tr>
      <td className="w-2/5 md:w-1/3  ">{item.name}</td>
      <td className="text-secondary underline w-1/4 ">{item.email}</td>
      <td className="hidden md:table-cell w-1/4">{item.departament}</td>
      <td className="w-8 text-right ">
        <MenuDesplegable trigger={<img src={DotsIcon} alt="menu" className="cursor-pointer rounded-full"/>}>
          <OpcionMenu icon={<img src={EditIcon} alt="Editar" className="w-5"/>} text="Editar" onClick={() => openEdit(item)} />
          <OpcionMenu icon={<img src={DeleteIcon} alt="Eliminar" className="w-5"/>} text="Eliminar" onClick={() => openDelete(item)} className="text-red-500" />
        </MenuDesplegable>
      </td>
    </tr>
  );
};
export default CoordinatorRow;