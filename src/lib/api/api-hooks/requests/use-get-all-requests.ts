import { useEffect, useState, useCallback } from "react";
import { Request, RequestsPaginated } from "@lib/api/models/request";
import { useAuth } from "@contexts/authContext";

const API_URL = import.meta.env.VITE_API_URL;

export const useGetAllRequests = () => {
  const { token } = useAuth();

  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState<string | null>(null);

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    try {
      let url = `${API_URL}/requests`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data: RequestsPaginated = await res.json();
      setRequests(data.items);
      
    } catch {
      setError("Error al obtener solicitudes.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  return {
    requests,
    loading,
    error,
    refetch: fetchRequests,
  };
};
