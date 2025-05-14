import { useEffect, useState, useCallback } from "react";
import { Program, ProgramsPaginated } from "@lib/api/models/program";
import { useAuth } from "@contexts/authContext";

const API_URL = import.meta.env.VITE_API_URL;

export const useGetProgramsByInstitution = (institution_id: number) => {
  const { token } = useAuth();

  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);

  const fetchByInstitution = useCallback(async () => {
    if (!institution_id) {
      setPrograms([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${API_URL}/programs/institution/${institution_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error(`Status ${res.status}`);
      
      // Asumimos que la respuesta es del tipo:
      // { items: Program[], total, page, limit, pages }
      const data: ProgramsPaginated = await res.json();
      setPrograms(data.items);
    } catch (e: any) {
      setError(e.message || "Error al obtener reportes de la lista.");
    } finally {
      setLoading(false);
    }
  }, [token, institution_id]);

  useEffect(() => {
    fetchByInstitution();
  }, [fetchByInstitution]);

  return {
    programs,
    loading,
    error,
    refetch: fetchByInstitution,
  };
};
