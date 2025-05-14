import React from 'react';
import MenuDesplegable from '@/components/ui-componets/general/modals/myMenu';
import OpcionMenu from '@/components/ui-componets/general/modals/menuItem';
import EditIcon from '@icons/edit.svg';
import DeleteIcon from '@icons/delete.svg';
import EyeIcon from '@icons/eye.svg';
import DotsIcon from '@icons/miniMenu.svg';
import { Institution } from '@lib/api/models/institution';
import { useInstitutions } from './institution-context';

interface Props { item: Institution; }
const InstitutionRow = ({ item }: Props) => {
  const { openEdit, openDelete,openShow } = useInstitutions();
  return (
    <tr>
      <td className="w-2/5 md:w-1/4 ">{item.institution_name}</td>
      <td className="text-secondary underline w-2/5 md:w-1/4  ">{item.email}</td>
      <td className="hidden md:table-cell w-1/4">{item.phone}</td>
      <td className="hidden md:table-cell w-1/8">{item.postal_code}</td>

      <td className="w-8 text-right ">
        <MenuDesplegable trigger={<img src={DotsIcon} alt="menu" className="cursor-pointer rounded-full"/>}>
          <OpcionMenu icon={<img src={EditIcon} alt="Editar" className="w-5"/>} text="Editar" onClick={() => openEdit(item)} />
          <OpcionMenu icon={<img src={DeleteIcon} alt="Eliminar" className="w-5"/>} text="Eliminar" onClick={() => openDelete(item)} className="text-red-500" />
          <OpcionMenu icon={<img src={EyeIcon} alt="Mostrar" className="w-5"/>} text="Mostrar" onClick={() => openShow(item)}  />
        </MenuDesplegable>
      </td>
    </tr>
  );
};
export default InstitutionRow;