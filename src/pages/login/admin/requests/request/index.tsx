import HomeLayout from "@/components/layouts/home.layout";
import Sidebar from "@/components/layouts/sidebar.layout";
import AdminMenu from "@/components/layouts/AdminMenu";
import RequestsPanelView from "@/components/modules/admin/requests/request/index/requestPanel-table";
const AdminRequests = () => {
  return (
    <HomeLayout>
      <Sidebar>
        <AdminMenu />
      </Sidebar>
      <RequestsPanelView />
    </HomeLayout>
  );
};
export default AdminRequests;
