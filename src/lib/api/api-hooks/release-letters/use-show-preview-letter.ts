import { useState, useCallback } from "react";
import { useAuth } from "@/contexts/authContext";
import { useToast } from "@/lib/hooks/use-toast";

const API_URL = import.meta.env.VITE_API_URL;


export const useShowPreviewLetter = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toastSuccess, toastError, toastWarning } = useToast();

  const openPreview = useCallback(
    async (document_id: number, filePath: string) => {
      setLoading(true);
      setError(null);
      try {
        const res1 = await fetch(
          `${API_URL}/letters/${document_id}/signed-url`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res1.ok) throw new Error(`Error ${res1.status}`);
        const { url: presigned } = (await res1.json()) as { url: string };

        const res2 = await fetch(presigned);
        if (!res2.ok) throw new Error(`Error descargando blob ${res2.status}`);
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

        // 4) Recrear blob con MIME correcto
        const blob = new Blob([raw], { type: mime });
        const blobUrl = URL.createObjectURL(blob);

        const win = window.open("");
        if (!win) throw new Error("Imposible abrir nueva ventana");
        win.document.write(
          `<html><head><title>Vista previa</title><style>body,html{margin:0;height:100%;}</style></head>` +
            `<body><iframe src=\"${blobUrl}\" style=\"border:none;width:100%;height:100%;\"></iframe></body></html>`
        );

        setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000);
      } catch (e: any) {
              toastError({ id: 27, title: 'Error', message: 'Error en vista previa' });

        setError(e.message || "No fue posible mostrar la vista previa.");
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  return { openPreview, loading, error };
};
