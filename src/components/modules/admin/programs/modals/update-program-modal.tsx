import React, { useEffect } from "react";
import ModalContainer from "@/components/containers/modal.container";
import { useForm } from "react-hook-form";
import { FormInput } from "@/components/forms/inputs/form-input";
import { usePrograms } from "../index/program-context";
import { useGetAllInstitutions } from "@/lib/api/api-hooks/institutions/use-get-all-institutions";

interface FormValues {
  institution_id?: number;
  program_name?: string;
  description?: string;
  activities?: string;
  supervisor_name?: string;
  supervisor_phone?: string;
  supervisor_email?: string;
  [key: string]: unknown;
}

const UpdateProgramModal: React.FC = () => {
  const { isEditOpen, selected, closeEdit, handleUpdate } = usePrograms();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormValues>();
  const { institutions, loading, refetch } = useGetAllInstitutions();

  useEffect(() => {
    if (selected) {
      setValue("program_name", selected.program_name || "");
      setValue("description", selected.description || "");
      setValue("activities", selected.activities || "");
      setValue("supervisor_name", selected.supervisor_name || "");
      setValue("supervisor_email", selected.supervisor_email || "");
      setValue("supervisor_phone", selected.supervisor_phone || "");
      setValue("institution_id", selected.institution_id || 0);

    }
  }, [selected]);

  const onSubmit = async (data: FormValues) => {
    await handleUpdate(data);
    reset();
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
              <p className="text-red-500 text-sm mt-1">
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

export default UpdateProgramModal;
