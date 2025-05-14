import React, { useEffect } from "react";
import ModalContainer from "@/components/containers/modal.container";
import { useForm } from "react-hook-form";
import { FormInput } from "@/components/forms/inputs/form-input";
import { useStudents } from "../index/student-context";

interface FormValues {
  name: string;
  email?: string;
  control_number?: string;
  major?: string;
  semester?: number;
  credits?: number;
  password?: string;
  confirmPassword?: string;
  [key: string]: unknown;
}

const UpdateStudentModal: React.FC = () => {
  const { isEditOpen, selected, closeEdit, handleUpdate } = useStudents();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormValues>();
  const password = watch("password", "");

  useEffect(() => {
    if (selected) {
      setValue("name", selected.name);
      setValue("control_number", selected.control_number || "");
      setValue("major", selected.major || "");
      setValue("semester", selected.semester ?? 0);
      setValue("credits", selected.credits ?? 0);
    }
  }, [selected]);

  const onSubmit = async (data: FormValues) => {
    await handleUpdate(data);
    //reset();
  };

  const controlNumber = watch("control_number");

  useEffect(() => {
    if (/^\d{8}$/.test(controlNumber??"")) {
      setValue("email", `${controlNumber}@leon.tecnm.mx`);
    } else {
      setValue("email", "");
    }
  }, [controlNumber, setValue]);

  useEffect(() => {
    if (!isEditOpen) {
      reset();
    }
  }, [isEditOpen, reset]);
  if (!isEditOpen || !selected) return null;
  return (
    <ModalContainer visible onClose={closeEdit}>
      <div className="flex flex-col gap-6 md:px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary">Editar Estudiante</h2>
          <p>Modifica los datos del estudiante seleccionado.</p>
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
              valueAsNumber: true,
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
              valueAsNumber: true,
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
            rules={{
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                message:
                  "La contraseña debe tener al menos 8 caracteres, incluir mayúscula, minúscula, número y carácter especial",
              },
            }}
          />
          <FormInput
            name="confirmPassword"
            type="password"
            label="Confirmar contraseña"
            placeholder="Confirma la contraseña"
            register={register}
            errors={errors}
            rules={{
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                message:
                  "La contraseña debe tener al menos 8 caracteres, incluir mayúscula, minúscula, número y carácter especial",
              },
            }}
          />

          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={closeEdit} className="cancel">
              Cancelar
            </button>
            <button type="submit" className="create">
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </ModalContainer>
  );
};

export default UpdateStudentModal;
