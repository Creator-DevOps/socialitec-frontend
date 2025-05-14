import { useEffect, useState, useCallback } from "react";
import { Template } from "@lib/api/models/template";
import { useAuth } from "@contexts/authContext";

const API_URL = import.meta.env.VITE_API_URL;

export const useGetTemplate = (document_id: number) => {
  const { token } = useAuth();

  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState<string | null>(null);

  const fetchTemplate = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/templates/${document_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);

      const json = await res.json() as {
        message: string;
        data: Template;
      };

      
      setTemplate(json.data);
    } catch (e: any) {
      setError(e.message || "Error al obtener plantilla.");
    } finally {
      setLoading(false);
    }
  }, [token, document_id]);

  useEffect(() => {
    if (document_id) fetchTemplate();
  }, [fetchTemplate, document_id]);

  return {
    template,
    loading,
    error,
    refetch: fetchTemplate,
  };
};
