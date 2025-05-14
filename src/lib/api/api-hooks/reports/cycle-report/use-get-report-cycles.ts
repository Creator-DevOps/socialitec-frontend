import { useEffect, useState, useCallback } from "react";
import { ReportCycleItem, ReportCycleItemsPaginated } from "@lib/api/models/report-cycle-item";
import { useAuth } from "@contexts/authContext";

const API_URL = import.meta.env.VITE_API_URL;

export const useGetReportCycleItems = (cycle_id:number, initialPage = 1, pageSize = 10, enabled: boolean = true) => {
  const { token } = useAuth();

  const [reportCycleItems, setReportCycleItems] = useState<ReportCycleItem[]>([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages]   = useState(1);
  const [query, setQuery]             = useState("");

  const fetchReportCycleItems = useCallback(async () => {
    setLoading(true);
    try {
      let url = `${API_URL}/report_cycles/${cycle_id}/items?page=${currentPage}&limit=${pageSize}`;
      

      if (query) {
        url += `&search=${encodeURIComponent(query)}`;
      }
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data: ReportCycleItemsPaginated = await res.json();
      setReportCycleItems(data.items);
      setTotalPages(data.pages || 1);
    } catch {
      setError("Error al obtener lista de entrega.");
    } finally {
      setLoading(false);
    }
  }, [token, currentPage, pageSize, query,cycle_id]);

  useEffect(() => {
    if(enabled){
    fetchReportCycleItems();}
  }, [fetchReportCycleItems, enabled, cycle_id]);

  return {
    reportCycleItems,
    loading,
    error,
    currentPage,
    totalPages,
    setPage: setCurrentPage,
    setQuery,
    refetch: fetchReportCycleItems,
    query,
  };
};
