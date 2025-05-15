import { useState } from "react";

export interface RecoverPasswordResult {
  recoverLink: string;
}

export const useRecoverPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const recoverPassword = async (
    email: string,
    control_number: string
  ): Promise<RecoverPasswordResult> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://recovery-password-api-tcg2.vercel.app/api/recover",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            control_number, 
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || data.error) {
        const msg = data.error || data.details || "Error al recuperar la contraseña";
        throw new Error(msg);
      }

      if (!data.recoverLink) {
        throw new Error("La respuesta del servidor no contiene recoverLink");
      }

      return { recoverLink: data.recoverLink };
    } catch (err: any) {
      setError(err.message || "Error inesperado");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { recoverPassword, loading, error };
};
