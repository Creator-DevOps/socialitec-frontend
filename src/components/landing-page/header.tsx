import TecNMICON from "@images/png/socialitec.svg";
import TecNMICONWHITE from "@images/png/itlwhite.svg";
import { Link, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

const Header = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleAccess = () => {
    navigate("/login", { replace: true });
  };
  return (
    <div className="flex flex-row justify-between fixed top-0 left-0 right-0 z-10  shadow bg-primary h-20 w-full items-center py-4 px-4 md:px-8 gap-4">
      <img src={TecNMICON} alt="TecNMICON" className=" hidden md:block h-12" />
      <img src={TecNMICONWHITE} alt="TecNMICON" className="md:hidden h-12" />
      <div className="flex flex-row items-center gap-4">
          <Link
          to="/tecnm"
          className="!text-white hover:underline text-secondary text-[12px] md:text-sm"
        >
          {t("LOGIN.HEADER.ABOUTTEC")}
        </Link>
        <Link
          to="/social-service"
          className="!text-white hover:underline text-secondary text-[12px] md:text-sm"
        >
          {t("LOGIN.HEADER.SERVICE")}
        </Link>
        <Link
          to="/socialitec"
          className="!text-white hover:underline text-secondary text-[12px] md:text-sm"
        >
          {t("LOGIN.HEADER.SOCIALITEC")}
        </Link>
        <button className="create" onClick={handleAccess}>
          Acceder
        </button>
      </div>
    </div>
  );
};
export default Header;
