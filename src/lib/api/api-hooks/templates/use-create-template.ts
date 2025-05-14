import { useState } from "react";
import { TemplateResponse } from "@lib/api/models/template";
import { useAuth } from "@/contexts/authContext";

export const useCreateTemplate = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createTemplate = async (data: {
    document_name: string;
    description: string;
    coordinator_id: number;
    file: File | null;
  }): Promise<TemplateResponse> => {
    try {
      setLoading(true);
      setError(null);

      const form = new FormData();
      form.append("description", data.description);
      form.append("document_name", data.document_name);
      form.append("coordinator_id", String(data.coordinator_id));
      if (data.file) {
        form.append("file", data.file);
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/templates`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: form,
        }
      );

      const result: TemplateResponse = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Error al crear plantilla.");
      }

      return result;
    } catch (err: any) {
      setError(err.message ?? "Error al crear plantilla.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createTemplate, loading, error };
};
