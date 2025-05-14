import React, { useEffect } from "react";
import ModalContainer from "@/components/containers/modal.container";
import { useForm } from "react-hook-form";
import { FormInput } from "@/components/forms/inputs/form-input";
import { useStudents } from "../index/student-context";


interface FormValues {
  name: string;
  email: string;
  control_number: string;
  major: string;
  semester: number;
  credits: number;
  password: string;
  confirmPassword: string;
  [key: string]: unknown;
}

const CreateStudentModal: React.FC = () => {
  const { isCreateOpen, closeCreate, handleCreate } = useStudents();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormValues,{ control_number: string; email: string, password:string, confirmPassword: string; }>();
  const password = watch("password", "");

  const onSubmit = async (data: FormValues) => {
    await handleCreate(data);
    //reset();
  };
  const controlNumber = watch("control_number");
  useEffect(() => {
    if (/^\d{8}$/.test(controlNumber)) {
      setValue("email", `${controlNumber}@leon.tecnm.mx`);
      setValue("password", `${controlNumber}`);
      setValue("confirmPassword", `${controlNumber}`);
    } else {
      setValue("email", "");
    }
  }, [controlNumber, setValue]);

  if (!isCreateOpen) return null;
  return (
    <ModalContainer visible onClose={closeCreate}>
      <div className="flex flex-col gap-6 md:px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary">
            Agregar nuevo Estudiante
          </h2>
          <p>Ingresa los datos del estudiante que deseas registrar.</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <FormInput
            name="name"
            label="Nombre"
            placeholder="Nombre del estudiante"
            register={register}
            errors={errors}
            rules={{ required: "Nombre es obligatorio" }}
          />
          <FormInput
            name="control_number"
            label="Número de control"
            placeholder="Número de control"
            register={register}
            errors={errors}
            rules={{
              required: "Número de control obligatorio",
              pattern: {
                value: /^\d{8}$/,
                message: "El número de control debe tener 8 dígitos",
              },
            }}
          />
          <FormInput
            name="email"
            label="Correo electrónico"
            placeholder="correo@leon.tecnm.mx"
            register={register}
            errors={errors}
            disabled={true}
          />
          <FormInput
            name="major"
            label="Carrera"
            placeholder="carrera"
            register={register}
            errors={errors}
            rules={{ required: "Carrera obligatorio" }}
          />
          <FormInput
            name="semester"
            label="Semestre"
            type="number"
            placeholder="Semestre actual"
            register={register}
            errors={errors}
            rules={{
              required: "Semestre obligatorio",
              min: { value: 0, message: "No se permiten números negativos" },
            }}
          />
          <FormInput
            name="credits"
            label="Creditos"
            type="number"
            placeholder="Número de creditos"
            register={register}
            errors={errors}
            rules={{
              required: "Número de creditos obligatorio",
              min: { value: 0, message: "No se permiten números negativos" },
            }}
          />
          <FormInput
            name="password"
            type="password"
            label="Contraseña"
            placeholder="Contraseña"
            register={register}
            errors={errors}
            disabled={true}

          />
          <FormInput
            name="confirmPassword"
            type="password"
            label="Confirmar contraseña"
            placeholder="Confirma la contraseña"
            register={register}
            errors={errors}
            disabled={true}
          />
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={closeCreate} className="cancel">
              Cancelar
            </button>
            <button type="submit" className="create">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </ModalContainer>
  );
};

export default CreateStudentModal;
