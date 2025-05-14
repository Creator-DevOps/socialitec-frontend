import HomeLayout from "@/components/layouts/home.layout";
import Sidebar from "@/components/layouts/sidebar.layout";
import AdminMenu from "@/components/layouts/AdminMenu";
import InstitutionsView from "@/components/modules/admin/institutions/index/institution-table";
const AdminInstitutions = () => {
  return (
    <HomeLayout>
      <Sidebar>
        <AdminMenu />
      </Sidebar>
      <InstitutionsView />
    </HomeLayout>
  );
};
export default AdminInstitutions;
