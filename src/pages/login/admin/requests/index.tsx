import HomeLayout from "@/components/layouts/home.layout";
import Sidebar from "@/components/layouts/sidebar.layout";
import AdminMenu from "@/components/layouts/AdminMenu";
import RequestsView from "@/components/modules/admin/requests/index/request-table";
const AdminRequests = () => {
  return (
    <HomeLayout>
      <Sidebar>
        <AdminMenu />
      </Sidebar>
      <RequestsView />
    </HomeLayout>
  );
};
export default AdminRequests;
