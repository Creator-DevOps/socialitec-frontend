import React, { useEffect } from "react";
import ModalContainer from "@/components/containers/modal.container";
import { useForm } from "react-hook-form";
import { FormInput } from "@/components/forms/inputs/form-input";
import { useLetters } from "../index/letter-context";
import FileInput from "@/components/forms/files/FileInput";

interface FormValues {
  document_name: string;
  request_id:number;
  file: File | null;
  [key: string]: unknown;
}

const UpdateLetterModal: React.FC = () => {
  const { isEditOpen, selected, closeEdit, handleUpdate } = useLetters();
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
      setValue("request_id", selected.request_id);
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
          Editar Carta
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
            // rules={{ required: "El nombre es obligatorio" }}
          />

          <FormInput
            name="request_id"
            label="Solicitud"
            placeholder="Solicitud"
            register={register}
            errors={errors}
            // rules={{ required: "Solicitud es obligatoria" }}
          />

          <FileInput
            name="file"
            control={control}
            label="Archivo"
            accept=".pdf,.docx,.txt,.xls,.png,.jpg,.mp4,.mp3"
            // rules={{ required: "Archivo obligatorio" }}
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

export default UpdateLetterModal;
