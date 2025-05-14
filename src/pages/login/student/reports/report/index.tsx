import HomeLayout from "@/components/layouts/home.layout";
import Sidebar from "@/components/layouts/sidebar.layout";
import StudentMenu from "@components/layouts/StudentMenu";
import ReportsView from "@/components/modules/student/reports/cycle/index/reportCycleItem-table";
const StudentReport = () => {
    return (
      <HomeLayout>
      <Sidebar>
        <StudentMenu />
      </Sidebar>
      <ReportsView/>
    </HomeLayout>
    );
  };
  export default StudentReport;
  