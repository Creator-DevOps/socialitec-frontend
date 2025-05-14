import { useState } from "react";
import { useAuth } from "@contexts/authContext";

interface ChangePasswordResult {
  message: string;
}

export const useChangePassword = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const changePassword = async (
    currentPassword: string,
    newPassword: string
  ): Promise<ChangePasswordResult> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/change-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            current_password: currentPassword,
            new_password: newPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        // tu backend devuelve details o error
        const msg =
          data.details ||
          data.error ||
          "Error al cambiar la contraseña";
        throw new Error(msg);
      }

      return { message: data.message };
    } catch (err: any) {
      setError(err.message || "Error inesperado");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { changePassword, loading, error };
};
