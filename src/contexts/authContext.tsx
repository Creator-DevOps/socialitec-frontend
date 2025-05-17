import { fetchCurrentUser } from "@/lib/api/api-hooks/use-get-current-user";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  user_id: number;
  name: string;
  email: string;
  user_type: number;
  position?: string;
  departament?: string;
  control_number?: string;
  major?: string;
  semester?: number;
  credits?: number;
  status?: string;
  hours?: number;
}

interface AuthContextProps {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = Boolean(user && token);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken) {
        const currentUser = await fetchCurrentUser(storedToken);
        
        if (currentUser) {
          login(currentUser, storedToken);
        } else {
          logout(); 
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);
  
   useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "user") {
        if (e.newValue) {
          setUser(JSON.parse(e.newValue));
        } else {
          setUser(null);
        }
      }
      if (e.key === "token") {
        if (e.newValue) {
          setToken(e.newValue);
        } else {
          setToken(null);
        }
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const login = (userData: User, tokenData: string) => {
    setUser(userData);
    setToken(tokenData);
    localStorage.setItem("user", JSON.stringify(userData)); 
    localStorage.setItem("token", tokenData);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user"); 
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};
