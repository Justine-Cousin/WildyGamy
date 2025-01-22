import { type ReactNode, createContext, useContext, useState } from "react";

type User = {
  id: number;
  email: string;
  username: string;
  name: string;
  firstname: string;
};

type Auth = {
  user: User;
  token: string;
} | null;

type AuthContextType = {
  auth: Auth;
  setAuth: (auth: Auth) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<Auth>(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
