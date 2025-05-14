import { useState } from "react";
import { ReportResponse } from "@lib/api/models/report";
import { useAuth } from "@/contexts/authContext";

export const useCreateReport = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createReport = async (data: {
    document_name: string;
    item_id:number;
    feedback: string;
    coordinator_id: number;
    request_id:number;
    report_number:number;
    status:number;
    file: File | null;
  }): Promise<ReportResponse> => {
    try {
      setLoading(true);
      setError(null);

      const form = new FormData();
      form.append("feedback",data.feedback);
      form.append("document_name", data.document_name);
      form.append("coordinator_id", String(data.coordinator_id));
      form.append("request_id", String(data.request_id))
      form.append("status", String(data.status));
      form.append("item_id", String(data.item_id));
      form.append("report_number", String(data.report_number));
      if (data.file) {
        form.append("file", data.file);
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/reports`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: form,
        }
      );

      const result: ReportResponse = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Error al crear reporte.");
      }

      return result;
    } catch (err: any) {
      setError(err.message ?? "Error al crear reporte.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createReport, loading, error };
};
