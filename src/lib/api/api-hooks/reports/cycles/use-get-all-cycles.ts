import { useEffect, useState, useCallback } from "react";
import { ReportCycle, ReportCyclesPaginated } from "@lib/api/models/report-cycle";
import { useAuth } from "@contexts/authContext";

const API_URL = import.meta.env.VITE_API_URL;

export const useGetAllReportCycles = () => {
  const { token } = useAuth();

  const [reportCycles, setReportCycles] = useState<ReportCycle[]>([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState<string | null>(null);

  const fetchReportCycles = useCallback(async () => {
    setLoading(true);
    try {
      let url = `${API_URL}/report_cycles`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data: ReportCyclesPaginated = await res.json();
      setReportCycles(data.items);
      
    } catch {
      setError("Error al obtener ciclos.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchReportCycles();
  }, [fetchReportCycles]);

  return {
    reportCycles,
    loading,
    error,
    refetch: fetchReportCycles,
  };
};
