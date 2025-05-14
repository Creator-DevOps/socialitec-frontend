import { useEffect, useState, useCallback } from "react";
import { Student, StudentsPaginated } from "@lib/api/models/student";
import { useAuth } from "@contexts/authContext";

const API_URL = import.meta.env.VITE_API_URL;

export const useGetAllStudents = () => {
  const { token } = useAuth();

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState<string | null>(null);

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    try {
      let url = `${API_URL}/students`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data: StudentsPaginated = await res.json();
      setStudents(data.items);
      
    } catch {
      setError("Error al obtener Studentas.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  return {
    students,
    loading,
    error,
    refetch: fetchStudents,
  };
};
