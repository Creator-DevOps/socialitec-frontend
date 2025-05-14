import { useState } from "react";
import ChangePasswordModal from "../modals/change-password-admin-modal";
import { useAuth } from "@/contexts/authContext";
const AdminProfile = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const getType = (type?: number) => {
    switch (type) {
      case 0:
        return "Administrador";
      case 1:
        return "Coordinador";
      case 2:
        return "Estudiante";
      default:
        return "Desconocido";
    }
  };

  return (
    <div className="flex flex-col w-full md:w-[80%]  items-center justify-start mx-auto p-8 gap-6">
      <div className="flex flex-col items-center md:w-100  border-1 border-gray-200 shadow p-4 rounded">
        <h2 className="font-bold text-xl md:text-2xl">
          {getType(user?.user_type)}
        </h2>
        <p>{user?.name}</p>
        <div className="flex flex-col gap-2 mt-6 w-full">
          {user?.user_type === 0 && (
            <div className="flex flex-row justify-between items-center w-full  py-2 px-4 bg-tertiary text-white rounded ">
              <p>
                <strong>Puesto: </strong>
              </p>
              <p>{user?.position}</p>
            </div>
          )}
          {user?.user_type === 1 && (
            <div
              className={`flex flex-row justify-between items-center w-full gap-4 py-2 px-4 bg-tertiary text-white rounded`}
            >
              <p >
                <strong>Departamento: </strong>
              </p>
              <p className="!text-xs !md:text-sm">{user?.departament}</p>
            </div>
          )}
          <div className="flex flex-row justify-between items-center w-full  py-2 px-4 bg-tertiary text-white rounded ">
            <p>
              <strong>Email: </strong>
            </p>
            <span className="underline text-gray-200 hover:text-white">{user?.email}</span>
          </div>
        </div>
      </div>

      {/**Password */}
      <button
        className="create w-40 py-2 px-4 h-auto rounded-lg"
        onClick={() => setIsModalOpen(true)}
      >
        Cambiar contraseña
      </button>
      {/* Modal */}
      <ChangePasswordModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
export default AdminProfile;
