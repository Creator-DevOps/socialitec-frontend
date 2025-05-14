import HomeLayout from "@/components/layouts/home.layout";
import Sidebar from "@/components/layouts/sidebar.layout";
import StudentMenu from "@components/layouts/StudentMenu";
import TempleteView from "@components/modules/student/templates/index/template-table"
const StudentTemplates = () => {
  return (
    <HomeLayout>
      <Sidebar>
        <StudentMenu />
      </Sidebar>
      <TempleteView/>
    </HomeLayout>
  );
};
export default StudentTemplates;
