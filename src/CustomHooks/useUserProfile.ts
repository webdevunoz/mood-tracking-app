import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function useUserProfile() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useUserProfile must be used within AuthProvider');
  return ctx.user;
}

