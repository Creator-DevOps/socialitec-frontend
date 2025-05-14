import HomeLayout from "@/components/layouts/home.layout";
import Sidebar from "@/components/layouts/sidebar.layout";
import StudentMenu from "@components/layouts/StudentMenu";
import LettersView from "@/components/modules/student/releaseletter/index/letter-table";
const StudentReleaseLetter = () => {
  return (
    <HomeLayout>
      <Sidebar>
        <StudentMenu />
      </Sidebar>
      <LettersView />
    </HomeLayout>
  );
};
export default StudentReleaseLetter;
