import HomeLayout from "@/components/layouts/home.layout";
import Sidebar from "@/components/layouts/sidebar.layout";
import AdminMenu from "@/components/layouts/AdminMenu";
import StudentTable from "@components/modules/admin/student/index/student-table";
const AdminStudents = () => {
  return (
    <HomeLayout>
      <Sidebar>
        <AdminMenu />
      </Sidebar>
      <StudentTable/>
    </HomeLayout>
  );
};
export default AdminStudents;
