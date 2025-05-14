import { useState } from "react";
import { StudentResponse } from "@lib/api/models/student";
import { useAuth } from "@contexts/authContext";

const API_URL = import.meta.env.VITE_API_URL;

export const useUpdateStudent = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const updateStudent = async (userId: number, updates: Partial<{
    name: string;
    email: string;
    password: string;
    departament: string;
  }>) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/students/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });

      const data: StudentResponse = await response.json();

      if (!response.ok) throw new Error(data.message || "Error al actualizar estudiante.");

      return data;
    } catch (err: any) {
      setError(err.message || "Error al actualizar estudiante.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateStudent, loading, error };
};
