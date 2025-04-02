import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-primary py-8 px-4 sm:px-8 text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center text-center">
        <div>
          <h4 className="text-lg font-semibold mb-2">{t("LOGIN.FOOTER.ADDRESS.TITLE")}</h4>
          <p className="text-xs font-light">
          {t("LOGIN.FOOTER.ADDRESS.ITEM")}
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-2">{t("LOGIN.FOOTER.INFORMATION.TITLE")}</h4>
          <ul className="text-sm space-y-1">
            <li>
              <a href="/terminos" className="hover:underline text-xs font-light">
              {t("LOGIN.FOOTER.INFORMATION.ITEM")}
              </a>
            </li>
            <li>
              <a href="/politica-privacidad" className="hover:underline text-xs font-light">
              {t("LOGIN.FOOTER.INFORMATION.ITEM2")}
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:underline text-xs font-light">
              {t("LOGIN.FOOTER.INFORMATION.ITEM3")}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-2">{t("LOGIN.FOOTER.ABOUT.TITLE")}</h4>
          <a href="/faq" className="hover:underline text-xs font-light">
          {t("LOGIN.FOOTER.ABOUT.ITEM")}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
