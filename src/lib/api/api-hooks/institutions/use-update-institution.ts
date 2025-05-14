import { useState } from "react";
import { InstitutionResponse } from "@lib/api/models/institution";
import { useAuth } from "@contexts/authContext";

const API_URL = import.meta.env.VITE_API_URL;

export const useUpdateInstitution = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const updateInstitution = async (institution_id: number, updates: Partial<{
    institution_name: string;
      description: string;
      email: string;
      phone: string;
      neighborhood: string;
      street: string;
      number: string;
      postal_code:string;
  }>) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/institutions/${institution_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });

      const data: InstitutionResponse = await response.json();

      if (!response.ok) throw new Error(data.message || "Error al actualizar institución.");

      return data;
    } catch (err: any) {
      setError(err.message || "Error al actualizar institución.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateInstitution, loading, error };
};
