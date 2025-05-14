import { useState } from "react";
import { ReportCycleResponse } from "@lib/api/models/report-cycle";
import { useAuth } from "@contexts/authContext";

const API_URL = import.meta.env.VITE_API_URL;

export const useUpdateReportCycle = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const updateReportCycle = async (cycle_id: number, updates: Partial<{
    name: string;
    folder_name: string;
    start_date: string;   // ISO date, e.g. "2025-01-15"
    end_date: string; 
  }>) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/report_cycles/${cycle_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });

      const data: ReportCycleResponse = await response.json();

      if (!response.ok) throw new Error(data.message || "Error al actualizar ciclo.");

      return data;
    } catch (err: any) {
      setError(err.message || "Error al actualizar ciclo.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateReportCycle, loading, error };
};
