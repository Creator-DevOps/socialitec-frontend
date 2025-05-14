import { Routes, Route, Navigate } from "react-router-dom";
import routesConfig from "./routes";
import R404 from "@/pages/404";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProtectedRoute from "@components/ProtectedRoute";
import Login from "@/pages/login/index";
import LandingPage from "@/components/landing-page/LandingPage";
import TecNM from "@/components/ui-componets/general/TecNM";
import SocialService from "@/components/ui-componets/general/SocialService";
import SocialITEC from "@/components/ui-componets/general/SocialITEC";
import Faqs from "@/components/ui-componets/general/Faqs";
import Terms from "@/components/ui-componets/general/TermsConditions";

const AppRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { pathname, search, hash } = location;
    if (pathname.length > 1 && pathname.endsWith("/")) {
      const newPath = pathname.replace(/\/+$/, "");
      navigate(`${newPath}${search}${hash}`, { replace: true });
    }
  }, [location, navigate]);

  return (
    <Routes>

      <Route path="/" element={<Navigate replace to="/landing-page" />} />
      <Route path="/landing-page" element={<LandingPage />} />
      <Route path="*" element={<R404 />} />
      <Route path="/login" element={<Login />} />
      <Route path="/tecnm" element={<TecNM />} />
      <Route path="/social-service" element={<SocialService />} />
      <Route path="/socialitec" element={<SocialITEC />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/faqs" element={<Faqs />} />
      {/**Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<Navigate replace to="/admin/:id" />} />
        <Route
          path="/student"
          element={<Navigate replace to="/student/:id" />}
        />
        <Route
          path="/admin/:id"
          element={<Navigate replace to="/admin/:id/profile" />}
        />
        <Route
          path="/student/:id"
          element={<Navigate replace to="/student/:id/profile" />}
        />
        {routesConfig.map(({ path, element }) => (
          <Route key={path} path={`/${path}`} element={element} />
        ))}
      </Route>
      <Route path="*" element={<R404 />} />
    </Routes>
  );
};

export default AppRoutes;
