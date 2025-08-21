import { useUserProfile } from "./useUserProfile";

export function useUserName() {
  return useUserProfile()?.name ?? null;
}

