import { useEffect, useState, useCallback } from "react";
import { Student, StudentsPaginated } from "@lib/api/models/student";
import { useAuth } from "@contexts/authContext";

const API_URL = import.meta.env.VITE_API_URL;

export const useGetStudents = (initialPage = 1, pageSize = 10) => {
  const { token } = useAuth();

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages]   = useState(1);
  const [query, setQuery]             = useState("");

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    try {
      let url = `${API_URL}/students?page=${currentPage}&limit=${pageSize}`;
      if (query) {
        url += `&query=${encodeURIComponent(query)}`;
      }
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data: StudentsPaginated = await res.json();
      setStudents(data.items);
      setTotalPages(data.pages || 1);
    } catch {
      setError("Error al obtener estudiantes.");
    } finally {
      setLoading(false);
    }
  }, [token, currentPage, pageSize, query]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  return {
    students,
    loading,
    error,
    currentPage,
    totalPages,
    setPage: setCurrentPage,
    setQuery,
    refetch: fetchStudents,
    query,
  };
};
