import React from "react";
import Option from "@components/ui-componets/buttons/sidebarButton";

import Profile from "@icons/menu/profile.svg";
import Coordinators from "@icons/menu/coordinators.svg";
import Students from "@icons/menu/students.svg";
import Requests from "@icons/menu/requests.svg";
import Institutions from "@icons/menu/institutions.svg";
import Programs from "@icons/menu/programs.svg";
import Templates from "@icons/menu/templates.svg";
import Reports from "@icons/menu/reports.svg";
import ReleaseLetters from "@icons/menu/release-letters.svg";
import { useAuth } from "@/contexts/authContext";

const AdminMenu = () => {
  const { user } = useAuth();
  const userId = user?.user_id || 0;
  return (
    <div className="h-full w-full flex flex-col p-4 gap-4 overflow-y-auto scrollable-container">
      <div>
        <h2 className="md:text-lg text-primary py-4">Usuarios</h2>
        <div className="flex flex-col gap-2">
          <Option to={`/admin/${userId}/profile`} label="Perfil">
            <img src={Profile} alt="Perfil_Icon" />
          </Option>
          {user?.user_type === 0 && (
            <Option to={`/admin/${userId}/coordinators`} label="Coordinadores">
              <img src={Coordinators} alt="Coordinadores_Icon" />
            </Option>
          )}
          <Option to={`/admin/${userId}/students`} label="Estudiantes">
            <img src={Students} alt="Estudiantes_Icon" />
          </Option>
        </div>
      </div>

      <div>
        <h2 className="md:text-lg text-primary py-4">Solicitudes</h2>
        <div className="flex flex-col gap-2">
          <Option to={`/admin/${userId}/requests`} label="Solicitudes">
            <img
              src={Requests}
              alt="Solicitudes_Icon"
              className="h-6 w-6 md:h-8 md:w-8"
            />
          </Option>
          <Option to={`/admin/${userId}/institutions`} label="Instituciones">
            <img src={Institutions} alt="Instituciones_Icon" />
          </Option>
          <Option to={`/admin/${userId}/programs`} label="Programas">
            <img src={Programs} alt="Programas_Icon" />
          </Option>
        </div>
      </div>

      <div>
        <h2 className="md:text-lg text-primary py-4">Documentos</h2>
        <div className="flex flex-col gap-4">
          <Option to={`/admin/${userId}/templates`} label="Plantillas">
            <img src={Templates} alt="Plantillas_Icon" />
          </Option>
          <Option to={`/admin/${userId}/reports`} label="Reportes">
            <img src={Reports} alt="Reportes_Icon" />
          </Option>
          <Option
            to={`/admin/${userId}/release-letters`}
            label="Cartas de liberación"
          >
            <img src={ReleaseLetters} alt="Cartas_Icon" />
          </Option>
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;
