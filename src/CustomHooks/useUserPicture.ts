import { useUserProfile } from "./useUserProfile";

export function useUserPicture() {
  return useUserProfile()?.profilePicture ?? null;
}

