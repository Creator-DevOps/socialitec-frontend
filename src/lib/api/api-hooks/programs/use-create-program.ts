import { useState } from "react";
import { ProgramResponse } from "@lib/api/models/program";
import { useAuth } from "@/contexts/authContext";

export const useCreateProgram = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createProgram = async (Program: {
    institution_id: number;
    program_name: string;
    description: string;
    activities: string;
    supervisor_name: string;
    supervisor_phone: string;
    supervisor_email: string;
  }) => {
    try {
      setLoading(true);

      const payload = {
        ...Program,
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/programs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data: ProgramResponse = await response.json();

      if (!response.ok)
        throw new Error(data.message || "Error al crear programa.");

      return data;
    } catch (err: any) {
      setError(err.message || "Error al crear programa.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createProgram, loading, error };
};
