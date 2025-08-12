import { useState } from "react";

type LoginPayload = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
};

type UseLoginOptions = {
  endpoint?: string; // default fallback
  onSuccess?: (data: LoginResponse) => void;
  onError?: (error: unknown) => void;
};

export function useLogin({
  endpoint = "http://localhost:3000/api/login",
  onSuccess,
  onError,
}: UseLoginOptions = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const login = async (payload: LoginPayload) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Login failed: ${res.status}`);
      const data: LoginResponse = await res.json();
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
