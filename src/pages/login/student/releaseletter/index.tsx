import HomeLayout from "@/components/layouts/home.layout";
import Sidebar from "@/components/layouts/sidebar.layout";
import StudentMenu from "@components/layouts/StudentMenu";
const StudentReleaseLetter = () => {
    return (
      <HomeLayout>
      <Sidebar>
        <StudentMenu />
      </Sidebar>
      {/**Contenido princcipal */}
    </HomeLayout>
    );
  };
  export default StudentReleaseLetter;
  