import { useState, useCallback } from "react";
import { useAuth } from "@/contexts/authContext";
import { useToast } from "@/lib/hooks/use-toast";

const API_URL = import.meta.env.VITE_API_URL; // ¡asegúrate de que sea HTTPS!

export const useShowPreviewLetter = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toastError } = useToast();

  const openPreview = useCallback(
    async (document_id: number, filePath: string) => {
      setLoading(true);
      setError(null);

      // 1) Abrimos la ventana _antes_ de las operaciones asíncronas
      const win = window.open("", "_blank");
      if (!win) {
        toastError({ title: "Error", message: "Por favor permite ventanas emergentes." });
        setLoading(false);
        return;
      }

      try {
        // 2) Obtener URL firmada
        const res1 = await fetch(
          `${API_URL}/letters/${document_id}/signed-url`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res1.ok) throw new Error(`Error ${res1.status}`);
        const { url: presigned } = (await res1.json()) as { url: string };

        // 3) Descargar blob
        const res2 = await fetch(presigned);
        if (!res2.ok) throw new Error(`Error blob ${res2.status}`);
        const raw = await res2.blob();

        // 4) Reconstruir MIME
        const ext = filePath.split(".").pop()?.toLowerCase() || "";
        const mimeByExt: Record<string, string> = {
          pdf:  "application/pdf",
          svg:  "image/svg+xml",
          // … otros …
        };
        const mime = mimeByExt[ext] || raw.type || "application/octet-stream";
        const blob = new Blob([raw], { type: mime });
        const blobUrl = URL.createObjectURL(blob);

        // 5) Redirigir la ventana que abrimos al blob
        win.location.href = blobUrl;

        // 6) Limpiar después de un rato
        setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000);
      } catch (e: any) {
        // Si hay error, cerramos la ventana y mostramos mensaje real
        win.close();
        console.error("Error en vista previa:", e);
        toastError({ title: "Error en vista previa", message: e.message });
        setError(e.message);
      } finally {
        setLoading(false);
      }
    },
    [token, toastError]
  );

  return { openPreview, loading, error };
};
