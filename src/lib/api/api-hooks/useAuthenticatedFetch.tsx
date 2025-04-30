import { useAuth } from "@contexts/authContext";

export const useAuthenticatedFetch = () => {
  const { token } = useAuth();

  const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    };

    const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      throw new Error("Token inválido o expirado");
    }

    return response;
  };

  return { authenticatedFetch };
};
