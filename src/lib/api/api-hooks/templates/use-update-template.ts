import { useState } from "react";
import { TemplateResponse } from "@lib/api/models/template";
import { useAuth } from "@/contexts/authContext";

const API_URL = import.meta.env.VITE_API_URL;

export const useUpdateTemplate = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const updateTemplate = async (
    document_id: number,
    updates: Partial<{
      document_name: string;
      description: string;
      coordinator_id: number;
      file: File | null;
    }>
  ): Promise<TemplateResponse> => {
    try {
      setLoading(true);
      setError(null);
      const form = new FormData();
      if (updates.description !== undefined) {
        form.append("description", updates.description);
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
        `${API_URL}/templates/${document_id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: form,
        }
      );

      const result: TemplateResponse = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Error al actualizar plantilla.");
      }

      return result;
    } catch (err: any) {
      setError(err.message ?? "Error al actualizar plantilla.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateTemplate, loading, error };
};
