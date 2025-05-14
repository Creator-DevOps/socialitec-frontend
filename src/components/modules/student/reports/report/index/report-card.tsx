import React from "react";
import MenuDesplegable from "@/components/ui-componets/general/modals/myMenu";
import OpcionMenu from "@/components/ui-componets/general/modals/menuItem";
import EditIcon from "@icons/edit.svg";
import DeleteIcon from "@icons/delete.svg";
import EyeIcon from "@icons/eye.svg";
import DownloadIcon from "@icons/download.svg";
import DocumentIcon from "@icons/menu/Reports.svg";
import DotsIcon from "@icons/miniMenu.svg";
import { Report } from "@lib/api/models/report";
import { useReports } from "./report-context";

interface Props {
  item: Report;
}
const ReportCard = ({ item }: Props) => {
  const { openEdit, openDelete, openShow,onDownload} = useReports();
const getAcceptanceColor = (status?: number) => {
    switch (status) {
      case 1:
        return "text-green-500 rounded-lg p-1 "; // Aceptada
      case 2:
        return "text-red-500 rounded-lg p-1"; // Rechazado
      default:
        return "text-gray-500 rounded-lg p-1"; // Pendiente
    }
  };
  return (
    <div className="flex flex-col justify-between p-3 border border-gray-100 shadow-md w-30 h-40 md:w-35 md:h-45 bg-white hover:bg-gray-50 transition">
      <div className="flex flex-col h-[90%]">
        
        <div className="h-1/3 flex items-center justify-center text-center">
          <h3 className="text-xs md:text-sm font-semibold leading-tight text-center line-clamp-2 max-h-10">{item.document_name}</h3>
        </div>

        <div className="h-1/3 flex items-center justify-center">
          <img src={DocumentIcon} alt={"Document"} className="w-8 h-8 md:w-10 md:h-10 object-contain" />
        </div>

        
        <div className="h-1/3 flex items-center justify-center">
          <p className={`font-bold text-gray-500 text-center line-clamp-3 leading-tight !text-sm max-h-10 ${getAcceptanceColor(item.status)}`}>{item.status===1?"Aceptado":item.status===2?"Rechazado":"Pendiente"}</p>
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
          <OpcionMenu className={`${item.status===0||item.status===1?"hidden":"" }`}
            icon={<img src={EditIcon} alt="Editar" className="w-5" />}
            text="Editar"
            onClick={() => openEdit(item)}
          />
          {/* <OpcionMenu
            icon={<img src={DeleteIcon} alt="Eliminar" className="w-5" />}
            text="Eliminar"
            onClick={() => openDelete(item)}
            className="text-red-500"
          /> */}
          <OpcionMenu
            icon={<img src={EyeIcon} alt="Mostrar" className="w-5" />}
            text="Mostrar"
            onClick={() => openShow(item)}
          />
          <OpcionMenu
            icon={<img src={DownloadIcon} alt="Descargar" className="w-5" />}
            text="Descargar"
            onClick={() => onDownload(item.document_id)}
          />
        </MenuDesplegable>
      </div>
    </div>
  );
};
export default ReportCard;
