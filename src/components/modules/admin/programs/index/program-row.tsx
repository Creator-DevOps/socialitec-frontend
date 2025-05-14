import React from "react";
import MenuDesplegable from "@/components/ui-componets/general/modals/myMenu";
import OpcionMenu from "@/components/ui-componets/general/modals/menuItem";
import EditIcon from "@icons/edit.svg";
import DeleteIcon from "@icons/delete.svg";
import EyeIcon from "@icons/eye.svg";
import DotsIcon from "@icons/miniMenu.svg";
import { Program } from "@lib/api/models/program";
import { usePrograms } from "./program-context";
import { useGetInstitution } from "@lib/api/api-hooks/institutions/use-get-institution";

interface Props {
  item: Program;
}
const ProgramRow = ({ item }: Props) => {
  const { institution, loading, error } = useGetInstitution(item.institution_id);
  const { openEdit, openDelete,openShow } = usePrograms();
  return (
    <tr>
      <td className="w-2/5 md:w-1/4 ">{item.program_name}</td>
      <td className="w-2/5 md:w-1/4  ">
        {loading ? "Cargando…" : institution?.institution_name}
      </td>
      <td className="hidden md:table-cell lg:w-1/6">{item.supervisor_name}</td>
      <td className="hidden xl:table-cell w-1/6 underline text-secondary">{item.supervisor_email}</td>

      <td className="w-8 text-right ">
        <MenuDesplegable
          trigger={
            <img
              src={DotsIcon}
              alt="menu"
              className="cursor-pointer rounded-full"
            />
          }
        >
          <OpcionMenu
            icon={<img src={EditIcon} alt="Editar" className="w-5" />}
            text="Editar"
            onClick={() => openEdit(item)}
          />
          <OpcionMenu
            icon={<img src={DeleteIcon} alt="Eliminar" className="w-5" />}
            text="Eliminar"
            onClick={() => openDelete(item)}
            className="text-red-500"
          />
           <OpcionMenu
            icon={<img src={EyeIcon} alt="Mostrar" className="w-5" />}
            text="Mostrar"
            onClick={() => openShow(item)}
          />
        </MenuDesplegable>
      </td>
    </tr>
  );
};
export default ProgramRow;
