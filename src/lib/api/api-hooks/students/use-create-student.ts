import { useState } from "react";
import { StudentResponse } from "@lib/api/models/student";
import { useAuth } from "@/contexts/authContext";

export const useCreateStudent = () => {
    const { token } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
  
    const createStudent = async (student: {
      name: string;
      email: string;
      password: string;
      control_number: string;
      major: string;
      semester: number;
      credits: number;
    }) => {
      try {
        setLoading(true);
  
        const payload = {
          ...student
        };
  
        const response = await fetch(`${import.meta.env.VITE_API_URL}/students`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
  
        const data: StudentResponse = await response.json();
  
        if (!response.ok) throw new Error(data.message || "Error al crear estudiante.");
  
        return data;
      } catch (err: any) {
        setError(err.message || "Error al crear estudiante.");
        throw err;
      } finally {
        setLoading(false);
      }
    };
  
    return { createStudent, loading, error };
  };
  