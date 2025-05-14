import { useEffect, useState, useCallback } from "react";
import { Request } from "@lib/api/models/request";
import { useAuth } from "@contexts/authContext";

const API_URL = import.meta.env.VITE_API_URL;

export const useGetRequestUser = (user_id: number) => {
  const { token } = useAuth();

  const [request, setRequest] = useState<Request | null>(null);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState<string | null>(null);

  const fetchRequest = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/requests/user/${user_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);

      const json = await res.json() as {
        message: string;
        data: Request;
      };

      
      setRequest(json.data);
    } catch (e: any) {
      setError(e.message || "Error al obtener solicitud.");
    } finally {
      setLoading(false);
    }
  }, [token, user_id]);

  useEffect(() => {
    if (user_id) fetchRequest();
  }, [fetchRequest, user_id]);

  return {
    request,
    loading,
    error,
    refetch: fetchRequest,
  };
};
