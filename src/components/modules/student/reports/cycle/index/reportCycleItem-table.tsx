import React from "react";
import {
  ReportCycleItemsProvider,
  useReportCycleItems,
} from "./reportCycleItem-context";
import { Card } from "@/components/ui-componets/general/card/Card";
import { CardHeader } from "@/components/ui-componets/general/card/CardHeader";
import { CardBody } from "@/components/ui-componets/general/card/CardBody";
import Loader from "@/components/ui-componets/load/Loader";
import SearchReport from "../../report/index/report-search";
import ReportCycleItemCard from "./reportCycleItem-card";
import ReportCycleItemsPager from "./reportCycleItem-pager";

import ShowReportCycleItemModal from "../modals/show-reportCycleItem-modal";
import ReportsView from "@/components/modules/student/reports/report/index/report-table";

import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/authContext";
import { useGetReportCycle } from "@/lib/api/api-hooks/reports/cycles/use-get-cycle";
import { useReports, ReportsProvider } from "../../report/index/report-context";
import ReportCard from "../../report/index/report-card";
import { useGetRequestUser } from "@/lib/api/api-hooks/requests/use-get-request_user";
interface ReportCycleItemsViewProps {
  children?: React.ReactNode;
}
interface Props {
  children?: React.ReactNode;
}

export const ReportCycleItemsContent: React.FC<Props> = ({ children }) => {
  const { reportCycleItems, loading } = useReportCycleItems();
  const { loading: loader, reportsCycleItem } = useReports();
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user?.user_id || 0;
  const { cycleId } = useParams<{ cycleId: string }>();

  const { reportCycle, loading: load } = useGetReportCycle(Number(cycleId)||0);

  const { request,loading:load2 } = useGetRequestUser(user?.user_id||0);

  return (
    <Card>
      {load2?<Loader/>:!request ? (
        <div className="flex flex-col items-center text-center text-2xl text-primary font-bold  my-auto justify-center">¡No hay ninguna solicitud activa!</div>
      ) : (
        <>
          <CardHeader>
            <h6 className="text-2xl font-bold text-primary flex-1">
              <span className="text-sm md:text-base">
                {load ? "Cargando..." : reportCycle?.name ?? "---"}
              </span>
            </h6>
            <div className="flex items-center gap-4">
              {/* <SearchReport/> */}
              {/* <button onClick={openCreate} className="create">
            + Nueva
          </button> */}
            </div>
          </CardHeader>

          <CardBody className="!overflow-y-hidden ">
            <div className=" flex flex-row items-center justify-between w-full h-25 border-b-2 border-gray-300 shadow-b-lg">
              {loading ? (
                <>
                  <Loader />
                  <div className="text-center text-gray-500 py-8"></div>
                </>
              ) : reportCycleItems.length > 0 ? (
                <div className="flex flex-wrap items-center justify-center gap-2 md:gap-6 w-full">
                  {reportCycleItems.map((c) => (
                    <ReportCycleItemCard key={c.item_id} item={c} />
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  No hay listas para mostrar.
                </div>
              )}
              {/* <button
            className="cancel"
            onClick={() => {
              navigate(`/admin/${userId}/cycles/`);
            }}
          >
            Volver
          </button> */}
            </div>

            <div className="flex  flex-col  pt-2 h-full">{children}</div>
          </CardBody>
        </>
      )}

      {/* <ReportCycleItemsPager /> */}

      <ShowReportCycleItemModal />
    </Card>
  );
};

export default function ReportCycleItemsView({
  children,
}: ReportCycleItemsViewProps) {
  return (
    <ReportsProvider>
      <ReportCycleItemsProvider>
        <ReportCycleItemsContent>
          <ReportsView />
        </ReportCycleItemsContent>
      </ReportCycleItemsProvider>
    </ReportsProvider>
  );
}
