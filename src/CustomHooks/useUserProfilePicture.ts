import { useUserProfile } from "./useUserProfile";

export function useUserProfilePicture() {
  return useUserProfile()?.profilePicture ?? null;
}

