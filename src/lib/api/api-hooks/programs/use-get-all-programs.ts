import { useEffect, useState, useCallback } from "react";
import { Program, ProgramsPaginated } from "@lib/api/models/program";
import { useAuth } from "@contexts/authContext";

const API_URL = import.meta.env.VITE_API_URL;

export const useGetAllPrograms = () => {
  const { token } = useAuth();

  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState<string | null>(null);

  const fetchPrograms = useCallback(async () => {
    setLoading(true);
    try {
      let url = `${API_URL}/programs`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data: ProgramsPaginated = await res.json();
      setPrograms(data.items);
      
    } catch {
      setError("Error al obtener programas.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchPrograms();
  }, [fetchPrograms]);

  return {
    programs,
    loading,
    error,
    refetch: fetchPrograms,
  };
};
