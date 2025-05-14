// ChangePasswordModal.tsx
import React from "react";
import ModalContainer from "@/components/containers/modal.container";
import { useForm } from "react-hook-form";
import { FormInput } from "@/components/forms/inputs/form-input";
import { useToast } from "@/lib/hooks/use-toast";
import { useChangePassword } from "@lib/api/api-hooks/use-change-password";
import { useAuth } from "@/contexts/authContext";

interface ModalProps {
  visible?: boolean;
  onClose: () => void;
}

type PasswordForm = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const ChangePasswordModal: React.FC<ModalProps> = ({ visible = false, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordForm>();
  const {logout}= useAuth();
  const { toastSuccess, toastError, toastWarning } = useToast();
  const { changePassword, loading } = useChangePassword();

  const onSubmit = async (data: PasswordForm) => {

    if (data.newPassword !== data.confirmPassword) {
      toastWarning({
        id: 133,
        title: "Advertencia",
        message: "Las contraseñas no coinciden",
      });
      return;
    }


    try {
      const res = await changePassword(data.currentPassword, data.newPassword);
      toastSuccess({
        id: 134,
        title: "¡Éxito!",
        message: res.message,
      });
      reset();
      onClose();
      logout();
    } catch (err: any) {
      toastError({
        id: 135,
        title: "Error",
        message: err.message || "Error al cambiar contraseña",
      });
    }
  };

  if (!visible) return null;

  return (
    <ModalContainer visible={visible} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 text-black p-6">
        <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 text-center">
          Cambiar Contraseña
        </h2>

        <FormInput
          name="currentPassword"
          label="Contraseña actual"
          type="password"
          placeholder="Escribe tu contraseña actual"
          register={register}
          errors={errors}
          rules={{ required: "Campo obligatorio" }}
        />

        <FormInput
          name="newPassword"
          label="Nueva contraseña"
          type="password"
          placeholder="Nueva contraseña"
          register={register}
          errors={errors}
          rules={{
            required: "Campo obligatorio",
            minLength: { value: 6, message: "Mínimo 6 caracteres" },
          }}
        />

        <FormInput
          name="confirmPassword"
          label="Confirmar nueva contraseña"
          type="password"
          placeholder="Confirma la contraseña"
          register={register}
          errors={errors}
          rules={{ required: "Campo obligatorio" }}
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
            {loading ? "Cambiando..." : "Cambiar"}
          </button>
        </div>
      </form>
    </ModalContainer>
  );
};

export default ChangePasswordModal;
