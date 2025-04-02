import { useNavigate } from "react-router-dom";
import { IconButton } from "@/components/ui-componets/buttons/iconButton";
import Home from "@icons/home.svg";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center flex-col">
      <h1 className="font-extrabold text-6xl text-primary">404</h1>
      <span className="text-2xl font-bold">{t("ERROR404.TITLE")}</span>
      <span className="text-gray-800 text-[10px] sm:text-xs mb-4">{t("ERROR404.MESSAGE")}</span>

      <IconButton className="flex flex-col text-center items-center" onClick={goBack}>
        <img src={Home} alt="Home Icon" className="icon-size" />
        <span className="text-[10px] sm:text-sm font-medium">{t("ERROR404.BACK")}</span>
      </IconButton>
    </div>
  );
}
