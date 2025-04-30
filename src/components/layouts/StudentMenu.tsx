import React from "react";
import Option from "@components/ui-componets/buttons/sidebarButton";
import Profile from "@icons/menu/profile.svg";
import Requests from "@icons/menu/requests.svg";
import Templates from "@icons/menu/templates.svg";
import Reports from "@icons/menu/reports.svg";
import ReleaseLetters from "@icons/menu/release-letters.svg";

const AdminMenu = () => {
  return (
    <div className="h-full w-full flex flex-col p-4 gap-4 overflow-y-auto scrollable-container">
      <div className=" flex flex-col gap-2">
        <Option to="/student/:id/profile" label="Perfil">
          <img src={Profile} alt="Perfil_Icon" />
        </Option>
        <Option to="/student/:id/request" label="Solictud">
          <img
            src={Requests}
            alt="Solicitudes_Icon"
            className="h-6 w-6 md:h-8 md:w-8"
          />
        </Option>
        <Option to="/student/:id/templates" label="Plantillas">
          <img src={Templates} alt="Plantillas_Icon" />
        </Option>
        <Option to="/student/:id/reports" label="Reportes">
          <img src={Reports} alt="Reportes_Icon" />
        </Option>
        <Option to="/student/:id/release-letter" label="Cartas de liberación">
          <img src={ReleaseLetters} alt="Cartas_Icon" />
        </Option>
      </div>
    </div>
  );
};

export default AdminMenu;
