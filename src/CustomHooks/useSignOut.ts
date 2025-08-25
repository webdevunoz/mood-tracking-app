
import { useAuth } from "../context/AuthContext";
import { useCallback } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export function useSignOut() {
  const { setUser } = useAuth();
  const auth = getAuth();
  const navigate = useNavigate();

  const signOutUser = useCallback(async () => {
    try {
      // 🔐 Sign out from Firebase
      await signOut(auth);

      // 🧹 Clear local/session storage
      localStorage.removeItem("token"); // your API JWT
      sessionStorage.clear();

      // 🧼 Reset context
      setUser(null);

      // 🚪 Redirect to login or landing
      navigate("/login");
    } catch (err) {
      console.error("Sign-out failed:", err);
    }
  }, [auth, setUser, navigate]);

  return { signOutUser };
}