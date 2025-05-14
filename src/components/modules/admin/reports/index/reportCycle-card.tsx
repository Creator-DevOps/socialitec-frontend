import React from "react";
import MenuDesplegable from "@/components/ui-componets/general/modals/myMenu";
import OpcionMenu from "@/components/ui-componets/general/modals/menuItem";
import EditIcon from "@icons/edit.svg";
import DeleteIcon from "@icons/delete.svg";
import ReportIcon from "@icons/menu/reports.svg";
import DownloadIcon from "@icons/download.svg";
import DocumentIcon from "@icons/menu/reports.svg"
import DotsIcon from "@icons/miniMenu.svg";
import { ReportCycle } from "@lib/api/models/report-cycle";
import { useReportCycles } from "./reportCycle-context";

interface Props {
  item: ReportCycle;
}
const ReportCycleCard = ({ item }: Props) => {
  const { openEdit, openDelete, openShow} = useReportCycles();
  

  return (
    <div className="flex flex-col justify-between p-3 border border-gray-100 shadow-md w-30 h-40 md:w-35 md:h-45 bg-white hover:bg-gray-50 transition">
      <div className="flex flex-col h-[90%]">
        
        <div className="h-1/3 flex items-center justify-center text-center">
          <h3 className="text-xs md:text-sm font-semibold leading-tight text-center line-clamp-2 max-h-10">{item.name}</h3>
        </div>

        <div className="h-1/3 flex items-center justify-center">
          <img src={DocumentIcon} alt={"Document"} className="w-8 h-8 md:w-10 md:h-10 object-contain" />
        </div>

        
        <div className="h-1/3 flex items-center justify-center">
          <p className="text-gray-500 text-center line-clamp-3 leading-tight !text-[10px] max-h-10">{item.folder_name}</p>
        </div>
      </div>

      {/* Menú */}
      <div className="flex items-end justify-end h-[10%] pt-4">
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
            icon={<img src={ReportIcon} alt="Reportes" className="w-5" />}
            text="Reportes"
            onClick={() => openShow(item)}
          />

        </MenuDesplegable>
      </div>
    </div>
  );
};
export default ReportCycleCard;
