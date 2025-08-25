import { useState } from "react";
import { useLogin } from "./useLogin";

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
  const { login } = useLogin();
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

      const data: SignupResponse = await res.json();
      if (!res.ok) 
        throw new Error(`Signup failed: ${res.status} ${await res.text()}`);
      
      await login({email: payload.email, password: payload.password});

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