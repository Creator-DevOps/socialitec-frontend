import { Routes, Route, Navigate } from "react-router-dom";
import routesConfig from "./routes";
import R404 from "@/pages/404";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AppRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/login" />} />
      {routesConfig.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
      <Route path="*" element={<R404 />} />
    </Routes>
  );
};

export default AppRoutes;

