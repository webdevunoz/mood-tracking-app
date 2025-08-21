import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../lib/firebase";
import { signInWithCustomToken } from "firebase/auth";

type SignupPayload = {
  email: string;
  password: string;
  name?: string;
  profilePicture?: string;
};

type SignupResponse = {
  id: string;
  email: string;
  token: string;         // API token
  firebaseToken: string; // Required
};

type UseSignupOptions = {
  endpoint?: string;
  onSuccess?: (data: SignupResponse) => void;
  onError?: (error: unknown) => void;
};



export function useSignup({ endpoint = "http://localhost:3000/api/users", onSuccess, onError }: UseSignupOptions = {}) {
  useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const signup = async (payload: SignupPayload) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Signup failed: ${res.status} ${await res.text()}`);
      }

      const data: SignupResponse = await res.json();
      console.log(data);
      localStorage.setItem("token", data.token);

      // 🔑 Sign into Firebase
      await signInWithCustomToken(auth, data.firebaseToken);

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

  return { signup, loading, error };
}