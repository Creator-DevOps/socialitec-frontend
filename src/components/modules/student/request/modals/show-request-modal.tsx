import React from "react";
import ModalContainer from "@/components/containers/modal.container";
import { useRequests } from "../index/request-context";

const ShowRequestModal: React.FC = () => {
  const { isShowOpen, selected, closeShow } = useRequests();

  if (!isShowOpen || !selected) return null;

  const {
    request_id,
    created_at,
    updated_at,
    acceptance_status,
    progress_status,
    completed_hours,
    feedback,
    coordinator_id,
    student,
    institution,
    program,
  } = selected;

  return (
    <ModalContainer visible onClose={closeShow}>
      <div className="space-y-8 p-4 !text-xs !md:text-sm">
        <h2 className="text-2xl font-bold text-center text-primary">Solicitud #{request_id}</h2>

        {/* --- Estudiante --- */}
        <section className="flex flex-col gap-1">
          <h3 className="text-xl font-semibold text-primary">Estudiante</h3>
          <p className="!text-sm"><strong>Nombre:</strong> {student.name}</p>
          <p className="!text-sm"><strong>Control:</strong> {student.control_number}</p>
          <p className="!text-sm"><strong>Email:</strong> {student.email}</p>
          <p className="!text-sm"><strong>Carrera:</strong> {student.major}</p>
          <p className="!text-sm"><strong>Semestre:</strong> {student.semester}</p>
          <p className="!text-sm"><strong>Créditos:</strong> {student.credits}</p>
        </section>

        {/* --- Detalles de la Solicitud --- */}
        <section>
          <h3 className="text-xl font-semibold text-primary ">Detalles de Solicitud</h3>
          <p className="!text-sm"><strong>Fecha creación:</strong> {new Date(created_at).toLocaleString()}</p>
          <p className="!text-sm"><strong>Última actualización:</strong> {new Date(updated_at).toLocaleString()}</p>
          <p className="!text-sm"><strong>Estatus de aceptación:</strong> {acceptance_status === 1 ? "Aceptada" : acceptance_status === 2 ? "Rechazada" : "Pendiente"}</p>
          <p className="!text-sm"><strong>Estatus de progreso:</strong> {progress_status === 2 ? "Finalizada" : progress_status === 1 ? "En proceso" : "Pendiente"}</p>
          <p className="!text-sm"><strong>Horas completadas:</strong> {completed_hours}</p>
          <p className="!text-sm"><strong>Feedback:</strong> {feedback || "—"}</p>
          <p className="!text-sm"><strong>Coordinador ID:</strong> {coordinator_id}</p>
        </section>

        {/* --- Institución --- */}
        <section>
          <h3 className="text-xl font-semibold text-primary">Institución</h3>
          <p className="!text-sm"><strong>Nombre:</strong> {institution.institution_name}</p>
          <p className="!text-sm"><strong>Descripción:</strong> {institution.description}</p>
          <p className="!text-sm"><strong>Email:</strong> {institution.email}</p>
          <p className="!text-sm"><strong>Teléfono:</strong> {institution.phone}</p>
          <p className="!text-sm"><strong>Dirección:</strong> {institution.street} #{institution.number}, {institution.neighborhood}, C.P. {institution.postal_code}</p>
        </section>

        {/* --- Programa --- */}
        <section>
          <h3 className="text-xl font-semibold text-primary">Programa</h3>
          <p className="!text-sm"><strong>Nombre:</strong> {program.program_name}</p>
          <p className="!text-sm"><strong>Descripción:</strong> {program.description}</p>
          <p className="!text-sm"><strong>Actividades:</strong> {program.activities}</p>
          <p className="!text-sm"><strong>Supervisor:</strong> {program.supervisor_name} ({program.supervisor_email}, {program.supervisor_phone})</p>
        </section>

        <div className="flex justify-end pt-4">
          <button onClick={closeShow} className="cancel">
            Cerrar
          </button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default ShowRequestModal;
