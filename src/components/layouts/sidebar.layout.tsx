import React, { ReactNode, useEffect, useRef, useState } from "react";
import { IconButton } from "@components/ui-componets/buttons/iconButton";
import Icon from "@icons/iconG.svg";
import { useTranslation } from "react-i18next";
import LogoutModal from "./modals/logout-modal";
import { useLocation, useNavigate } from "react-router-dom";

export type SidebarProps = {
  sidebarOpen?: boolean;
  onClose?: () => void;
  ragDisabled?: boolean;
  children?: ReactNode;
};
export const useBackButtonLogout = (openLogoutModal: () => void) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname; 

      if (path === "/" || path === "/landing-page" || path === "/login") {
        openLogoutModal();
        navigate(window.location.pathname, { replace: true });
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [ navigate, openLogoutModal]);
};


const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpen = false,
  onClose = () => {},
  children,
}) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const closeLogoutModal = () => setShowLogoutModal(false);
  useBackButtonLogout(() => setShowLogoutModal(true));

  const { t } = useTranslation();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sidebarOpen &&
        window.innerWidth < 768 &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen, onClose]);

  return (
    <aside
    ref={sidebarRef}
      className={`
      ${sidebarOpen ? "block" : "hidden"}
      w-55 md:w-70 pb-4 bg-gray-50 flex flex-col h-full border border-gray-100
      fixed inset-y-0 left-0 z-50
      lg:static lg:inset-auto lg:z-auto
    `}
    >
      
      <div className="flex items-center justify-between px-4 py-2">
          <span className=" text-xl md:text-2xl font-bold  text-primary ">
          {t("TITLE")}
          </span>

        <IconButton
          onClick={onClose}
          tooltip={t("LAYOUT.SIDEBAR.CLOSE_SIDEBAR")}
        >
          <img src={Icon} alt="Icon" />
        </IconButton>
      </div>
      {children}
      <LogoutModal visible={showLogoutModal} onClose={closeLogoutModal} />
    </aside>
  );
};

export default Sidebar;
