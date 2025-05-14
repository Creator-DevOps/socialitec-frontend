import React from "react";
import { ReportCyclesProvider, useReportCycles } from "./reportCycle-context"
import { Card } from "@/components/ui-componets/general/card/Card";
import { CardHeader } from "@/components/ui-componets/general/card/CardHeader";
import { CardBody } from "@/components/ui-componets/general/card/CardBody";
import Loader from "@/components/ui-componets/load/Loader";
import SearchReportCycle from "./reportCycle-search";
import ReportCycleCard from "./reportCycle-card";
import ReportCyclesPager from "./reportCycle-pager";
import CreateReportCycleModal from "../modals/create-reportCycle-modal";
import UpdateReportCycleModal from "../modals/update-reportCycle-modal";
import DeleteReportCycleModal from "../modals/delete-reportCycle-model";
import ShowReportCycleModal from "../modals/show-reportCycle-modal";

function ReportCyclesContent() {
  const { reportCycles, loading, openCreate } = useReportCycles();

  return (
    <Card>
      <CardHeader>
        <h6 className="text-2xl font-bold text-primary flex-1">
          Ciclos
        </h6>
        <div className="flex items-center gap-4">
          <SearchReportCycle />
          <button onClick={openCreate} className="create">
            + Nueva
          </button>
        </div>
      </CardHeader>

      <CardBody>
        {loading ? (
          <>
            <Loader />
            <div className="text-center text-gray-500 py-8">Cargando...</div>
          </>
        ) : reportCycles.length > 0 ? (
          <div className="flex flex-wrap items-center justify-center gap-4">
            {reportCycles.map((c) => (
              <ReportCycleCard key={c.cycle_id} item={c} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            No hay ciclos para mostrar.
          </div>
        )}
      </CardBody>

      <ReportCyclesPager />

      <CreateReportCycleModal />
      <UpdateReportCycleModal />
      <DeleteReportCycleModal />
      <ShowReportCycleModal />
    </Card>
  );
}

export default function ReportCyclesView() {
  return (
    <ReportCyclesProvider>
      <ReportCyclesContent />
    </ReportCyclesProvider>
  );
}
