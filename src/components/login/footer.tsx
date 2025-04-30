import React from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-primary py-8 px-4 sm:px-8 text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center text-center">
        <div>
          <h4 className="text-lg font-semibold mb-2">{t("LOGIN.FOOTER.ADDRESS.TITLE")}</h4>
          <a href="/tecnm" className="hover:underline text-xs font-light">
              {t("LOGIN.FOOTER.ADDRESS.ITEM")}
              </a>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-2">{t("LOGIN.FOOTER.INFORMATION.TITLE")}</h4>
          <ul className="text-sm space-y-1">
            <li>
              <a href="/terms" className="hover:underline text-xs font-light">
              {t("LOGIN.FOOTER.INFORMATION.ITEM")}
              </a>
            </li>
            <li>
              <a href="/faqs" className="hover:underline text-xs font-light">
              {t("LOGIN.FOOTER.INFORMATION.ITEM3")}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-2">{t("LOGIN.FOOTER.ABOUT.TITLE")}</h4>
          <a href="/socialitec" className="hover:underline text-xs font-light">
          {t("LOGIN.FOOTER.ABOUT.ITEM")}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
