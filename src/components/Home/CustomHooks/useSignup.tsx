import { useState } from "react";

type SignupResponse = {
  status: number;
  error?: string;
  message?: string;
};

export function useSignup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<SignupResponse | null>(null);

  const signup = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data: SignupResponse = await res.json();
      const fullResponse = { ...data, status: res.status };

      if (!res.ok) throw new Error(data.error || "Signup failed");

      setResponse(fullResponse);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, error, response };
}
