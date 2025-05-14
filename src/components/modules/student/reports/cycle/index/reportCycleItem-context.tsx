import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { ReportCycleItem } from "@/lib/api/models/report-cycle-item";
import { ReportCycle } from "@/lib/api/models/report-cycle";

import { useGetReportCycleItems } from "@/lib/api/api-hooks/reports/cycle-report/use-get-report-cycles";

import { useToast } from "@/lib/hooks/use-toast";
import { useGetReportCycle } from "@/lib/api/api-hooks/reports/cycles/use-get-cycle";
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "@/contexts/authContext";

interface CreateInput {
  cycle_id: number;
  report_number: number;
  title: string;
  start_date: string; // ISO date
  end_date: string;
}
interface UpdateInput {
  cycle_id?: number;
  report_number?: number;
  title?: string;
  start_date?: string; // ISO date
  end_date?: string;
}

interface ContextValue {
  reportCycleItems: ReportCycleItem[];
  loading: boolean;
  totalPages: number;
  currentPage: number;
  query: string;
  setPage: (p: number) => void;
  setQuery: (q: string) => void;
  refetch: () => Promise<void>;


  selected: ReportCycleItem | null;
  selectedCycle: ReportCycle | null;
  loadingCycle: boolean;
  cycleError: string | null;

 

 
  isShowOpen: boolean;
  openShow: (i: ReportCycleItem) => void;
  closeShow: () => void;
}

const ReportCycleItemsContext = createContext<ContextValue | null>(null);
export const useReportCycleItems = () => {
  const ctx = useContext(ReportCycleItemsContext);
  if (!ctx)
    throw new Error(
      "useReportCycleItems must be inside ReportCycleItemsProvider"
    );
  return ctx;
};

export const ReportCycleItemsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { cycleId } = useParams<{ cycleId: string }>();
  const { user } = useAuth();
  // const { request } = useGetRequestUser(user?.user_id || 0);
  // const cycle_id = request?.cycle_id || 0;
   const {
    reportCycle,
    loading: loadingCycle,
    error: cycleError,
    refetch: refetchCycle,
  } = useGetReportCycle(Number(cycleId),Boolean(cycleId));

  const {
    reportCycleItems,
    loading,
    totalPages,
    currentPage,
    setPage,
    query,
    setQuery,
    refetch,
  } = useGetReportCycleItems(Number(cycleId), 1, 20,Boolean(cycleId));

  const { toastSuccess, toastError } = useToast();

 
  const [isShowOpen, setShowOpen] = useState(false);
  const [selected, setselected] = useState<ReportCycleItem | null>(null);

  // Show modal
  const openShow = (i: ReportCycleItem) => {
    setselected(i);
    setShowOpen(true);
  };
  const closeShow = () => {
    setselected(null);
    setShowOpen(false);
  };

  return (
    <ReportCycleItemsContext.Provider
      value={{
        reportCycleItems,
        loading,
        totalPages,
        currentPage,
        query,
        setPage,
        setQuery,
        refetch,


        selected,

        isShowOpen,
        openShow,
        closeShow,
        selectedCycle: reportCycle,
        loadingCycle,
        cycleError,
      }}
    >
      {children}
    </ReportCycleItemsContext.Provider>
  );
};
