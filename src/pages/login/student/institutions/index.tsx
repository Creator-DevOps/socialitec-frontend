import HomeLayout from "@/components/layouts/home.layout";
import Sidebar from "@/components/layouts/sidebar.layout";
import StudentMenu from "@components/layouts/StudentMenu";
import InstitutionsView from "@/components/modules/student/institutions/index/institution-table";
const StudentsInstitutions = () => {
  return (
    <HomeLayout>
      <Sidebar>
        <StudentMenu/>
      </Sidebar>
      <InstitutionsView />
    </HomeLayout>
  );
};
export default StudentsInstitutions;
