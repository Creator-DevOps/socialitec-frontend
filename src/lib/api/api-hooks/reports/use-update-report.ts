import { useState } from "react";
import { ReportResponse } from "@lib/api/models/report";
import { useAuth } from "@/contexts/authContext";

const API_URL = import.meta.env.VITE_API_URL;

export const useUpdateReport = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateReport = async (
    document_id: number,
    updates: Partial<{
      document_name: string;
      feedback: string;
      coordinator_id: number;
      request_id: number;
      item_id:number;
      report_number: number;
      status: number;
      file: File | null;
    }>
  ): Promise<ReportResponse> => {
    try {
      setLoading(true);
      setError(null);

      const form = new FormData();
      if (updates.feedback !== undefined) {
        form.append("feedback", updates.feedback);
      }
      if (updates.document_name !== undefined) {
        form.append("document_name", updates.document_name);
      }
      if (updates.coordinator_id !== undefined) {
        form.append("coordinator_id", String(updates.coordinator_id));
      }
      if (updates.request_id !== undefined) {
        form.append("request_id", String(updates.request_id));
      }
      if (updates.item_id !== undefined) {
        form.append("item_id", String(updates.item_id));
      }
      if (updates.status !== undefined) {
        form.append("status", String(updates.status));
      }
      if (updates.report_number !== undefined) {
        form.append("report_number", String(updates.report_number));
      }
      if (updates.file instanceof File) {
        form.append("file", updates.file);
      }

      const response = await fetch(
        `${API_URL}/reports/${document_id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: form,
        }
      );

      const result: ReportResponse = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Error al actualizar reporte.");
      }

      return result;
    } catch (err: any) {
      setError(err.message ?? "Error al actualizar reporte.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateReport, loading, error };
};
