import { useState } from "react";
import { RequestResponse } from "@lib/api/models/request";
import { useAuth } from "@contexts/authContext";

const API_URL = import.meta.env.VITE_API_URL;

export const useUpdateRequest = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const updateRequest = async (request_id: number, updates: Partial<{
    student_id: number;
    program_id: number;
    coordinator_id?: number;
    acceptance_status: number;
    progress_status: number;
    completed_hours: number;
    feedback: string;
  }>) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/requests/${request_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });

      const data: RequestResponse = await response.json();

      if (!response.ok) throw new Error(data.message || "Error al actualizar solicitud.");

      return data;
    } catch (err: any) {
      setError(err.message || "Error al actualizar solicitud.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateRequest, loading, error };
};
