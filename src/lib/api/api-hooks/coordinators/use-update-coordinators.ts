import { useState } from "react";
import { CoordinatorResponse } from "@lib/api/models/coordinator";
import { useAuth } from "@contexts/authContext";

const API_URL = import.meta.env.VITE_API_URL;

export const useUpdateCoordinator = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const updateCoordinator = async (userId: number, updates: Partial<{
    name: string;
    email: string;
    password: string;
    departament: string;
  }>) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/coordinators/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });

      const data: CoordinatorResponse = await response.json();

      if (!response.ok) throw new Error(data.message || "Error al actualizar coordinador.");

      return data;
    } catch (err: any) {
      setError(err.message || "Error al actualizar coordinador.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateCoordinator, loading, error };
};
