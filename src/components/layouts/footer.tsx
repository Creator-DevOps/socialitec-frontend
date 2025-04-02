import React from "react";
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <footer className="p-1 text-center">
      <span className="text-secondary font-normal  text-[8px] sm:text-xs">{t("LAYOUT.FOOTER.TITLE")}</span>
    </footer>
  );
};


export default Footer;
