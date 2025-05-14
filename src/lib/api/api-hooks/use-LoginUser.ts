import { useState } from "react";
import { useAuth } from "@contexts/authContext";
export const useLoginUser = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginUser = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        if(data.details === "Contrase\u00f1a incorrecta."||data.details === "Usuario no encontrado o eliminado." || data.details === "Contraseña incorrecta."){
          throw new Error("Email o contraseña incorrectos.");
        }
        throw new Error("Error al iniciar sesión");
      }

      const { token, user } = data.data;

      login(user, token);
      return { user }; 
    } catch (err: any) {
      setError( err.message ||"Error de servidor");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, loading, error };
};
