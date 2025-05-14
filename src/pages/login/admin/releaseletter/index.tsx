import HomeLayout from "@/components/layouts/home.layout";
import Sidebar from "@/components/layouts/sidebar.layout";
import AdminMenu from "@/components/layouts/AdminMenu";
import LetterView from "@components/modules/admin/releasesletter/index/letter-table"
const AdminReleasesLetter = () => {
  return (
    <HomeLayout>
      <Sidebar>
        <AdminMenu />
      </Sidebar>
      <LetterView/>
    </HomeLayout>
  );
};
export default AdminReleasesLetter;
