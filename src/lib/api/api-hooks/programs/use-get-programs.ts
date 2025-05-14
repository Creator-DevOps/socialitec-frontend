import { useEffect, useState, useCallback } from "react";
import { Program, ProgramsPaginated } from "@lib/api/models/program";
import { useAuth } from "@contexts/authContext";

const API_URL = import.meta.env.VITE_API_URL;

export const useGetPrograms = (initialPage = 1, pageSize = 10) => {
  const { token } = useAuth();

  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages]   = useState(1);
  const [query, setQuery]             = useState("");

  const fetchPrograms = useCallback(async () => {
    setLoading(true);
    try {
      let url = `${API_URL}/programs?page=${currentPage}&limit=${pageSize}`;
      if (query) {
        url += `&query=${encodeURIComponent(query)}`;
      }
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data: ProgramsPaginated = await res.json();
      setPrograms(data.items);
      setTotalPages(data.pages || 1);
    } catch {
      setError("Error al obtener programas.");
    } finally {
      setLoading(false);
    }
  }, [token, currentPage, pageSize, query]);

  useEffect(() => {
    fetchPrograms();
  }, [fetchPrograms]);

  return {
    programs,
    loading,
    error,
    currentPage,
    totalPages,
    setPage: setCurrentPage,
    setQuery,
    refetch: fetchPrograms,
    query,
  };
};
