import { useState } from "react";
import { InstitutionResponse } from "@lib/api/models/institution";
import { useAuth } from "@/contexts/authContext";

export const useCreateInstitution = () => {
    const { token } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
  
    const createInstitution = async (institution: {
      institution_name: string;
      description: string;
      email: string;
      phone: string;
      neighborhood: string;
      street: string;
      number: string;
      postal_code:string;
    }) => {
      try {
        setLoading(true);
  
        const payload = {
          ...institution
        };
  
        const response = await fetch(`${import.meta.env.VITE_API_URL}/institutions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
  
        const data: InstitutionResponse = await response.json();
  
        if (!response.ok) throw new Error(data.message || "Error al crear institución.");
  
        return data;
      } catch (err: any) {
        setError(err.message || "Error al crear institución.");
        throw err;
      } finally {
        setLoading(false);
      }
    };
  
    return { createInstitution, loading, error };
  };
  