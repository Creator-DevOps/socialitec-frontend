import { useEffect, useState, useCallback } from "react";
import { Program } from "@lib/api/models/program";
import { useAuth } from "@contexts/authContext";

const API_URL = import.meta.env.VITE_API_URL;

export const useGetProgram = (program_id: number) => {
  const { token } = useAuth();

  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState<string | null>(null);

  const fetchProgram = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/programs/${program_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);

      const json = await res.json() as {
        message: string;
        data: Program;
      };

      
      setProgram(json.data);
    } catch (e: any) {
      setError(e.message || "Error al obtener programa.");
    } finally {
      setLoading(false);
    }
  }, [token, program_id]);

  useEffect(() => {
    if (program_id) fetchProgram();
  }, [fetchProgram, program_id]);

  return {
    program,
    loading,
    error,
    refetch: fetchProgram,
  };
};
