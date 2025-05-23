import React from 'react';
import { useTranslation } from 'react-i18next';
import Link from '@router/linkTo';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-primary py-8 px-4 sm:px-8 text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center text-center">
        <div>
          <h4 className="text-lg font-semibold mb-2">{t('LOGIN.FOOTER.ADDRESS.TITLE')}</h4>
          <Link to="/tecnm" className="hover:underline text-xs font-light !text-white">
            {t('LOGIN.FOOTER.ADDRESS.ITEM')}
          </Link>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-2">{t('LOGIN.FOOTER.INFORMATION.TITLE')}</h4>
          <ul className="text-sm space-y-1">
            <li>
              <Link to="/terms" className="!text-white hover:underline text-xs font-light">
                {t('LOGIN.FOOTER.INFORMATION.ITEM')}
              </Link>
            </li>
            <li>
              <Link to="/faqs" className="!text-white hover:underline text-xs font-light">
                {t('LOGIN.FOOTER.INFORMATION.ITEM3')}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-2">{t('LOGIN.FOOTER.ABOUT.TITLE')}</h4>
          <Link to="/socialitec" className="!text-white hover:underline text-xs font-light">
            {t('LOGIN.FOOTER.ABOUT.ITEM')}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
