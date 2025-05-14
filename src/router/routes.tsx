import Login from "@/pages/login/index";
import TecNM from "@/components/ui-componets/general/TecNM";
import SocialService from "@/components/ui-componets/general/SocialService";
import SocialITEC from "@/components/ui-componets/general/SocialITEC";
import Faqs from "@/components/ui-componets/general/Faqs";
import Terms from "@/components/ui-componets/general/TermsConditions";

import AdminProfile from "@/pages/login/admin";
import AdminCoordinators from "@/pages/login/admin/coordinators";
import AdminInstitutions from "@/pages/login/admin/institutions";
import AdminPrograms from "@/pages/login/admin/programs";
import AdminReleasesLetter from "@/pages/login/admin/releaseletter";
import AdminReports from "@/pages/login/admin/reports";
import AdminRequests from "@/pages/login/admin/requests";
import AdminPanelRequest  from "@/pages/login/admin/requests/request";
import AdminStudents from "@/pages/login/admin/students";
import AdminTemplates from "@/pages/login/admin/templates";
import AdminCycleReport from "@pages/login/admin/reports/cicleItem/";
import AdminReport from "@pages/login/admin/reports/report";

import StudentProfile from "@/pages/login/student/index";
import StudentReleaseLetter from "@/pages/login/student/releaseletter";
import StudentReports from "@/pages/login/student/reports";
import StudentReport from "@/pages/login/student/reports/report";
import StudentRequest from "@/pages/login/student/request";
import StudentTemplates from "@/pages/login/student/templates";
import StudentInstitutios from "@pages/login/student/institutions"

const routesConfig = [

  //Admin
  { path: "/admin/:id/profile", element: <AdminProfile /> },
  { path: "/admin/:id/coordinators", element: <AdminCoordinators /> },
  { path: "/admin/:id/institutions", element: <AdminInstitutions /> },
  { path: "/admin/:id/programs", element: <AdminPrograms /> },
  { path: "/admin/:id/release-letters", element: <AdminReleasesLetter /> },
  { path: "/admin/:id/cycles", element: <AdminReports /> },
  { path: "/admin/:id/cycles/:cycleId/reports", element: <AdminCycleReport/> },
  { path: "/admin/:id/cycles/:cycleId/reports/:itemId", element: <AdminReport/> },
  { path: "/admin/:id/requests", element: <AdminRequests /> },
  { path: "/admin/:id/requests/:requestId", element: <AdminPanelRequest /> },
  { path: "/admin/:id/students", element: <AdminStudents /> },
  { path: "/admin/:id/templates", element: <AdminTemplates /> },

  //Student
  { path: "/student/:id/profile", element: <StudentProfile /> },
  { path: "/student/:id/institutions", element: <StudentInstitutios/> },
  { path: "/student/:id/release-letter", element: <StudentReleaseLetter /> },
  { path: "/student/:id/request", element: <StudentRequest /> },
  { path: "/student/:id/reports/:cycleId", element: <StudentReports/> },
  { path: "/student/:id/reports/:cycleId/:itemId", element: <StudentReport/> },
  { path: "/student/:id/templates", element: <StudentTemplates /> },

];

export default routesConfig;
