import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import MenuDesplegable from "@/components/ui-componets/general/modals/myMenu";
import OpcionMenu from "@/components/ui-componets/general/modals/menuItem";
import EditIcon from "@icons/edit.svg";
import DeleteIcon from "@icons/delete.svg";
import EyeIcon from "@icons/eye.svg";
import DotsIcon from "@icons/miniMenu.svg";
import { ReportCycleItem } from "@/lib/api/models/report-cycle-item";
import { useReportCycleItems } from "./reportCycleItem-context";

interface Props {
  item: ReportCycleItem;
}

const ReportCycleItemCard = ({ item }: Props) => {
  const { openEdit, openDelete, openShow } = useReportCycleItems();
  const navigate = useNavigate();
  const { id, cycleId, itemId } = useParams<{
    id: string;
    cycleId: string;
    itemId?: string;
  }>();
  const isSelected = itemId === String(item.item_id);

  // Construye la ruta una sola vez
  const targetPath = `/admin/${id}/cycles/${cycleId}/reports/${item.item_id}`;

  return (
    <div
      className={`
        flex flex-col justify-between py-2 px-4 border 
        rounded-xl shadow-md w-15 md:w-30 h-20 md:h-20 bg-white hover:bg-gray-50 hover:cursor-pointer
        transition gap-2
        ${isSelected 
           ? "border-secondary bg-gray-100"  
           : "border-gray-100"}
      `}
      onClick={e => e.preventDefault()}
      onDoubleClick={() => navigate(targetPath,{replace:true})}
    >
      {/* Contenido principal */}
      <div className="flex flex-col h-[90%]">
        <div className="hidden md:flex items-center justify-center text-center h-full">
          <h3 className="text-sm font-semibold leading-tight line-clamp-2">
            {item.title}
          </h3>
        </div>
        <div className="md:hidden flex items-center justify-center text-center h-full">
          <h2 className="text-xl font-bold text-secondary">
            {item.report_number}
          </h2>
        </div>
      </div>

      {/* Menú: sin más propagaciones */}
      <div className="flex items-end justify-end pt-1">
        <MenuDesplegable
          trigger={
            <img
              src={DotsIcon}
              alt="menu"
              className="cursor-pointer hover:bg-white rounded-full"
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
            className="text-red-500"
            onClick={() => openDelete(item)}
          />
          <OpcionMenu
            icon={<img src={EyeIcon} alt="Mostrar" className="w-5" />}
            text="Mostrar"
            onClick={() => openShow(item)}
          />
        </MenuDesplegable>
      </div>
    </div>
  );
};

export default ReportCycleItemCard;
