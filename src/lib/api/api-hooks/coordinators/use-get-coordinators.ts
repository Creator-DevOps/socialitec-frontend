import { useEffect, useState, useCallback } from "react";
import { Coordinator, CoordinatorsPaginated } from "@lib/api/models/coordinator";
import { useAuth } from "@contexts/authContext";

const API_URL = import.meta.env.VITE_API_URL;

export const useGetCoordinators = (initialPage = 1, pageSize = 10) => {
  const { token } = useAuth();

  const [coordinators, setCoordinators] = useState<Coordinator[]>([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages]   = useState(1);
  const [query, setQuery]             = useState("");

  const fetchCoordinators = useCallback(async () => {
    setLoading(true);
    try {
      let url = `${API_URL}/coordinators?page=${currentPage}&limit=${pageSize}`;
      if (query) {
        url += `&query=${encodeURIComponent(query)}`;
      }
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data: CoordinatorsPaginated = await res.json();
      setCoordinators(data.items);
      setTotalPages(data.pages || 1);
    } catch {
      setError("Error al obtener coordinadores.");
    } finally {
      setLoading(false);
    }
  }, [token, currentPage, pageSize, query]);

  // Un único efecto que se dispara cuando cambian pageSize, currentPage o query
  useEffect(() => {
    fetchCoordinators();
  }, [fetchCoordinators]);

  return {
    coordinators,
    loading,
    error,
    currentPage,
    totalPages,
    setPage: setCurrentPage,
    setQuery,
    refetch: fetchCoordinators,
    query,
  };
};
