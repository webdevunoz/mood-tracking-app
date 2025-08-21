import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function useUserId(): string | null {
  const { user } = useContext(AuthContext);

  // Defensive fallback
  if (!user || !user.uid) return null;

  return user.uid;
}

