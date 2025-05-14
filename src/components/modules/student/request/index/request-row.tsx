import MenuDesplegable from "@/components/ui-componets/general/modals/myMenu";
import OpcionMenu from "@/components/ui-componets/general/modals/menuItem";
import EditIcon from "@icons/edit.svg";
import DeleteIcon from "@icons/delete.svg";
import AdminiIcon from "@icons/assignment_edit.svg";
import EyeIcon from "@icons/eye.svg";
import DotsIcon from "@icons/miniMenu.svg";
import { Request } from "@lib/api/models/request";
import { useRequests } from "./request-context";

interface Props {
  item: Request;
}
const RequestRow = ({ item }: Props) => {
  const { openEdit, openDelete, openShow,openPanel, loading } = useRequests();
  const acceptanceLabels = ["Pendiente", "Aceptada", "Rechazada"];
  const progressLabels = ["Pendiente", "En proceso", "Finalizada"];

  const acceptanceText =
    acceptanceLabels[item.acceptance_status] || "Desconocido";
  const progressText = progressLabels[item.progress_status] || "Desconocido";

  const acceptanceClass =
    {
      0: "text-yellow-500", // Pendiente
      1: "text-secondary", // Aceptada
      2: "text-red-500", // Rechazada
    }[item.acceptance_status] || "";

  const progressClass =
    {
      0: "text-black", // Pendiente
      1: "text-yellow-500", // En proceso
      2: "text-secondary", // Finalizada
    }[item.progress_status] || "";

  return (
    <tr>
      <td className="w-2/5 md:w-1/4">
        {loading ? "Cargando…" : item.student.name}
      </td>
      <td className="w-2/5 md:w-1/4">
        {loading ? "Cargando…" : item.institution.institution_name}
      </td>
      <td
        className={`hidden md:table-cell w-1/4  font-semibold ${acceptanceClass}`}
      >
        {acceptanceText}
      </td>
      <td
        className={`hidden md:table-cell w-1/8  font-semibold ${progressClass}`}
      >
        {progressText}
      </td>

      <td className="w-8 text-right">
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
          <OpcionMenu
            icon={<img src={AdminiIcon} alt="Administrar" className="w-5" />}
            text="Gestinar"
            onClick={() => openPanel(item)}
          />
        </MenuDesplegable>
      </td>
    </tr>
  );
};
export default RequestRow;
