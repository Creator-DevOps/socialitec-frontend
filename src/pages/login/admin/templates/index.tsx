import HomeLayout from "@/components/layouts/home.layout";
import Sidebar from "@/components/layouts/sidebar.layout";
import AdminMenu from "@/components/layouts/AdminMenu";
import TemplateTable from "@/components/modules/admin/templates/index/template-table";
const AdminTemplates = () => {
  return (
    <HomeLayout>
      <Sidebar>
        <AdminMenu />
      </Sidebar>
      <TemplateTable />
    </HomeLayout>
  );
};
export default AdminTemplates;
