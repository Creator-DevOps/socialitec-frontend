import HomeLayout from "@/components/layouts/home.layout";
import Sidebar from "@/components/layouts/sidebar.layout";
import AdminMenu from "@/components/layouts/AdminMenu";
import ProgramsView from "@/components/modules/admin/programs/index/program-table";
const AdminPrograms = () => {
  return (
    <HomeLayout>
      <Sidebar>
        <AdminMenu />
      </Sidebar>
      <ProgramsView />
    </HomeLayout>
  );
};
export default AdminPrograms;
