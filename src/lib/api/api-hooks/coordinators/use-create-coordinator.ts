import { useState } from "react";
import { CoordinatorResponse } from "@lib/api/models/coordinator";
import { useAuth } from "@/contexts/authContext";

export const useCreateCoordinator = () => {
    const { token } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
  
    const createCoordinator = async (coordinator: {
      name: string;
      email: string;
      password: string;
      departament: string;
    }) => {
      try {
        setLoading(true);
  
        const payload = {
          ...coordinator
        };
  
        const response = await fetch(`${import.meta.env.VITE_API_URL}/coordinators`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
  
        const data: CoordinatorResponse = await response.json();
  
        if (!response.ok) throw new Error(data.message || "Error al crear coordinador.");
  
        return data;
      } catch (err: any) {
        setError(err.message || "Error al crear coordinador.");
        throw err;
      } finally {
        setLoading(false);
      }
    };
  
    return { createCoordinator, loading, error };
  };
  