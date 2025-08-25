import { useEffect, useState } from "react";
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { AuthContext, type AuthContextType } from "./AuthContext";
import { auth } from "../lib/firebase";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(
      auth,
      async (fbUser: FirebaseUser | null) => {
        if (fbUser) {
          const token = localStorage.getItem("token");
          if (!token) return setAuthReady(true);
          console.log("was here 1");

          try {
            console.log("was here 2");
            // Fetch your backend's user profile
            const res = await fetch("http://localhost:3000/api/user/me", {
              headers: { Authorization: `Bearer ${token}` },
            });
            const profile = await res.json();

            setUser({
              _id: fbUser.uid,
              email: fbUser.email,
              name: profile.name,
              profilePicture: profile.avatarUrl || fbUser.photoURL || undefined,
            });
          } catch (err) {
            console.error("Failed to fetch user profile", err);
            setUser({
              _id: fbUser.uid,
              email: fbUser.email,
              name: "",
              profilePicture: fbUser.photoURL || undefined,
            });
          }
        } else {
          setUser(null);
          localStorage.removeItem("token");
        }
        setAuthReady(true);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, authReady }}>
      {children}
    </AuthContext.Provider>
  );
}
