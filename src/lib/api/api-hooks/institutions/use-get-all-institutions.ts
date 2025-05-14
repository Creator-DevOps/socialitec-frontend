import { useEffect, useState, useCallback } from "react";
import { Institution, InstitutionsPaginated } from "@lib/api/models/institution";
import { useAuth } from "@contexts/authContext";

const API_URL = import.meta.env.VITE_API_URL;

export const useGetAllInstitutions = () => {
  const { token } = useAuth();

  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState<string | null>(null);

  const fetchInstitutions = useCallback(async () => {
    setLoading(true);
    try {
      let url = `${API_URL}/institutions`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data: InstitutionsPaginated = await res.json();
      setInstitutions(data.items);
      
    } catch {
      setError("Error al obtener instituciones.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchInstitutions();
  }, [fetchInstitutions]);

  return {
    institutions,
    loading,
    error,
    refetch: fetchInstitutions,
  };
};
