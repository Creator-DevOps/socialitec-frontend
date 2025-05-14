import React, { useState } from "react";
import { IconButton } from "@components/ui-componets/buttons/iconButton";
import Icon from "@icons/iconG.svg";
import { useTranslation } from "react-i18next";
import UserIcon from "@images/icons/user.svg";
import { useNavigate } from "react-router-dom";
import Link from "@router/linkTo";
import UserMenu from "@/components/layouts/modals/userMenu";
import {useAuth } from "@/contexts/authContext";
import LogoutConfirmationModal from "@/components/layouts/modals/logout-modal";
type HeaderProps = {
  sidebarOpen: boolean;
  onSidebarOpen: () => void;
};

const Header: React.FC<HeaderProps> = ({ sidebarOpen, onSidebarOpen }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {user} = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const toggleUserMenu = () => setIsUserMenuOpen((prev) => !prev);
  const closeUserMenu = () => setIsUserMenuOpen(false);

  {
    /**Modal para confirmar el cierre de la sesión */
  }
  const handleOpenLogoutModal = () => {
    closeUserMenu();
    setIsLogoutModalOpen(true);
  };

  const handleCloseLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    navigate("/");
  };

  return (
    <header className="flex items-center justify-between px-4 py-2 ">
      {!sidebarOpen && (
        <div className="flex items-center space-x-2">
          <IconButton
            onClick={onSidebarOpen}
            tooltip={t("LAYOUT.HEADER.BAR_ICON")}
          >
            <img src={Icon} alt="Icon" />
          </IconButton>
          
        </div>
      )}

      <div className="flex flex-1 text-center">
        <nav className="flex-1 flex justify-center gap-4 md:gap-10">
          <Link
            to="/tecnm"
            className="hover:underline text-secondary text-sm md:text-sm"
          >
            {t("LOGIN.HEADER.ABOUTTEC")}
          </Link>
          <Link
            to="/social-service"
            className="hover:underline text-secondary text-sm md:text-sm"
          >
            {t("LOGIN.HEADER.SERVICE")}
          </Link>
          <Link
            to="/socialitec"
            className="hover:underline text-secondary text-sm md:text-sm"
          >
            {t("LOGIN.HEADER.SOCIALITEC")}
          </Link>
        </nav>
      </div>

      <div className="relative">
        <div className="flex flex-row">
        {/* <LanguageToggle /> */}
          <IconButton
            onClick={toggleUserMenu}
            tooltip={t("LAYOUT.HEADER.USER_ICON")}
          >
            <img src={UserIcon} alt="Person Icon" className="icon-size" />
          </IconButton>
        </div>

        {isUserMenuOpen && user && (
          <UserMenu
            user={user}
            onClose={closeUserMenu}
            onLogout={handleOpenLogoutModal}
          />
        )}
      </div>

      <LogoutConfirmationModal
        visible={isLogoutModalOpen}
        onClose={handleCloseLogoutModal}
      />
    </header>
  );
};

export default Header;
