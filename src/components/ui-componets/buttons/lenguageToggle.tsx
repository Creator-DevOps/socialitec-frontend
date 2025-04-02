import React from "react";
import { IconButton } from "@components/ui-componets/buttons/iconButton";
import { useTranslation } from "react-i18next";

import Lenguaje from "@icons/lenguage.svg";

const LanguageToggle: React.FC = () => {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language || "es";

  const handleLangChange = () => {
    const newLang = currentLang === "es" ? "en" : "es";
    i18n.changeLanguage(newLang);
    
  };

  return (
    <IconButton
      onClick={handleLangChange}
      tooltip={t("LAYOUT.HEADER.CHANGE_LANGUAGE", "Cambiar idioma")}
    >
      <img
        src={Lenguaje}
        alt={t("LAYOUT.HEADER.CHANGE_LANGUAGE", "Cambiar idioma")}
        className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8"
      />
    </IconButton>
  );
};

export default LanguageToggle;
