import { useEffect, useState, useCallback } from "react";
import { Template, TemplatesPaginated } from "@lib/api/models/template";
import { useAuth } from "@contexts/authContext";

const API_URL = import.meta.env.VITE_API_URL;

export const useGetTemplates = (initialPage = 1, pageSize = 10) => {
  const { token } = useAuth();

  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages]   = useState(1);
  const [query, setQuery]             = useState("");

  const fetchTemplates = useCallback(async () => {
    setLoading(true);
    try {
      let url = `${API_URL}/templates?page=${currentPage}&limit=${pageSize}`;
      if (query) {
        url += `&query=${encodeURIComponent(query)}`;
      }
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data: TemplatesPaginated = await res.json();
      setTemplates(data.items);
      setTotalPages(data.pages || 1);
    } catch {
      setError("Error al obtener plantillas.");
    } finally {
      setLoading(false);
    }
  }, [token, currentPage, pageSize, query]);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  return {
    templates,
    loading,
    error,
    currentPage,
    totalPages,
    setPage: setCurrentPage,
    setQuery,
    refetch: fetchTemplates,
    query,
  };
};
