import React from "react";
import AnimatedModalContainer from "@/components/containers/modal.container"; 
import { t } from "i18next";
interface LogoutConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutConfirmationModal: React.FC<LogoutConfirmationModalProps> = ({
  visible,
  onClose,
  onConfirm
}) => {
  return (
    <AnimatedModalContainer visible={visible} onClose={onClose}>
      <div className="flex flex-col">
        <h2 className="text-base sm:text-xl font-semibold mb-4">{t("LAYOUT.USER_MENU.LOGOUT.CONFIRM")}</h2>
        <p className="mb-6 text-sm sm:text-base">
        {t("LAYOUT.USER_MENU.LOGOUT.TEXT")}        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="cancel"
          >
            {t("CANCEL")}
          </button>
          <button
            onClick={onConfirm}
            className="delete"
          >
            {t("LAYOUT.USER_MENU.LOGOUT.TITLE2")}
          </button>
        </div>
      </div>
    </AnimatedModalContainer>
  );
};

export default LogoutConfirmationModal;
