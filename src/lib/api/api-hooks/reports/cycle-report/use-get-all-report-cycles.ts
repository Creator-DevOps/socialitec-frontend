import { useEffect, useState, useCallback } from "react";
import { ReportCycleItem, ReportCycleItemsPaginated } from "@lib/api/models/report-cycle-item";
import { useAuth } from "@contexts/authContext";

const API_URL = import.meta.env.VITE_API_URL;

export const useGetAllReportCycleItems = (cycle_id: number) => {
  const { token } = useAuth();

  const [reportCycleItems, setReportCycleItems] = useState<ReportCycleItem[]>([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState<string | null>(null);

  const fetchReportCycleItems = useCallback(async () => {
    setLoading(true);
    try {
      let url = `${API_URL}/report_cycles/${
          cycle_id
        }/items`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data: ReportCycleItemsPaginated = await res.json();
      setReportCycleItems(data.items);
      
    } catch {
      setError("Error al obtener listas de entrega.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchReportCycleItems();
  }, [fetchReportCycleItems]);

  return {
    reportCycleItems,
    loading,
    error,
    refetch: fetchReportCycleItems,
  };
};
