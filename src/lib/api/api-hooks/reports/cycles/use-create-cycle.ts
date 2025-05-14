import { useState } from "react";
import { ReportCycleResponse } from "@lib/api/models/report-cycle";
import { useAuth } from "@/contexts/authContext";

export const useCreateReportCycle = () => {
    const { token } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
  
    const createReportCycle = async (ReportCycle: {
      name: string;
      folder_name: string;
      start_date: string;   // ISO date, e.g. "2025-01-15"
      end_date: string; 
    }) => {
      try {
        setLoading(true);
  
        const payload = {
          ...ReportCycle
        };
  
        const response = await fetch(`${import.meta.env.VITE_API_URL}/report_cycles`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
  
        const data: ReportCycleResponse = await response.json();
  
        if (!response.ok) throw new Error(data.message || "Error al crear ciclo.");
  
        return data;
      } catch (err: any) {
        setError(err.message || "Error al crear ciclo.");
        throw err;
      } finally {
        setLoading(false);
      }
    };
  
    return { createReportCycle, loading, error };
  };
  