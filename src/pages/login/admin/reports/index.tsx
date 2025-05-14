import HomeLayout from "@/components/layouts/home.layout";
import Sidebar from "@/components/layouts/sidebar.layout";
import AdminMenu from "@/components/layouts/AdminMenu";
import ReportsCycleView from "@/components/modules/admin/reports/index/reportCycle-table";
const AdminReports = () => {
  return (
    <HomeLayout>
      <Sidebar>
        <AdminMenu />
      </Sidebar>
      <ReportsCycleView/>
    </HomeLayout>
  );
};
export default AdminReports;
