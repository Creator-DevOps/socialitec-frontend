import React, { useEffect } from "react";
import { ReportsProvider, useReports } from "./requestPanel-context";
import { Card } from "@/components/ui-componets/general/card/Card";
import { CardHeader } from "@/components/ui-componets/general/card/CardHeader";
import { CardBody } from "@/components/ui-componets/general/card/CardBody";
import Loader from "@/components/ui-componets/load/Loader";
import SearchReport from "./requestPanel-search";
import ReportCard from "./requestPanel-card";
import ReportsPager from "./requestPanel-pager";
import UpdateReportModal from "../modals/update-requestPanel-modal";
import CreateLetterModal from "../../../releasesletter/modals/create-letter-modal";
import DeleteReportModal from "../modals/delete-requestPanel-model";
import ShowReportModal from "../modals/show-report-modal";
import { useParams } from "react-router-dom";
import { useToast } from "@/lib/hooks/use-toast";
import { useAuth } from "@/contexts/authContext";
import { useForm } from "react-hook-form";
import { FormInput } from "@/components/forms/inputs/form-input";
import {
  LettersProvider,
  useLetters,
} from "../../../releasesletter/index/letter-context";
import LetterCard from "../../../releasesletter/index/letter-card";
import UpdateLetterModal from "../../../releasesletter/modals/update-letter-modal";
import DeleteLetterModal from "../../../releasesletter/modals/delete-letter-model";
import ShowLetterModal from "../../../releasesletter/modals/show-letter-modal";

interface FormValues {
  request_id?: number;
  student_id?: number;
  institution_id: number;
  program_id: number;
  acceptance_status: number;
  progress_status: number;
  completed_hours: number;
  feedback: string;
  [key: string]: unknown;
}

