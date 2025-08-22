import { useUserProfile } from "./useUserProfile";

export function useUserEmail() {
  return useUserProfile()?.email ?? null;
}