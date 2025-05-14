// src/hooks/useShowPreviewTemplate.ts
import { useState, useCallback } from "react";
import { useAuth } from "@/contexts/authContext";
import { useToast } from "@/lib/hooks/use-toast";

const API_URL = import.meta.env.VITE_API_URL; 

export const useShowPreviewTemplate = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toastError } = useToast();

  const openPreview = useCallback(
    async (document_id: number, filePath: string) => {
      setLoading(true);
      setError(null);

      const win = window.open("", "_blank");
      if (!win) {
        toastError({
          title: "Error",
          message: "Por favor permite ventanas emergentes.",
        });
        setLoading(false);
        return;
      }

      try {
        const res1 = await fetch(
          `${API_URL}/templates/${document_id}/signed-url`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res1.ok) throw new Error(`Error ${res1.status}`);
        const { url: presigned } = (await res1.json()) as { url: string };

        const res2 = await fetch(presigned);
        if (!res2.ok) throw new Error(`Error blob ${res2.status}`);
        const raw = await res2.blob();

        const ext = filePath.split(".").pop()?.toLowerCase() || "";
        const mimeByExt: Record<string, string> = {
          pdf:  "application/pdf",
          svg:  "image/svg+xml",
          txt:  "text/plain",
          xml:  "application/xml",
          doc:  "application/msword",
          docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          xls:  "application/vnd.ms-excel",
          xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          csv:  "text/csv",
          ppt:  "application/vnd.ms-powerpoint",
          pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
          png:  "image/png",
          jpg:  "image/jpeg",
          jpeg: "image/jpeg",
          gif:  "image/gif",
        };
        const mime = mimeByExt[ext] || raw.type || "application/octet-stream";

        const blob = new Blob([raw], { type: mime });
        const blobUrl = URL.createObjectURL(blob);
        win.location.href = blobUrl;

        setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000);
      } catch (e: any) {
        win.close();
        console.error("Error en vista previa:", e);
        toastError({
          title: "Error en vista previa",
          message: e.message || "No fue posible mostrar la vista previa.",
        });
        setError(e.message || "No fue posible mostrar la vista previa.");
      } finally {
        setLoading(false);
      }
    },
    [token, toastError]
  );

  return { openPreview, loading, error };
};
