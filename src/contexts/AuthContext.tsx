import { createContext, useContext, useEffect, useState } from "react";
import { authService, LoginPayload, RegisterPayload, User } from "../services/auth.service";

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  register: (payload: RegisterPayload) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(authService.getUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(authService.getUser());
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const payload: LoginPayload = { email, password };

    const data = await authService.login(payload);

    authService.saveSession(data);
    setUser(data.user);
  };

  const register = async (payload: RegisterPayload) => {
    return await authService.register(payload);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
