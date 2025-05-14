import HomeLayout from "@/components/layouts/home.layout";
import Sidebar from "@/components/layouts/sidebar.layout";
import AdminMenu from "@/components/layouts/AdminMenu";
import AdminProfileView from "@/components/modules/admin/profile/index/profile";
const AdminProfile = () => {
  return (
    <HomeLayout>
      <Sidebar>
        <AdminMenu />
      </Sidebar>
      <AdminProfileView/>
    </HomeLayout>
  );
};
export default AdminProfile;
