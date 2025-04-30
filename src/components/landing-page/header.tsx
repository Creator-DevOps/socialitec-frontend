import TecNMICON from "@images/png/socialitec.svg";
import TecNMICONWHITE from "@images/png/itlwhite.svg";
import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();
  const handleAccess = () => {
    navigate("/login", { replace: true });
  };
  return (
    <div className="flex flex-row justify-between fixed top-0 left-0 right-0 z-10  shadow bg-primary h-20 w-full items-center py-4 px-4 md:px-8 gap-4">
      <img src={TecNMICON} alt="TecNMICON" className=" hidden md:block h-12" />
      <img src={TecNMICONWHITE} alt="TecNMICON" className="md:hidden h-12" />
      <div className="flex flex-row items-center gap-4">
        <nav>
          <ul className="flex flex-row gap-4 md:gap-8 font-bold text-white text-xs md:text-sm ">
            <li className="hover:text-gray-300 transition-transform transform hover:scale-110">
              <a href="/tecnm">TecNM</a>
            </li>
            <li className="hover:text-gray-300 transition-transform transform hover:scale-110">
              <a href="/social-service">Servicio Social</a>
            </li>
            <li className="hover:text-gray-300 transition-transform transform hover:scale-110">
              <a href="/socialitec">SocialITEC</a>
            </li>
          </ul>
        </nav>
        <button className="create" onClick={handleAccess}>
          Acceder
        </button>
      </div>
    </div>
  );
};
export default Header;
