import { useState } from "react";
import ChangePasswordModal from "../modals/change-password-student-modal";
import { ClassNames } from "@emotion/react";
import { useAuth } from "@/contexts/authContext";
const AdminProfile = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const status = "En proceso"; 
  const statusColor = {
    Pendiente: "text-gray-500",
    "En proceso": "text-green-500",
    Finalizado: "text-blue-500",
  }[status] || "text-gray-400";

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
        <h2 className="font-bold text-xl md:text-2xl">{getType(user?.user_type)}</h2>
        <p>{user?.name}</p>
        <p className=" py-2 px-4 text-center"><strong>{user?.major}</strong></p>
        <div className="flex flex-col gap-2 mt-6 w-full">
          <div className="flex flex-row justify-between items-center w-full  py-2 px-4 bg-tertiary text-white rounded ">
            <p>
              <strong>Matricula: </strong>
            </p>
            <p>{user?.control_number}</p>
          </div>
          <div className="flex flex-row justify-between items-center w-full  py-2 px-4 bg-tertiary text-white rounded ">
            <p>
              <strong>Email: </strong>
            </p>
            <span className="underline text-gray-200 hover:text-white">
              {user?.email}
            </span>
          </div>
          <div className="flex flex-row justify-between items-center w-full  py-2 px-4 bg-tertiary text-white rounded ">
            <p>
              <strong>Creditos: </strong>
            </p>
            <span >
              {user?.credits}
            </span>
          </div>
          <div className="flex flex-row justify-between items-center w-full  py-2 px-4 bg-tertiary text-white rounded ">
            <p>
              <strong>Semestre: </strong>
            </p>
            <span>
              {user?.semester}
            </span>
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
