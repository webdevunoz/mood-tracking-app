import { useEffect, useState } from "react";
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { AuthContext, type AuthContextType } from "./AuthContext";
import { auth } from "../lib/firebase";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (fbUser: FirebaseUser | null) => {
      if (fbUser) {
        setUser({
          uid: fbUser.uid,
          email: fbUser.email,
          imageUrl: fbUser.photoURL || undefined,
        });
        fbUser.getIdToken().then((token) => {
          localStorage.setItem("token", token);
        });
      } else {
        setUser(null);
        localStorage.removeItem("token");
      }
      setAuthReady(true);
    });

    return unsub;
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, authReady }}>
      {children}
    </AuthContext.Provider>
  );
}
