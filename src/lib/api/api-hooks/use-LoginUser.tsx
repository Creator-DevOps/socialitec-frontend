import { useState } from "react";
import { useAuth } from "@contexts/authContext";
import { FormData } from "@/components/login/form.login";

export const useLoginUser = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginUser = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    console.log("URL", import.meta.env.VITE_API_URL)
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
        throw new Error(data.error || "Error al iniciar sesión");
      }

      const { token, user } = data.data;

      login(user, token);
      return { user }; 
    } catch (err: any) {
      setError(err.message || "Error inesperado");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, loading, error };
};
