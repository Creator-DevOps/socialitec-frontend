import React from "react";
import Option from "@components/ui-componets/buttons/sidebarButton";
import Profile from "@icons/menu/profile.svg";
import Requests from "@icons/menu/requests.svg";
import Templates from "@icons/menu/templates.svg";
import Reports from "@icons/menu/reports.svg";
import ReleaseLetters from "@icons/menu/release-letters.svg";
import Institutions from "@icons/menu/institutions.svg";
import { useAuth } from "@/contexts/authContext";
import { useGetRequestUser } from "@/lib/api/api-hooks/requests/use-get-request_user";
import Loader from "../ui-componets/load/Loader";
const AdminMenu = () => {
  const { user } = useAuth();
    const userId = user?.user_id || 0;

      const { request,loading} = useGetRequestUser(userId);
      const cycle_id = request?.cycle_id;

    
  return (
    <div className="h-full w-full flex flex-col p-4 gap-4 overflow-y-auto scrollable-container">
      <div className=" flex flex-col gap-2">
        <Option to={`/student/${userId}/profile`} label="Perfil">
          <img src={Profile} alt="Perfil_Icon" />
        </Option>
        <Option to={`/student/${userId}/institutions`} label="Institutiones">
          <img src={Institutions} alt="Institution_icon" />
        </Option>
        <Option to={`/student/${userId}/request`} label="Solictud">
          <img
            src={Requests}
            alt="Solicitudes_Icon"
            className="h-6 w-6 md:h-8 md:w-8"
          />
        </Option>
        <Option to={`/student/${userId}/templates`} label="Plantillas">
          <img src={Templates} alt="Plantillas_Icon" />
        </Option>
        
        {/* <Option to={`/student/${userId}/reports/${cycle_id}`} label="Reportes">
          <img src={Reports} alt="Reportes_Icon" />
        </Option> */}
         {loading?<Loader/>:<Option to={`/student/${userId}/reports/${cycle_id}`} label="Reportes">
          <img src={Reports} alt="Reportes_Icon" />
        </Option>}
        <Option to={`/student/${userId}/release-letter`} label="Carta de liberación">
          <img src={ReleaseLetters} alt="Cartas_Icon" />
        </Option>
      </div>
    </div>
  );
};

export default AdminMenu;
