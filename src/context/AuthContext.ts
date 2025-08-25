import { createContext, useContext } from "react";

export interface AuthUser {
  _id: string | undefined;
  email: string | null | undefined;
  name: string;
  profilePicture?: string;
  jwt?: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
  authReady: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}

