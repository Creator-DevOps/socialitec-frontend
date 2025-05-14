import { useState, useCallback } from "react";
import { useAuth } from "@/contexts/authContext";

const API_URL = import.meta.env.VITE_API_URL;

export const useDownloadReport = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const downloadReport = useCallback(
    async (document_id: number) => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${API_URL}/reports/${document_id}/download`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) throw new Error(`Server responded ${res.status}`);

        const blob = await res.blob();

        const disposition = res.headers.get("content-disposition");
        let filename = `report-${document_id}`; 
        if (disposition) {
          const match = disposition.match(/filename="?([^"]+)"?/);
          if (match && match[1]) filename = match[1];
        }

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      } catch (e: any) {
        setError(e.message ?? "Error al descargar reporte.");
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  return { downloadReport, loading, error };
};
