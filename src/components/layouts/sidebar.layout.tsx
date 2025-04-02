import React, { ReactNode } from "react";
import { IconButton } from "@components/ui-componets/buttons/iconButton";
import Icon from "@icons/iconG.svg";
import Tooltip from "@components/ui-componets/general/toolTip";
import { useTranslation } from "react-i18next";

export type SidebarProps = {
  sidebarOpen?: boolean;
  onClose?: () => void;
  ragDisabled?: boolean;
  children?: ReactNode;
};

const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpen = false,
  onClose = () => {},
  ragDisabled = false,
  children,
}) => {
  const { t } = useTranslation();
  return (
    <aside
      className={`
      ${sidebarOpen ? "block" : "hidden"}
      w-65 pb-4 bg-gray-50 flex flex-col h-screen border border-gray-100
      fixed inset-y-0 left-0 z-50
      lg:static lg:inset-auto lg:z-auto
    `}
    >
      <div className="flex items-center justify-between px-4 py-2">
          <span className=" text-2xl md:text-3xl font-bold  text-primary ">
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
    </aside>
  );
};

export default Sidebar;
