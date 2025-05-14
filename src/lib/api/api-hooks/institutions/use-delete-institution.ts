import { useState } from "react";
import { useAuth } from "@contexts/authContext";

const API_URL = import.meta.env.VITE_API_URL;

export const useDeleteInstitution = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const deleteInstitution = async (institution_id: number) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/institutions/${institution_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Error al eliminar institución.");

      return data;
    } catch (err: any) {
      setError(err.message || "Error al eliminar institución.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteInstitution, loading, error };
};
