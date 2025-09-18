import { useState } from "react";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useAuth, type AuthUser } from "../context/AuthContext"; // assuming you expose setUser


type LoginPayload = {
  email: string;
  password: string;
};

type LoginResponse = {
  jwt: string;
  firebaseCustomToken: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
  error: string;
};

type UseLoginOptions = {
  endpoint?: string;
  onSuccess?: (data: LoginResponse) => void;
  onError?: (error: unknown) => void;
};

export function useLogin({ endpoint = "http://localhost:3000/api/login", onSuccess, onError }: UseLoginOptions = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const { setUser } = useAuth();

  const login = async ({ email, password }: LoginPayload) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      const {jwt, user, firebaseCustomToken} = data;
      if (!res.ok) throw new Error(data.error || "Login failed");

      // 🔐 Sign into Firebase for Storage access
      await signInWithCustomToken(auth, firebaseCustomToken);

      // 🧠 Store your app JWT for API calls
      localStorage.setItem("token", jwt);

      // ⚡ Hydrate context with user profile
      setUser(prev => ({... (prev as AuthUser), ... user, jwt,}));
      console.log("Logged in as: " + JSON.stringify(user, null, 2));
      onSuccess?.(data);
      return data;
    } catch (err) {
      setError(err);
      onError?.(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}