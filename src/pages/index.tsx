import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "@styles/index.css";
import "@styles/external.styles.css";
import Loader from "@components/ui-componets/load/Loader";
import "@base/i18n";
import "@styles/global.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@contexts/authContext";
import AppRoutes from "@/router/index";
import { ToastProvider } from "@lib/hooks/use-toast";

function Root() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  return isLoading ? (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <Loader />
    </div>
  ) : (
    <AuthProvider>
      <BrowserRouter>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
