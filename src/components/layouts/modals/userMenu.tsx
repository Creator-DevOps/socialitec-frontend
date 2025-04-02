import React, { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
interface User {
  id:string;
  role?:string;
  name:string;
  email:string;
}

interface UserMenuProps {
  user: User;
  onLogout: () => void;
  onClose: () => void;

}

const userMenu: React.FC<UserMenuProps> = ({ user, onLogout, onClose}) => {
  const { t } = useTranslation();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);



  return (
    <div
      ref={menuRef}
      className="p-2 absolute right-0 mt-2 w-50 sm:w-60 text-xs sm:text-base bg-white border border-gray-200 shadow-lg z-50"
      aria-label="Menú de usuario"
    >
      {/* Información de Usuario */}
      <div className="border-b border-gray-100 p-2">
        <p className="font-semibold text-gray-800">{user.name}</p>
        {user.role && (
          <p className="text-xs sm:text-sm text-gray-500">{user.role}</p>
        )}
      </div>
      <ul className="py-1">
        {/*Cerrar Sesión */}
        <li>
          <button
            onClick={onLogout}
            className="rounded-3xl w-full text-left block px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            {t("LAYOUT.USER_MENU.LOGOUT.TITLE")}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default userMenu;
