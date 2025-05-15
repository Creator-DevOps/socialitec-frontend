import React, { useState } from "react";
import AnimatedModalContainer from "@/components/containers/modal.container";
import { t } from "i18next";
import { useAuth } from "@contexts/authContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/lib/hooks/use-toast";
interface LogoutModalProps {
  visible: boolean;
  onClose: () => void;
  
}

const LogoutModal = ({ visible, onClose }: LogoutModalProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { toastSuccess, toastError, toastWarning } = useToast();

  const handleLogout = async () => {
    setTimeout(() => {
      logout();       
      onClose(); 
       toastSuccess({
      id: 192,
      title: "¡Éxito!",
      message: "Cierre de sessión exitoso",
    });    
      navigate("/login", { replace: true });
    }, 500); 
  };
  

  if (!visible) return null;

  return (
    
    <AnimatedModalContainer visible={visible} onClose={onClose}>
      
      <div className="flex flex-col">
        <h2 className="text-base sm:text-xl font-semibold mb-4">
          {t("LAYOUT.USER_MENU.LOGOUT.CONFIRM")}
        </h2>
        <p className="mb-6 text-sm sm:text-base">
          {t("LAYOUT.USER_MENU.LOGOUT.TEXT")}{" "}
        </p>
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="cancel">
            {t("CANCEL")}
          </button>
          <button onClick={handleLogout} className="delete">
            {t("LAYOUT.USER_MENU.LOGOUT.TITLE2")}
          </button>
        </div>
      </div>
    </AnimatedModalContainer>
  );
};

export default LogoutModal;
