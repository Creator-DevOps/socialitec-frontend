import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
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
    const storedUser = sessionStorage.getItem("user");
    const storedToken = sessionStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const login = (userData: User, tokenData: string) => {
    setUser(userData);
    setToken(tokenData);
    sessionStorage.setItem("user", JSON.stringify(userData)); 
    sessionStorage.setItem("token", tokenData);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    sessionStorage.removeItem("user"); 
    sessionStorage.removeItem("token");
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
