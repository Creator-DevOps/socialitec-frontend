import { useState } from "react";
import { ReportCycleItemResponse } from "@lib/api/models/report-cycle-item";
import { useAuth } from "@/contexts/authContext";

export const useCreateReportCycleItem = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createReportCycleItem = async (ReportCycleItem: {
    cycle_id: number;
    report_number: number;
    title: string;
    start_date: string; // ISO date
    end_date: string;
  }) => {
    try {
      setLoading(true);

      const payload = {
        ...ReportCycleItem,
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/report_cycles/${
          ReportCycleItem.cycle_id
        }/items`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data: ReportCycleItemResponse = await response.json();

      if (!response.ok)
        throw new Error(data.message || "Error al crear lista de entrega.");

      return data;
    } catch (err: any) {
      setError(err.message || "Error al crear lista de entrega.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createReportCycleItem, loading, error };
};
