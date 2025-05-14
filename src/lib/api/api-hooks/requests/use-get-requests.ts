import { useEffect, useState, useCallback } from "react";
import { Request, RequestsPaginated } from "@lib/api/models/request";
import { useAuth } from "@contexts/authContext";

const API_URL = import.meta.env.VITE_API_URL;

export const useGetRequests = (initialPage = 1, pageSize = 10) => {
  const { token } = useAuth();

  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages]   = useState(1);
  const [query, setQuery]             = useState("");

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    try {
      let url = `${API_URL}/requests?page=${currentPage}&limit=${pageSize}`;
      if (query) {
        url += `&query=${encodeURIComponent(query)}`;
      }
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data: RequestsPaginated = await res.json();
      setRequests(data.items);
      setTotalPages(data.pages || 1);
    } catch {
      setError("Error al obtener solicitudes.");
    } finally {
      setLoading(false);
    }
  }, [token, currentPage, pageSize, query]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  return {
    requests,
    loading,
    error,
    currentPage,
    totalPages,
    setPage: setCurrentPage,
    setQuery,
    refetch: fetchRequests,
    query,
  };
};
