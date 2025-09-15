import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export type MoodData = {
  mood: string;
  hoursSlept: string;
  reflection: string;
  tags: string[];
};

type UseMoodDataOptions = {
  endpoint?: string;
  onSuccess?: (data: MoodData) => void;
  onError?: (error: unknown) => void;
};

export function useMoodData({
  onSuccess,
  onError,
}: UseMoodDataOptions = {}) {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const { setUser, user, authReady } = useAuth();
  
  const postMoodData = async (payload: MoodData) => {
    if (!authReady || !user) {
      setError("User not signed in");
      return;
    }

    const uid = user._id;
    if (!uid) {
      setError("User uid missing");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`http://localhost:3000/api/user/${uid}/moodData`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Posting MoodData failed");
     
      // Fill the user with the posted mood data
      setUser(data.user);

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

  return { postMoodData, loading, error };
}