import React from "react";
import { useTranslation } from "react-i18next";
import Icon from "@icons/iconG.svg";
import Link from "@router/linkTo";
import LanguageToggle from "@components/ui-componets/buttons/lenguageToggle";
import { replace, useNavigate } from "react-router";

const Header: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/landing-page", { replace: true });
  };
  return (
    <header className="flex items-center justify-between px-4 sm:px-8 py-4 relative ">
      <img src={Icon} alt="Ícono" className="w-10 h-10 md:hidden " />
      <nav className="flex-1 flex justify-center space-x-2 sm:space-x-4">
        <Link
          to="/tecnm"
          className="hover:underline text-secondary text-[12px] md:text-sm"
        >
          {t("LOGIN.HEADER.ABOUTTEC")}
        </Link>
        <Link
          to="/social-service"
          className="hover:underline text-secondary text-[12px] md:text-sm"
        >
          {t("LOGIN.HEADER.SERVICE")}
        </Link>
        <Link
          to="/socialitec"
          className="hover:underline text-secondary text-[12px] md:text-sm"
        >
          {t("LOGIN.HEADER.SOCIALITEC")}
        </Link>
      </nav>
      <button className="create" onClick={handleBack}>
        Regresar
      </button>
      {/* <LanguageToggle /> */}
    </header>
  );
};

export default Header;
