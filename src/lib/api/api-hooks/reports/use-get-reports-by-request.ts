import { useEffect, useState, useCallback } from "react";
import { Report, ReportsPaginated } from "@lib/api/models/report";
import { useAuth } from "@contexts/authContext";

const API_URL = import.meta.env.VITE_API_URL;

export const useGetReportsByRequest = (request_id:number,initialPage = 1, pageSize = 10) => {
  const { token } = useAuth();

  const [reportsRequest, setReports] = useState<Report[]>([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages]   = useState(1);
  const [query, setQuery]             = useState("");

  const fetchReports = useCallback(async () => {
    setLoading(true);
    try {
      let url = `${API_URL}/reports?page=${currentPage}&limit=${pageSize}`;
      if (query) {
        url += `&search=${encodeURIComponent(query)}`;
      }
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data: ReportsPaginated = await res.json();
      const filtered = data.items.filter(
        (item) => item.request.request_id === request_id
      );
      
      setReports(filtered);
      setTotalPages(data.pages || 1);
    } catch {
      setError("Error al obtener reportes de solicitud.");
    } finally {
      setLoading(false);
    }
  }, [token, currentPage, pageSize, query,request_id]);

  useEffect(() => {
     if (request_id > 0) {
    fetchReports();
  }
  }, [fetchReports,request_id]);

  return {
    reportsRequest,
    loading,
    error,
    currentPage,
    totalPages,
    setPage: setCurrentPage,
    setQuery,
    refetch: fetchReports,
    query,
  };
};
