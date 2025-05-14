import { useEffect, useState, useCallback } from "react";
import { Institution, InstitutionsPaginated } from "@lib/api/models/institution";
import { useAuth } from "@contexts/authContext";

const API_URL = import.meta.env.VITE_API_URL;

export const useGetInstitutions = (initialPage = 1, pageSize = 10) => {
  const { token } = useAuth();

  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages]   = useState(1);
  const [query, setQuery]             = useState("");

  const fetchInstitutions = useCallback(async () => {
    setLoading(true);
    try {
      let url = `${API_URL}/institutions?page=${currentPage}&limit=${pageSize}`;
      if (query) {
        url += `&query=${encodeURIComponent(query)}`;
      }
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data: InstitutionsPaginated = await res.json();
      setInstitutions(data.items);
      setTotalPages(data.pages || 1);
    } catch {
      setError("Error al obtener instituciones.");
    } finally {
      setLoading(false);
    }
  }, [token, currentPage, pageSize, query]);

  useEffect(() => {
    fetchInstitutions();
  }, [fetchInstitutions]);

  return {
    institutions,
    loading,
    error,
    currentPage,
    totalPages,
    setPage: setCurrentPage,
    setQuery,
    refetch: fetchInstitutions,
    query,
  };
};
