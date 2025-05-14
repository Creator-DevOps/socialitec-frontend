import { useEffect, useState, useCallback } from "react";
import { ReportCycle } from "@lib/api/models/report-cycle";
import { useAuth } from "@contexts/authContext";

const API_URL = import.meta.env.VITE_API_URL;

export const useGetReportCycle = (cycle_id: number,enabled: boolean = true) => {
  const { token } = useAuth();

  const [reportCycle, setReportCycle] = useState<ReportCycle | null>(null);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState<string | null>(null);

  const fetchReportCycle = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/report_cycles/${cycle_id}`, {

      
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const cycle = (await res.json()) as ReportCycle;
      setReportCycle(cycle);
    } catch (e: any) {
      setError(e.message || "Error al obtener ciclo.");
    } finally {
      setLoading(false);
    }
  }, [token, cycle_id]);

  useEffect(() => {
    if (enabled &&cycle_id) fetchReportCycle();
  }, [fetchReportCycle, cycle_id, enabled]);

  return {
    reportCycle,
    loading,
    error,
    refetch: fetchReportCycle,
  };
};
