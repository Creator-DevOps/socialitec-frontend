import React from "react";
import ModalContainer from "@/components/containers/modal.container";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormInput } from "@/components/forms/inputs/form-input";
import FileInput from "@/components/forms/files/FileInput";
import { useLetters } from "../index/letter-context";
import { useAuth } from "@/contexts/authContext";

interface FormValues {
  document_name: string;
  request_id: number;
  file: FileList;
  [key: string]: unknown;

}

const CreateLetterModal: React.FC = () => {
  const { isCreateOpen, closeCreate, handleCreate } = useLetters();
  const { user } = useAuth();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!user) return;
    const file = data.file[0] ?? null;
    await handleCreate({
      document_name: data.document_name,
      request_id: data.request_id,
      coordinator_id: user.user_id,
      file,
    });
    reset();
    closeCreate();
  };

  if (!isCreateOpen) return null;

  return (
    <ModalContainer
      visible
      onClose={() => {
        reset();
        closeCreate();
      }}
    >
      <div className="flex flex-col gap-6 md:px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary">
            Agregar nueva Carta
          </h2>
          <p>Ingresa los datos de la carta que deseas registrar.</p>
        </div>

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
            rules={{ required: "Nombre obligatorio" }}
          />

          <FormInput
            name="request_id"
            label="Solicitud"
            placeholder="Solicitud"
            register={register}
            errors={errors}
            rules={{ required: "Solicitud obligatoria" }}
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
                closeCreate();
              }}
              className="cancel"
            >
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

export default CreateLetterModal;
