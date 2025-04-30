import HomeLayout from "@/components/layouts/home.layout";
import Sidebar from "@/components/layouts/sidebar.layout";
import AdminMenu from "@/components/layouts/AdminMenu";
const AdminReleasesLetter = () => {
  return (
    <HomeLayout>
      <Sidebar>
        <AdminMenu />
      </Sidebar>
      {/**Contenido princcipal */}
    </HomeLayout>
  );
};
export default AdminReleasesLetter;
