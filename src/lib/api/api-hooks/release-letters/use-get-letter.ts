import { useEffect, useState, useCallback } from "react";
import { Letter } from "@lib/api/models/letter";
import { useAuth } from "@contexts/authContext";

const API_URL = import.meta.env.VITE_API_URL;

export const useGetLetter = (document_id: number) => {
  const { token } = useAuth();

  const [letter, setLetter] = useState<Letter | null>(null);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState<string | null>(null);

  const fetchLetter = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/letters/${document_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);

      const json = await res.json() as {
        message: string;
        data: Letter;
      };

      
      setLetter(json.data);
    } catch (e: any) {
      setError(e.message || "Error al obtener carta.");
    } finally {
      setLoading(false);
    }
  }, [token, document_id]);

  useEffect(() => {
    if (document_id) fetchLetter();
  }, [fetchLetter, document_id]);

  return {
    letter,
    loading,
    error,
    refetch: fetchLetter,
  };
};
