// RecoverPasswordModal.tsx
import React from "react";
import ModalContainer from "@/components/containers/modal.container";
import { useForm } from "react-hook-form";
import { FormInput } from "@/components/forms/inputs/form-input";
import { useToast } from "@/lib/hooks/use-toast";
import { useRecoverPassword } from "@lib/api/api-hooks/use-recover-password";
import { useAuth } from "@/contexts/authContext";

interface ModalProps {
  visible?: boolean;
  onClose: () => void;
}

type PasswordForm = {
  email: string;
  control_number:string;

};

const RecoverPasswordModal: React.FC<ModalProps> = ({ visible = false, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordForm>();
  const {user,logout} = useAuth();

  const { toastSuccess, toastError, toastWarning } = useToast();
  const { recoverPassword, loading } = useRecoverPassword();

 const onSubmit = async (data: PasswordForm) => {
  try {
    await recoverPassword(data.email, data.control_number);
    toastSuccess({
      id: 161,
      title: "¡Éxito!",
      message: `Mensaje de recuperación enviado a ${data.email}`,
    });
    reset();
    onClose();
    logout();
  } catch (err: any) {
    // mapeo de errores crudos de la API a mensajes de UI
    let userMessage: string;
    switch (err.message) {
      case "Usuario no encontrado":
        userMessage = "Número de control o correo incorrectos";
        break;
      case "Otro error específico":
        userMessage = "Aquí tu otro mensaje personalizado";
        break;
      default:
        userMessage = err.message || "Error al recuperar contraseña";
    }

    toastError({
      id: 162,
      title: "Error",
      message: userMessage,
    });
  }
};

  if (!visible) return null;

  return (
    <ModalContainer visible={visible} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 text-black p-6">
        <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 text-center">
          Recuperar Contraseña
        </h2>

        <FormInput
          name="control_number"
          label="Número de control"
          placeholder="Escribe tu número de control"
          register={register}
          errors={errors}
          rules={{ required: "Campo obligatorio" }}
        />

        <FormInput
          name="email"
          label="Correo institucional"
          type="email"
          placeholder="correo@leon.tecnm.mx"
          register={register}
          errors={errors}
          rules={{
            required: "Campo obligatorio",
          }}
        />

        

        <div className="flex justify-center gap-4 pt-4">
          <button
            type="button"
            onClick={() => {
              reset();
              onClose();
            }}
            className="cancel"
          >
            Cancelar
          </button>
          <button type="submit" className="create" disabled={loading}>
            {loading ? "Recuperando..." : "Recuperar"}
          </button>
        </div>
      </form>
    </ModalContainer>
  );
};

export default RecoverPasswordModal;
