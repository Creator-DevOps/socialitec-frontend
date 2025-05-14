import React, { useEffect } from "react";
import ModalContainer from "@/components/containers/modal.container";
import { useForm } from "react-hook-form";
import { FormInput } from "@/components/forms/inputs/form-input";
import { useTemplates } from "../index/template-context";
import FileInput from "@/components/forms/files/FileInput";

interface FormValues {
  document_name: string;
  description: string;
  file: File | null;
  [key: string]: unknown;
}

const UpdateTemplateModal: React.FC = () => {
  const { isEditOpen, selected, closeEdit, handleUpdate } = useTemplates();
  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    if (selected) {
      setValue("document_name", selected.document_name);
      setValue("description", selected.description);
    }
  }, [selected, setValue]);

  useEffect(() => {
    if (!isEditOpen) {
      reset();
    }
  }, [isEditOpen, reset]);

  const onSubmit = async (data: FormValues) => {
    await handleUpdate(data);
    reset();
    closeEdit();
  };

  if (!isEditOpen || !selected) return null;

  return (
    <ModalContainer visible onClose={closeEdit}>
      <div className="flex flex-col gap-6 md:px-6">
        <h2 className="text-2xl font-bold text-primary text-center">
          Editar Plantilla
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <FormInput
            name="document_name"
            label="Nombre del documento"
            placeholder="Ej. Acta de entrega"
            register={register}
            errors={errors}
            rules={{ required: "El nombre es obligatorio" }}
          />

          <FormInput
            name="description"
            label="Descripción"
            placeholder="Breve descripción"
            register={register}
            errors={errors}
            rules={{ required: "La descripción es obligatoria" }}
          />

          <FileInput
            name="file"
            control={control}
            label="Archivo"
            accept=".pdf,.docx,.txt,.xls,.png,.jpg,.mp4,.mp3"
            rules={{ required: "Archivo obligatorio" }}
          />

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => {
                reset();
                closeEdit();
              }}
              className="cancel"
            >
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

export default UpdateTemplateModal;
