import HomeLayout from "@/components/layouts/home.layout";
import Sidebar from "@/components/layouts/sidebar.layout";
import AdminMenu from "@/components/layouts/AdminMenu";
import CoordinatorTable  from "@components/modules/admin/coordinator/index/coordinator-table";
const AdminCoordinators = () => {
  return (
    <HomeLayout>
      <Sidebar>
        <AdminMenu />
      </Sidebar>
      <CoordinatorTable/>
    </HomeLayout>
  );
};
export default AdminCoordinators;
