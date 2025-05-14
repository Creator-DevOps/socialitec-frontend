import { useEffect, useState, useCallback } from "react";
import { Report } from "@lib/api/models/report";
import { useAuth } from "@contexts/authContext";

const API_URL = import.meta.env.VITE_API_URL;

export const useGetReport = (document_id: number) => {
  const { token } = useAuth();

  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState<string | null>(null);

  const fetchReport = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/reports/${document_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);

      const json = await res.json() as {
        message: string;
        data: Report;
      };

      
      setReport(json.data);
    } catch (e: any) {
      setError(e.message || "Error al obtener reporte.");
    } finally {
      setLoading(false);
    }
  }, [token, document_id]);

  useEffect(() => {
    if (document_id) fetchReport();
  }, [fetchReport, document_id]);

  return {
    report,
    loading,
    error,
    refetch: fetchReport,
  };
};
