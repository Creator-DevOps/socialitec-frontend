import { useState } from "react";
import { ReportCycleItemResponse } from "@lib/api/models/report-cycle-item";
import { useAuth } from "@contexts/authContext";

const API_URL = import.meta.env.VITE_API_URL;

export const useUpdateReportCycleItem = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const updateReportCycleItem = async (
    item_id: number,
    updates: Partial<{
      item_id: number;
      cycle_id: number;
      report_number: number;
      title: string;
      start_date: string; // ISO date
      end_date: string;
    }>
  ) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_URL}/report_cycles/${updates.cycle_id}/items/${item_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updates),
        }
      );

      const data: ReportCycleItemResponse = await response.json();

      if (!response.ok)
        throw new Error(
          data.message || "Error al actualizar la lista de entrega."
        );

      return data;
    } catch (err: any) {
      setError(err.message || "Error al actualizar la lista de entrega.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateReportCycleItem, loading, error };
};
