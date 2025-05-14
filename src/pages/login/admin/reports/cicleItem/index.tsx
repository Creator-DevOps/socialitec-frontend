import HomeLayout from "@/components/layouts/home.layout";
import Sidebar from "@/components/layouts/sidebar.layout";
import AdminMenu from "@/components/layouts/AdminMenu";
import ReportsCycleItemView from "@/components/modules/admin/reports/cycle/index/reportCycleItem-table"
const AdminReports = () => {
  return (
    <HomeLayout>
      <Sidebar>
        <AdminMenu />
      </Sidebar>
      <ReportsCycleItemView/>
    </HomeLayout>
  );
};
export default AdminReports;
