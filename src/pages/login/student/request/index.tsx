import HomeLayout from "@/components/layouts/home.layout";
import Sidebar from "@/components/layouts/sidebar.layout";
import StudentMenu from "@components/layouts/StudentMenu";
import RequestsView from "@/components/modules/student/request/index/request-table";
const StudentRequest = () => {
    return (
      <HomeLayout>
      <Sidebar>
        <StudentMenu />
      </Sidebar>
      <RequestsView/>
    </HomeLayout>
    );
  };
  export default StudentRequest;
  