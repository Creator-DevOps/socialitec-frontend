import HomeLayout from "@/components/layouts/home.layout";
import Sidebar from "@/components/layouts/sidebar.layout";
import StudentMenu from "@components/layouts/StudentMenu";
import StudentProfiles from "@components/modules/student/profile/index/profile"

const StudentProfile = () => {
  return (
    <HomeLayout>
      <Sidebar>
        <StudentMenu />
      </Sidebar>
      <StudentProfiles/>
    </HomeLayout>
  );
};

export default StudentProfile;
