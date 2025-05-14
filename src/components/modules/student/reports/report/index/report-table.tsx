import React from "react";
import { ReportsProvider, useReports } from "./report-context";
import { Card } from "@/components/ui-componets/general/card/Card";
import { CardHeader } from "@/components/ui-componets/general/card/CardHeader";
import { CardBody } from "@/components/ui-componets/general/card/CardBody";
import Loader from "@/components/ui-componets/load/Loader";
import SearchReport from "./report-search";
import ReportCard from "./report-card";
import ReportsPager from "./report-pager";
import CreateReportModal from "../modals/create-report-modal";
import UpdateReportModal from "../modals/update-report-modal";
import DeleteReportModal from "../modals/delete-report-model";
import ShowReportModal from "../modals/show-report-modal";
import { useParams } from "react-router-dom";
import { useAuth } from "@/contexts/authContext";
import { useGetReportCycleItem } from "@/lib/api/api-hooks/reports/cycle-report/use-get-report-cycle";

function ReportsContent() {
  const { reportsCycleItem, loading, openCreate } = useReports();
  const { user } = useAuth();
  const report = reportsCycleItem.filter(
    (r) => r.request.student_id === user?.user_id
  );
  const { id, cycleId, itemId } = useParams<{
    id: string;
    cycleId: string;
    itemId?: string;
  }>();

  const { reportCycleItem: asignacion, loading: load } = useGetReportCycleItem(
    Number(cycleId),
    Number(itemId)
  );
  const formatDateES = (isoDate: string) => {
    const date = new Date(isoDate);
    // genera algo como "jueves, 12 de junio de 2025"
    const formatted = date.toLocaleDateString("es-MX", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    // quitamos la coma y las preposiciones " de "
    return formatted.replace(/,/, "").replace(/ de /g, " ");
  };
  let today = new Date();
  let start = new Date(); // p.ej. "2025-01-15"
  let end = new Date();
  if (asignacion) {
    start = new Date(asignacion.start_date); // p.ej. "2025-01-15"
    end = new Date(asignacion.end_date);
  }
  return (
    <>
      <div className="flex flex-col flex-1  gap-4">
        <div className=" flex flex-row justify-between gap-2">
          {/* <SearchReport /> */}
          {!asignacion ? (
            ""
          ) : (
            <p>
              <strong>Fecha Entrega:</strong>{" "}
              <span className="text-secondary">
                {asignacion
                  ? `${formatDateES(asignacion.start_date)} – ${formatDateES(
                      asignacion.end_date
                    )}`
                  : "---"}
              </span>
            </p>
          )}
          

          <button
            onClick={openCreate}
            className={`${report.length >= 1 || !itemId ? "hidden" : ""} create`}
          >
            +Nuevo
          </button>
        </div>

        <div className="flex flex-col flex-1 overflow-y-auto scrollable-container">
          {loading ? (
            <>
              <Loader />
              <div className="text-center text-gray-500 py-8">Cargando...</div>
            </>
          ) : report.length > 0 ? (
            <div className="flex flex-wrap items-center justify-center gap-4">
              {report.map((t) => (
                <ReportCard key={t.document_id} item={t} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              No hay reportes para mostrar.
            </div>
          )}
          {/* <ReportsPager /> */}
        </div>
      </div>

      <CreateReportModal />
      <UpdateReportModal />
      <DeleteReportModal />
      <ShowReportModal />
    </>
  );
}

export default function ReportsView() {
  const { cycleId, itemId } = useParams<{ cycleId: string; itemId?: string }>();
  return (
    <ReportsProvider key={`${cycleId}-${itemId}`}>
      <ReportsContent />
    </ReportsProvider>
  );
}
