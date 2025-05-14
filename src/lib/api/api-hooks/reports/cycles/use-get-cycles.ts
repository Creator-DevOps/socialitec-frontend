import { useEffect, useState, useCallback } from "react";
import { ReportCycle, ReportCyclesPaginated } from "@lib/api/models/report-cycle";
import { useAuth } from "@contexts/authContext";

const API_URL = import.meta.env.VITE_API_URL;

export const useGetReportCycles = (initialPage = 1, pageSize = 10) => {
  const { token } = useAuth();

  const [reportCycles, setReportCycles] = useState<ReportCycle[]>([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages]   = useState(1);
  const [query, setQuery]             = useState("");

  const fetchReportCycles = useCallback(async () => {
    setLoading(true);
    try {
      let url = `${API_URL}/report_cycles?page=${currentPage}&limit=${pageSize}`;
      if (query) {
        url += `&search=${encodeURIComponent(query)}`;
      }
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data: ReportCyclesPaginated = await res.json();
      setReportCycles(data.items);
      setTotalPages(data.pages || 1);
    } catch {
      setError("Error al obtener ciclos.");
    } finally {
      setLoading(false);
    }
  }, [token, currentPage, pageSize, query]);

  useEffect(() => {
    fetchReportCycles();
  }, [fetchReportCycles]);

  return {
    reportCycles,
    loading,
    error,
    currentPage,
    totalPages,
    setPage: setCurrentPage,
    setQuery,
    refetch: fetchReportCycles,
    query,
  };
};
