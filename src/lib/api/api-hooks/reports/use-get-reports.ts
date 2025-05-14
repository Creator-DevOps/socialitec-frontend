import { useEffect, useState, useCallback } from "react";
import { Report, ReportsPaginated } from "@lib/api/models/report";
import { useAuth } from "@contexts/authContext";

const API_URL = import.meta.env.VITE_API_URL;

export const useGetReports = (initialPage = 1, pageSize = 10) => {
  const { token } = useAuth();

  const [reports, setReports] = useState<Report[]>([]);
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
      setReports(data.items);
      setTotalPages(data.pages || 1);
    } catch {
      setError("Error al obtener reportes.");
    } finally {
      setLoading(false);
    }
  }, [token, currentPage, pageSize, query]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return {
    reports,
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