function ReportsContent() {
  const {
    reportsRequest,
    loading,
    request,
    loadingRequest,
    refetchRequest,
    handleUpdateRequest,
  } = useReports();
  const { toastSuccess, toastError, toastWarning } = useToast();
  const { user } = useAuth();
  const { letters, loading: loadingLetter, openCreate } = useLetters();
  const filteredLetters = letters.filter(
    (l) => l.request.request_id === request?.request_id
  );

  const getAcceptanceColor = (status?: number) => {
    switch (status) {
      case 1:
        return "text-green-500 "; // Aceptada
      case 2:
        return "text-red-500"; // Rechazada
      default:
        return "text-black"; // Pendiente
    }
  };

  const getProgressColor = (status?: number) => {
    switch (status) {
      case 1:
        return "text-yellow-500"; // En proceso
      case 2:
        return "text-green-500"; // Finalizada
      default:
        return "text-black"; // Pendiente
    }
  };
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      acceptance_status: 0,
      progress_status: 0,
      completed_hours: 0,
      feedback: "",
    },
  });

  const watchAcceptance = watch("acceptance_status");
  const watchProgress = watch("progress_status");
  const watchCompleted = watch("completed_hours");

  useEffect(() => {
    if (request) {
      setValue("acceptance_status", request.acceptance_status);
      setValue("progress_status", request.progress_status);
      setValue("completed_hours", request.completed_hours);
      setValue("feedback", request.feedback || "");
    }
  }, [request, setValue]);

  // Validation
  useEffect(() => {
    if (watchCompleted < 0) {
      setError("completed_hours", {
        type: "min",
        message: "No puede ser negativo",
      });
    } else if (
      (watchAcceptance === 0 || watchAcceptance === 2) &&
      watchCompleted > 0
    ) {
      setError("completed_hours", {
        type: "invalid",
        message: "Solicitud sin aceptar",
      });
    } else {
      clearErrors("completed_hours");
    }
    if (watchAcceptance !== 1 && watch("progress_status") > 0) {
      setError("progress_status", {
        type: "invalid",
        message: "Progreso solo si está aceptada",
      });
    } else if (watch("progress_status") === 2 && watchCompleted !== 480) {
      setError("progress_status", {
        type: "invalid",
        message: "Para finalizar horas deben ser 480",
      });
    } else {
      clearErrors("progress_status");
    }
  }, [watchAcceptance, watchCompleted, watch, setError, clearErrors]);

  const onSubmit = async (data: FormValues) => {
    if (request!.student.credits < 180) {
      toastWarning({
        id: 17,
        title: "¡Advertencia!",
        message: "El alumno no cumple 180 créditos",
      });
      return;
    }
    await handleUpdateRequest({ ...data });
    refetchRequest();
  };

  return (
    <Card>
      <CardHeader>
        <h6 className="text-2xl font-bold text-primary flex-1">
          {loadingRequest ? "Cargando..." : request?.student.name}
        </h6>
        {/* <div className="flex items-center gap-4">
          <SearchReport />
        </div> */}
      </CardHeader>

      <CardBody>
        <h2 className="font-bold md:text-lg text-xl text-secondary">
          Información general
        </h2>
        <div className="flex flex-col md:flex-row flex-1 gap-4 text-xs md:text-xs mb-4 border-b-2 border-gray-200 pb-4">
          {loadingRequest ? (
            <Loader />
          ) : (
            <>
              <section className="flex flex-col  bg-gray-50 p-4 border border-gray-400 shadow-lg rounded-xl w-full md:w-1/3">
                <h2 className="font-bold md:text-lg text-xl text-secondary">
                  Alumno
                </h2>
                <p className="!text-sm">
                  <strong>No.control: </strong>
                  {request?.student.control_number}
                </p>
                <p className="!text-sm">
                  <strong>Email: </strong>
                  {request?.student.email}
                </p>
                <p className="!text-sm">
                  <strong>Carrera: </strong>
                  {request?.student.major}
                </p>
                <p className="!text-sm">
                  <strong>Semestre: </strong>
                  {request?.student.semester}
                </p>
                <p className="!text-sm">
                  <strong>Creditos: </strong>
                  {request?.student.credits}
                </p>
              </section>
              <section className="flex flex-col  bg-gray-50 p-4 border border-gray-400 shadow-lg rounded-xl w-full md:w-1/3">
                <h2 className="font-bold md:text-lg text-xl text-secondary">
                  Institución
                </h2>
                <p className="!text-sm">
                  <strong>Nombre: </strong>
                  {request?.institution.institution_name}
                </p>
                <p className="!text-sm">
                  <strong>C.P: </strong>
                  {request?.institution.postal_code}
                </p>
                <p className="!text-sm">
                  <strong>Localidad: </strong>
                  {request?.institution.neighborhood}
                </p>
                <p className="!text-sm">
                  <strong>Calle: </strong>
                  {request?.institution.street}
                </p>
                <p className="!text-sm">
                  <strong>No.: </strong>
                  {request?.institution.number}
                </p>
                <p className="!text-sm">
                  <strong>Teléfono: </strong>
                  {request?.institution.phone}
                </p>
              </section>
              <section className="flex flex-col  bg-gray-50 p-4 border border-gray-400 shadow-lg rounded-xl w-full md:w-1/3">
                <h2 className="font-bold md:text-lg text-xl text-secondary">
                  Programa
                </h2>
                <p className="!text-sm">
                  <strong>Nombre: </strong>
                  {request?.program.program_name}
                </p>
                <p className="!text-sm">
                  <strong>Descripción: </strong>
                  {request?.program.description}
                </p>
                <p className="!text-sm">
                  <strong>Actividades: </strong>
                  {request?.program.activities}
                </p>
                <p className="!text-sm">
                  <strong>Supervisor: </strong>
                  {request?.program.supervisor_name}
                </p>
                <p className="!text-sm">
                  <strong>Teléfono: </strong>
                  {request?.program.supervisor_phone}
                </p>
              </section>
            </>
          )}
        </div>
        {/**Solicitud */}
        <h2 className="font-bold md:text-lg text-xl text-secondary">
          Solicitud
        </h2>
        <div className="flex flex-col md:flex-row flex-1 gap-4 text-xs md:text-xs mb-4 border-b-2 border-gray-200 pb-4">
          {loadingRequest ? (
            <Loader />
          ) : (
            <>
              <section className="flex flex-col  bg-gray-50 p-4 border border-gray-400 shadow-lg rounded-xl w-full md:w-1/2">
                <h2 className="font-bold md:text-lg text-xl text-secondary">
                  General
                </h2>
                <p className="!text-sm">
                  <strong>Solicitud:</strong> {request?.request_id}
                </p>
                <p className="!text-sm">
                  <strong>Fecha creación:</strong>{" "}
                  {new Date(request?.created_at || 0).toLocaleString()}
                </p>
                <p className="!text-sm">
                  <strong>Última actualización:</strong>{" "}
                  {new Date(request?.updated_at || 0).toLocaleString()}
                </p>
                <p className={`!text-sm`}>
                  <strong>Estatus de aceptación:</strong>
                  <span
                    className={`font-bold ${getAcceptanceColor(
                      request?.acceptance_status
                    )}`}
                  >
                    {request?.acceptance_status === 1
                      ? " Aceptada"
                      : request?.acceptance_status === 2
                      ? " Rechazada"
                      : " Pendiente"}
                  </span>
                </p>

                <p className="!text-sm">
                  <strong>Horas completadas: </strong>
                  {request?.completed_hours}
                </p>

                <p className={`!text-sm `}>
                  <strong>Estatus de progreso:</strong>
                  <span
                    className={`font-bold ${getProgressColor(
                      request?.progress_status
                    )}`}
                  >
                    {request?.progress_status === 2
                      ? " Finalizada"
                      : request?.progress_status === 1
                      ? " En proceso"
                      : " Pendiente"}
                  </span>
                </p>
                <p className="!text-sm">
                  <strong>Comentarios: </strong>
                  {request?.feedback}
                </p>
              </section>

              <section className="flex flex-col  bg-gray-50 p-4 border border-gray-400 shadow-lg rounded-xl w-full md:w-1/2">
                <h2 className="font-bold md:text-lg text-xl text-secondary">
                  Revisar
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Horas Completadas & Feedback & Status */}

                  <div className="flex flex-row justify-between gap-4">
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="acceptance_status"
                        className="font-semibold text-xs md:text-sm"
                      >
                        Estado de Aceptación
                      </label>
                      <select
                        id="acceptance_status"
                        {...register("acceptance_status", {
                          valueAsNumber: true,
                        })}
                        className="border-b border-gray-300 focus:outline-none focus:border-secondary text-xs md:text-sm py-1 hover:cursor-pointer"
                        disabled={watchProgress >= 1}
                      >
                        <option value={0} disabled={watchProgress >= 1}>
                          Pendiente
                        </option>
                        <option value={1} disabled={watchProgress >= 1}>
                          Aceptada
                        </option>
                        <option value={2} disabled={watchProgress >= 1}>
                          Rechazada
                        </option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="progress_status"
                        className="font-semibold text-xs md:text-sm"
                      >
                        Estado de Progreso
                      </label>
                      <select
                        id="progress_status"
                        {...register("progress_status", {
                          valueAsNumber: true,
                        })}
                        className="border-b border-gray-300 focus:outline-none focus:border-secondary text-xs md:text-sm py-1 hover:cursor-pointer"
                        disabled={watchAcceptance !== 1}
                      >
                        <option value={0} disabled={watchCompleted > 0}>
                          Pendiente
                        </option>
                        <option value={1}>En proceso</option>
                        <option value={2} disabled={watchCompleted < 480}>
                          Finalizada
                        </option>
                      </select>
                    </div>
                  </div>
                  <FormInput
                    name="completed_hours"
                    label="Horas Completadas"
                    placeholder="0"
                    type="number"
                    register={register}
                    errors={errors}
                    rules={{
                      valueAsNumber: true,
                      min: { value: 0, message: "No valores negativos" },
                    }}
                  />
                  <FormInput
                    name="feedback"
                    label="Retroalimentación"
                    placeholder="Comentarios (opcional)"
                    register={register}
                    errors={errors}
                  />
                  {/* Actions */}
                  <div className="flex justify-end gap-4 pt-4">
                    <button type="submit" className="create">
                      Actualizar
                    </button>
                  </div>
                </form>
              </section>
            </>
          )}
        </div>

        {/**Reportes */}
        <div className="mb-4 border-b-2 border-gray-200 pb-4">
          <h2 className="font-bold md:text-lg text-xl text-secondary">
            Reportes
          </h2>

          {loading ? (
            <>
              <Loader />
              <div className="text-center text-gray-500 py-8">Cargando...</div>
            </>
          ) : reportsRequest.length > 0 ? (
            <div className="flex flex-wrap items-center justify-center gap-4">
              {reportsRequest.map((r) => (
                <ReportCard key={r.document_id} item={r} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              No hay reportes para mostrar
            </div>
          )}
        </div>

        <h2 className="font-bold md:text-lg text-xl text-secondary">
          Carta de liberación
        </h2>
        <div>
          {request?.progress_status === 2 ? (
            <div className="text-center text-gray-500 py-8">
              {/* Botón solo si no hay ninguna carta aún */}
              {filteredLetters.length === 0 && (
                <button onClick={openCreate} className="create">
                  Liberar carta
                </button>
              )}

              {/* Listado de cartas ya filtradas */}
              {loadingLetter ? (
                <Loader />
              ) : filteredLetters.length > 0 ? (
                <div className="flex flex-wrap items-center justify-center gap-4">
                  {filteredLetters.map((l) => (
                    <LetterCard key={l.document_id} item={l} />
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  No hay cartas para mostrar.
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              Servicio sin finalizar...
            </div>
          )}
        </div>
      </CardBody>
      {/* <ReportsPager /> */}
      <CreateLetterModal />
      <UpdateLetterModal />
      <DeleteLetterModal />
      <UpdateReportModal />
      <DeleteReportModal />
      <ShowReportModal />
      <ShowLetterModal />
    </Card>
  );
}

export default function ReportsView() {
  const { requestId } = useParams<{ requestId?: string }>();
  return (
    <ReportsProvider key={`${requestId}`}>
      <LettersProvider>
        <ReportsContent />
      </LettersProvider>
    </ReportsProvider>
  );
}
