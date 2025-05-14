import React, { useEffect } from "react";
import ModalContainer from "@/components/containers/modal.container";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormInput } from "@/components/forms/inputs/form-input";
import FileInput from "@/components/forms/files/FileInput";
import { useReports } from "../index/report-context";
import { useAuth } from "@/contexts/authContext";
import { useGetRequest } from "@lib/api/api-hooks/requests/use-get-request";
import { useParams } from "react-router-dom";

interface FormValues {
  item_id?:number;
  document_name: string;
  request_id: number;
  report_number: number;
  status:number;
  feedback?: string;
  file: FileList;
  [key: string]: unknown;


}

const CreateReportModal: React.FC = () => {
  const { isCreateOpen, closeCreate, handleCreate } = useReports();
  const { user } = useAuth();
  const { control,register, handleSubmit, watch, formState: { errors }, reset } = useForm<FormValues>();
  const { id, cycleId, itemId } = useParams<{
      id: string;
      cycleId: string;
      itemId?: string;
    }>();
  // Obtenemos el request_id y consultamos
  const requestId = watch("request_id");
  const { request: fetchedReq, loading: loadingReq, error: reqError } = useGetRequest(requestId);

  // Limpiar feedback de error cuando cambie el ID
  useEffect(() => {
    // podrias resetear algún mensaje o estado aquí si lo deseas
  }, [requestId]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!user || !fetchedReq) return;
    const file = data.file[0] ?? null;

    await handleCreate({
      item_id:Number(itemId),
      document_name:  data.document_name,
      request_id:     data.request_id,
      report_number:  data.report_number,
      feedback:       data.feedback,
      status:0,
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
            Agregar nuevo Reporte
          </h2>
          <p>Completa los datos del reporte a registrar.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">

          {/* Nombre del documento */}
          <FormInput
            name="document_name"
            label="Nombre del documento"
            placeholder="Ej. Informe Final"
            register={register}
            errors={errors}
            rules={{ required: "Nombre obligatorio" }}
          />

          {/* ID de la solicitud */}
          <FormInput
            name="request_id"
            type="number"
            label="ID de la Solicitud"
            placeholder="Ej. 123"
            register={register}
            errors={errors}
            rules={{
              required: "Solicitud obligatoria",
              valueAsNumber: true
            }}
          />
          {loadingReq && <p className="text-sm text-gray-500">Verificando solicitud...</p>}
          {reqError && (
            <p className="text-red-500 text-sm">
              No se encontró la solicitud {requestId}
            </p>
          )}

          {/* Número de reporte */}
          <div className="flex flex-col gap-1 mb-4 w-full text-left">
            <label htmlFor="report_number" className="font-semibold text-xs md:text-sm">
              Número de Reporte
            </label>
            <select
              id="report_number"
              className={`border-b border-gray-300 focus:outline-none focus:border-secondary
                text-xs md:text-sm py-1
                ${errors.report_number ? "border-red-500" : ""}`}
              defaultValue=""
              {...register("report_number", {
                required: "Selecciona un reporte",
                valueAsNumber: true
              })}
            >
              <option value="" disabled>— Selecciona un reporte —</option>
              <option value={1}>Primer reporte</option>
              <option value={2}>Segundo reporte</option>
              <option value={3}>Reporte final</option>
            </select>
            {errors.report_number && (
              <p className="text-red-500 text-sm">
                {errors.report_number.message}
              </p>
            )}
          </div>

          {/* Feedback (opcional) */}
          <FormInput
            name="feedback"
            label="Feedback (opcional)"
            placeholder="Comentarios o retroalimentación"
            register={register}
            errors={errors}
            rules={{}}
          />

          {/* Archivo */}
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
            <button
              type="submit"
              className="create"
              disabled={!fetchedReq || loadingReq}
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </ModalContainer>
  );
};

export default CreateReportModal;
