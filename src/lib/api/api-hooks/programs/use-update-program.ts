import { useState } from "react";
import { ProgramResponse } from "@lib/api/models/program";
import { useAuth } from "@contexts/authContext";

const API_URL = import.meta.env.VITE_API_URL;

export const useUpdateProgram = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const updateProgram = async (program_id: number, updates: Partial<{
    institution_id: number;
    program_name: string;
    description: string;
    activities: string;
    supervisor_name: string;
    supervisor_phone: string;
    supervisor_email: string;
  }>) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/programs/${program_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });

      const data: ProgramResponse = await response.json();

      if (!response.ok) throw new Error(data.message || "Error al actualizar programa.");

      return data;
    } catch (err: any) {
      setError(err.message || "Error al actualizar programa.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateProgram, loading, error };
};
