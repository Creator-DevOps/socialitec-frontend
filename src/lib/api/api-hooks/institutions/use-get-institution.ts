import { useEffect, useState, useCallback } from "react";
import { Institution } from "@lib/api/models/institution";
import { useAuth } from "@contexts/authContext";

const API_URL = import.meta.env.VITE_API_URL;

export const useGetInstitution = (institution_id: number) => {
  const { token } = useAuth();

  const [institution, setInstitution] = useState<Institution | null>(null);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState<string | null>(null);

  const fetchInstitution = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/institutions/${institution_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);

      const json = await res.json() as {
        message: string;
        data: Institution;
      };

      
      setInstitution(json.data);
    } catch (e: any) {
      setError(e.message || "Error al obtener institución.");
    } finally {
      setLoading(false);
    }
  }, [token, institution_id]);

  useEffect(() => {
    if (institution_id) fetchInstitution();
  }, [fetchInstitution, institution_id]);

  return {
    institution,
    loading,
    error,
    refetch: fetchInstitution,
  };
};
