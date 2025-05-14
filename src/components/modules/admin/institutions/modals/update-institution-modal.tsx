import React, { useEffect } from "react";
import ModalContainer from "@/components/containers/modal.container";
import { useForm } from "react-hook-form";
import { FormInput } from "@/components/forms/inputs/form-input";
import { useInstitutions } from "../index/institution-context";

interface FormValues {
  institution_name?: string;
  description?: string;
  email?: string;
  phone?: string;
  neighborhood?: string;
  street?: string;
  number?: string;
  postal_code?: string;
  [key: string]: unknown;
}

const UpdateInstitutionModal: React.FC = () => {
  const { isEditOpen, selected, closeEdit, handleUpdate } = useInstitutions();
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
      setValue("institution_name", selected.institution_name||"");
      setValue("description", selected.description || "");
      setValue("email", selected.email || "");
      setValue("phone", selected.phone || "");
      setValue("neighborhood", selected.neighborhood || "");
      setValue("street", selected.street || "");
      setValue("number", selected.number || "");
      setValue("postal_code", selected.postal_code || "");
    }
  }, [selected]);

  const onSubmit = async (data: FormValues) => {
    await handleUpdate(data);
    //reset();
  };

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
          <h2 className="text-2xl font-bold text-primary">
            Editar Institución
          </h2>
          <p>Modifica los datos de la institución seleccionada.</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <FormInput
            name="institution_name"
            label="Nombre"
            placeholder="Nombre de la institución"
            register={register}
            errors={errors}
            rules={{ required: "Nombre obligatorio" }}
          />
          <FormInput
            name="description"
            label="Descripción"
            placeholder="Descripción de la institución"
            register={register}
            errors={errors}
            rules={{ required: "Descripción obligatoria" }}
          />
          <FormInput
            name="email"
            label="Correo electrónico"
            placeholder="correo@gmail.com"
            register={register}
            errors={errors}
          />
          <FormInput
            name="phone"
            label="Teléfono"
            placeholder="Teléfono de la institución"
            register={register}
            errors={errors}
            rules={{ required: "Teléfono obligatorio" }}
          />
          <FormInput
            name="neighborhood"
            label="Colonia/Localidad"
            placeholder="Colonia/Localidad de la institución"
            register={register}
            errors={errors}
            rules={{
              required: "localidad obligatoria",
            }}
          />
          <FormInput
            name="street"
            label="Calle"
            placeholder="Calle de la institución"
            register={register}
            errors={errors}
            rules={{
              required: "Calle obligatoria",
            }}
          />
          <FormInput
            name="number"
            label="Número"
            placeholder="Número exterior de la institución"
            register={register}
            errors={errors}
            rules={{
              required: "Número obligatorio",
            }}
          />
          <FormInput
            name="postal_code"
            label="Código postal"
            placeholder="Código postal de la institución"
            register={register}
            errors={errors}
            rules={{
              required: "Código postal obligatorio",
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

export default UpdateInstitutionModal;
