import { useEffect, useState, useCallback } from "react";
import { Student } from "@lib/api/models/student";
import { useAuth } from "@contexts/authContext";

const API_URL = import.meta.env.VITE_API_URL;

export const useGetStudent = (student_id: number) => {
  const { token } = useAuth();

  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState<string | null>(null);

  const getStudent = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/students/${student_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);

      const json = await res.json() as {
        message: string;
        data: Student;
      };

      
      setStudent(json.data);
    } catch (e: any) {
      setError(e.message || "Error al obtener estudiante.");
    } finally {
      setLoading(false);
    }
  }, [token, student_id]);

  useEffect(() => {
    if (student_id) getStudent();
  }, [getStudent, student_id]);

  return {
    student,
    loading,
    error,
    refetch: getStudent,
  };
};
