import { useState } from "react";
import { useAuth } from "@contexts/authContext";

const API_URL = import.meta.env.VITE_API_URL;

export const useDeleteReportCycleItem = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const deleteReportCycleItem = async (cycle_id: number, item_id: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_URL}/report_cycles/${cycle_id}/items/${item_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok)
        throw new Error(data.message || "Error al eliminar lista de entrega.");

      return data;
    } catch (err: any) {
      setError(err.message || "Error al eliminar lista de entrega.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteReportCycleItem, loading, error };
};
