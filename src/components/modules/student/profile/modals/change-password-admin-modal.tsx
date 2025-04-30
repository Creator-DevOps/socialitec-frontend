import ModalContainer from "@/components/containers/modal.container";
import { useForm } from "react-hook-form";
import { useToast } from "@/lib/hooks/use-toast";

interface ModalProps {
  visible?: boolean;
  onClose: () => void;
}

type PasswordForm = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const ChangePasswordModal = ({ visible = false, onClose }: ModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordForm>();
  const { toastSuccess, toastError, toastWarning } = useToast();
  const onSubmit = (data: PasswordForm) => {
    if (data.newPassword !== data.confirmPassword) {
      toastWarning({
        id: 103,
        title: "Advertencia",
        message: "Las contraseñas no coinciden",
      });
      return;
    }
    toastSuccess({
      id: 101,
      title: "¡Éxito!",
      message: "Contraseña cambiada correctamente",
    });

    reset();
    onClose();
  };

  return (
    <ModalContainer visible={visible} onClose={onClose}>
      <div className="flex flex-col gap-4 text-black p-6">
        <h2 className=" text-xl md:text-2xl font-bold text-primary mb-4 text-center">
          Cambiar Contraseña
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="currentPassword"
              className="font-semibold text-sm md:text-base"
            >
              Contraseña actual
            </label>
            <input
              id="currentPassword"
              type="password"
              {...register("currentPassword", {
                required: "Campo obligatorio",
              })}
              className="input"
            />
            {errors.currentPassword && (
              <p className="text-red-500 text-xs">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="newPassword"
              className="font-semibold text-sm md:text-base"
            >
              Nueva contraseña
            </label>
            <input
              id="newPassword"
              type="password"
              {...register("newPassword", {
                required: "Campo obligatorio",
                minLength: { value: 6, message: "Mínimo 6 caracteres" },
              })}
              className="input"
            />
            {errors.newPassword && (
              <p className="text-red-500 text-xs">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="confirmPassword"
              className="font-semibold text-sm md:text-base"
            >
              Confirmar nueva contraseña
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword", {
                required: "Campo obligatorio",
              })}
              className="input"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <div className="flex flex-row justify-center gap-4">
            <button className="cancel" onClick={onClose}>
              Cancalar
            </button>
            <button type="submit" className="create">
              Cambiar
            </button>
          </div>
        </form>
      </div>
    </ModalContainer>
  );
};

export default ChangePasswordModal;
