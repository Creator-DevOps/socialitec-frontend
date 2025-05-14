import { useState } from "react";
import { LetterResponse } from "@lib/api/models/letter";
import { useAuth } from "@/contexts/authContext";

const API_URL = import.meta.env.VITE_API_URL;

export const useUpdateLetter = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const updateLetter = async (
    document_id: number,
    updates: Partial<{
      document_name: string;
      request_id: number;
      coordinator_id: number;
      file: File | null;
    }>
  ): Promise<LetterResponse> => {
    try {
      setLoading(true);
      setError(null);
      const form = new FormData();
      if (updates.request_id !== undefined) {
        form.append("request_id", String(updates.request_id));
      }
      if (updates.document_name !== undefined) {
        form.append("document_name", updates.document_name);
      }
      if (updates.coordinator_id !== undefined) {
        form.append("coordinator_id", String(updates.coordinator_id));
      }
      if (updates.file instanceof File) {
        form.append("file", updates.file);
      }

      const response = await fetch(
        `${API_URL}/letters/${document_id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: form,
        }
      );

      const result: LetterResponse = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Error al actualizar carta.");
      }

      return result;
    } catch (err: any) {
      setError(err.message ?? "Error al actualizar carta.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateLetter, loading, error };
};
