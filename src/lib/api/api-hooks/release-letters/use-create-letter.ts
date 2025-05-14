import { useState } from "react";
import { LetterResponse } from "@lib/api/models/letter";
import { useAuth } from "@/contexts/authContext";

export const useCreateLetter = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createLetter = async (data: {
    document_name: string;
    coordinator_id: number;
    request_id:number;
    file: File | null;
  }): Promise<LetterResponse> => {
    try {
      setLoading(true);
      setError(null);

      const form = new FormData();
      form.append("request_id", String(data.request_id));
      form.append("document_name", data.document_name);
      form.append("coordinator_id", String(data.coordinator_id));
      if (data.file) {
        form.append("file", data.file);
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/letters`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: form,
        }
      );

      const result: LetterResponse = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Error al crear carta.");
      }

      return result;
    } catch (err: any) {
      setError(err.message ?? "Error al crear carta.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createLetter, loading, error };
};
