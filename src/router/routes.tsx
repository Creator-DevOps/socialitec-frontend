import Login from "@/pages/login/index";
import Student from "@/pages/login/student/index";
import TecNM from "@/components/ui-componets/general/TecNM";
import SocialService from "@/components/ui-componets/general/SocialService";
import SocialITEC from "@/components/ui-componets/general/SocialITEC";
import R404 from "@pages/404";

const routesConfig = [
  { path: "login", element: <Login /> },  
  { path: "student", element: <Student/> },
  { path: "tecnm", element: <TecNM/> },
  { path: "social-service", element: <SocialService/> },
  { path: "socialitec", element: <SocialITEC/> },
  { path: "*", element: <R404 /> },
];

export default routesConfig;
