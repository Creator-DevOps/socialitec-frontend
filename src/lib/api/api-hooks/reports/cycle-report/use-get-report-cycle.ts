import { useEffect, useState, useCallback } from "react";
import { ReportCycleItem } from "@lib/api/models/report-cycle-item";
import { useAuth } from "@contexts/authContext";

const API_URL = import.meta.env.VITE_API_URL;

export const useGetReportCycleItem = (cycle_id: number, item_id: number) => {
  const { token } = useAuth();

  const [reportCycleItem, setReportCycleItem] = useState<ReportCycleItem | null>(null);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState<string | null>(null);

  const fetchReportCycleItem = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/report_cycles/${cycle_id}/items/${item_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);

      const json = await res.json();

      
      setReportCycleItem(json as ReportCycleItem);
    } catch (e: any) {
      setError(e.message || "Error al obtener lista de entrega.");
    } finally {
      setLoading(false);
    }
  }, [token, item_id,cycle_id]);

  useEffect(() => {
    if (item_id) fetchReportCycleItem();
  }, [fetchReportCycleItem, item_id]);

  return {
    reportCycleItem,
    loading,
    error,
    refetch: fetchReportCycleItem,
  };
};
