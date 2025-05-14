import React, { useEffect } from "react";
import ModalContainer from "@/components/containers/modal.container";
import { useForm } from "react-hook-form";
import { FormInput } from "@/components/forms/inputs/form-input";
import { usePrograms } from "../index/program-context";
import { useGetAllInstitutions } from "@lib/api/api-hooks/institutions/use-get-all-institutions";

interface FormValues {
  institution_id: number;
  program_name: string;
  description: string;
  activities: string;
  supervisor_name: string;
  supervisor_phone: string;
  supervisor_email: string;
  [key: string]: unknown;
}

const CreateProgramModal: React.FC = () => {
  const { isCreateOpen, closeCreate, handleCreate } = usePrograms();
  const { institutions, loading, refetch } = useGetAllInstitutions();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormValues>();
  const password = watch("password", "");

  const onSubmit = async (data: FormValues) => {
    await handleCreate(data);
    //reset();
  };

  if (!isCreateOpen) return null;
  return (
    <ModalContainer visible onClose={closeCreate}>
      <div className="flex flex-col gap-6 md:px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary">
            Agregar nueva Programa
          </h2>
          <p>Ingresa los datos de la programa que deseas registrar.</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <FormInput
            name="program_name"
            label="Nombre"
            placeholder="Nombre de la programa"
            register={register}
            errors={errors}
            rules={{ required: "Nombre obligatorio" }}
          />
          <div className="flex flex-col gap-1 mb-6 w-full text-left ">
            <label
              htmlFor="institutions"
              className="font-semibold text-xs md:text-sm"
            >
              Institución
            </label>
            <select
              id="institutions"
              className={`border-b border-gray-300 focus:outline-none focus:border-secondary
              text-xs md:text-sm py-1 
              ${errors.institution_id ? "border-red-500" : ""}`}
              defaultValue=""
              {...register("institution_id", {
                required: "Institución obligatoria",
                valueAsNumber: true,
              })}
            >
              <option value="" disabled>
                — Selecciona una institución —
              </option>
              {institutions.map((institution) => (
                <option
                  key={institution.institution_id}
                  value={institution.institution_id}
                >
                  {institution.institution_name}
                </option>
              ))}
            </select>
            {errors.institution_id && (
              <p className="text-red-500 !text-sm mt-1">
                {errors.institution_id.message}
              </p>
            )}
          </div>

          <FormInput
            name="description"
            label="Descripción"
            placeholder="Descripción de la programa"
            register={register}
            errors={errors}
            rules={{ required: "Descripción obligatoria" }}
          />
          <FormInput
            name="activities"
            label="Actividades"
            placeholder="Actividades de la programa"
            register={register}
            errors={errors}
            rules={{ required: "Almenos una actividad" }}
          />
          <FormInput
            name="supervisor_name"
            label="Nombre del supervisor"
            placeholder="Nombre del supervisor"
            register={register}
            rules={{ required: "Supervisor obligatorio" }}
            errors={errors}
          />
          <FormInput
            name="supervisor_email"
            label="Correo electrónico"
            placeholder="Correo electrónico del supervisor"
            register={register}
            rules={{ required: "Email obligatorio" }}
            errors={errors}
          />
          <FormInput
            name="supervisor_phone"
            label="Teléfono"
            placeholder="Teléfono del supervisor"
            register={register}
            errors={errors}
            rules={{ required: "Teléfono obligatorio" }}
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

export default CreateProgramModal;
