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

function ReportsContent() {
  const { reportsCycleItem, loading, openCreate } = useReports();

  return (
    <>
      <div className="flex flex-col flex-1  gap-4">
        <SearchReport />
        
        <div className="flex flex-col flex-1 overflow-y-auto scrollable-container">
          {loading ? (
            <>
              <Loader />
              <div className="text-center text-gray-500 py-8">Cargando...</div>
            </>
          ) : reportsCycleItem.length > 0 ? (
            <div className="flex flex-wrap items-center justify-center gap-4">
              {reportsCycleItem.map((t) => (
                <ReportCard key={t.document_id} item={t} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              No hay reportes para mostrar.
            </div>
          )}
          <ReportsPager />
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
