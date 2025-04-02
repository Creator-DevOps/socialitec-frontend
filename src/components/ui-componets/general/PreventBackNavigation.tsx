import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PreventBackNavigation = () => {
  const location = useLocation(); // Obtiene la ubicación actual

  useEffect(() => {
    // Agrega una nueva entrada en el historial sin cambiar la URL
    window.history.pushState(null, "", window.location.href);

    const handleBackButton = () => {
      window.history.pushState(null, "", window.location.href);
    };

    // Detectar cuando el usuario presiona el botón "Atrás"
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [location]);

  return null; // No renderiza nada
};

export default PreventBackNavigation;
