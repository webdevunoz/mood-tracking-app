import { useEffect, useRef, useState } from "react";
import {
  onIdTokenChanged,
  signOut,
  type User as FirebaseUser,
} from "firebase/auth";
import { AuthContext, type AuthContextType } from "./AuthContext";
import { auth } from "../lib/firebase";
import { useNavigate } from "react-router-dom";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const hydratedRef = useRef(false);
  const [authReady, setAuthReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(
      auth,
      async (fbUser: FirebaseUser | null) => {
        if (!fbUser) {
          setUser(null);
          localStorage.removeItem("token");
          localStorage.removeItem("loginTime"); // 🧼 clear session timestamp
          setAuthReady(true);
          return;
        }

        // ✅ Guard: skip if already hydrated
        if (hydratedRef.current) {
          setAuthReady(true);
          return; // ✅ skip refresh
        }

        try {
          const firebaseToken = await fbUser.getIdToken(); // 🔁 fresh Firebase token

          const res = await fetch("http://localhost:3000/api/auth/refresh", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${firebaseToken}`,
            },
          });

          if (!res.ok) {
            throw new Error("Failed to refresh backend token");
          }

          const { jwt, userData } = await res.json();

          // 🧠 Store backend JWT + session timestamp
          localStorage.setItem("token", jwt);
          localStorage.setItem("loginTime", Date.now().toString());

          // ✅ Hydrate context with DB user + backend JWT
          setUser({
            _id: fbUser.uid,
            email: fbUser.email,
            name: userData.name,
            profilePicture:
              userData.profilePicture || fbUser.photoURL || undefined,
            moodData: userData.moodData,
            jwt,
          });
          hydratedRef.current = true;
        } catch (err) {
          console.error("Token sync failed", err);

          // 🧼 Fallback: hydrate with Firebase only
          setUser({
            _id: fbUser.uid,
            email: fbUser.email,
            name: "",
            profilePicture: fbUser.photoURL || undefined,
            moodData: [],
          });

          localStorage.removeItem("token");
          localStorage.removeItem("loginTime");
        }

        setAuthReady(true);
      }
    );

    return () => unsubscribe();
  }, []);

  /* Sign out user after 15 min of inactivity (remove all tokens and log out of firebase)  */
  useEffect(() => {
    if (!user) return; // Make sure we only check if user is logged in already

    let timeout: ReturnType<typeof setTimeout>;

    const logout = () => {
      console.warn("User inactive, logging out");

      signOut(auth)
        .then(() => {
          localStorage.removeItem("loginTime");
          localStorage.removeItem("token");
          setUser(null);
          navigate("/login");
        })
        .catch((err) => {
          console.error("Sign-out failed:", err);
        });
    };

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(logout, 15 * 60 * 1000); // ✅ 15m of inactivity
    };

    // 🧠 Events that count as activity
    const events = ["mousemove", "keydown", "scroll", "click"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer(); // start timer on mount

    return () => {
      clearTimeout(timeout);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [user, setUser, navigate]);

  return (
    <AuthContext.Provider value={{ user, setUser, authReady }}>
      {children}
    </AuthContext.Provider>
  );
}
