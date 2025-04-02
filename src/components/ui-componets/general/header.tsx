import React from "react";
import { useTranslation } from "react-i18next";

import LanguageToggle from "@components/ui-componets/buttons/lenguageToggle";
import { IconButton } from "../buttons/iconButton";
import { useNavigate } from "react-router-dom";
import Icon from "@icons/iconG.svg";
import TecNM from "@png/tec.png";
import ITL from "@png/itl.png";

const Header: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between px-4 sm:px-8 py-2 bg-gray-fondo">
      <IconButton tooltip="Regresar" onClick={() => navigate(-1)} className="hover:bg-white">
        <img src={Icon} alt="Icon rang" />
      </IconButton>
      <div className="flex items-center justify-center space-x-20 w-full">
        <img src={TecNM} alt="TecNM" className="h-10 md:h-15" />
        <img src={ITL} alt="ITL" className=" h-10 md:h-15" />
      </div>
      <LanguageToggle />
    </header>
  );
};

export default Header;
