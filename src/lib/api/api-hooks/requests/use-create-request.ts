import { useState } from "react";
import { RequestResponse } from "@lib/api/models/request";
import { useAuth } from "@/contexts/authContext";

export const useCreateRequest = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createRequest = async (Request: {
    student_id: number;
    program_id: number;
    cycle_id?:number;
    coordinator_id?: number;
    acceptance_status: number;
    progress_status: number;
    completed_hours: number;
    feedback: string;
  }) => {
    try {
      setLoading(true);

      const payload = {
        ...Request,
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data: RequestResponse = await response.json();

      if (!response.ok)
        throw new Error(data.message || "Error al crear solicitud.");

      return data;
    } catch (err: any) {
      setError(err.message || "Error al crear solicitud.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createRequest, loading, error };
};
