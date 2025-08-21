import { createContext } from "react";

export interface AuthUser {
  uid: string | undefined;
  email: string | null | undefined;
  imageUrl?: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
  authReady: boolean;
}

export const AuthContext = createContext<AuthContextType>({ user: null, setUser: () => {}, authReady: false });