import { useState } from "react";
import { useAuth, type AuthUser } from "../context/AuthContext";

export type MoodData = {
  moodTimestamp: string;
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
      setUser(prev => ({...(prev as AuthUser), moodData: data.moodData,}));
      
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

  const getMoodData = async () => {
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
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Fetching MoodData failed");

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

  return { postMoodData, getMoodData, loading, error };
}