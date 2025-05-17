import { User } from "../models/coordinator";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchCurrentUser = async (token: string): Promise<User | null> => {
  try {
    const res = await fetch(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        return null; 
      }
      throw new Error(`Error ${res.status}`);
    }

    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};