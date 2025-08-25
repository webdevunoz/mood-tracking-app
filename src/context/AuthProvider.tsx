import { useEffect, useState } from "react";
import { onIdTokenChanged, type User as FirebaseUser } from "firebase/auth";
import { AuthContext, type AuthContextType } from "./AuthContext";
import { auth } from "../lib/firebase";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const unsub = onIdTokenChanged(
      auth,
      async (fbUser: FirebaseUser | null) => {
        if (!fbUser) {
          setUser(null);
          localStorage.removeItem("token");
          setAuthReady(true);
          return;
        }

        try {
          const firebaseToken = await fbUser.getIdToken(); // fresh token
          const res = await fetch("http://localhost:3000/api/auth/refresh", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${firebaseToken}`,
            },
          });

          const { jwt, userData } = await res.json();
          localStorage.setItem("token", jwt);

          setUser({
            _id: fbUser.uid,
            email: fbUser.email,
            name: userData.name,
            profilePicture:
              userData.profilePicture || fbUser.photoURL || undefined,
            jwt,
          });
        } catch (err) {
          console.error("Token sync failed", err);
          setUser({
            _id: fbUser.uid,
            email: fbUser.email,
            name: "",
            profilePicture: fbUser.photoURL || undefined,
          });
        }

        setAuthReady(true);
      }
    );

    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, authReady }}>
      {children}
    </AuthContext.Provider>
  );
}
