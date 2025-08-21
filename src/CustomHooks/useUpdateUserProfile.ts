import { useState } from "react";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import axios from "axios";
import { app } from "../lib/firebase"; 
import { useAuth } from "../context/AuthContext";

export function useUpdateUserProfile({onSuccess}: { onSuccess?: (url: string) => void } = {})
 {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user, authReady } = useAuth(); // user must include uid
  const storage = getStorage(app);

  const setProfileName = async (name: string | undefined) => {
    if (!authReady || !user) {
      setError("User not signed in");
      return;
    }

    const uid = user.uid;
    if (!uid) {
      setError("User uid missing");
      return;
    }
    setError(null);
    try {
     /* Handle profile name updating */
      await axios.put(`http://localhost:3000/api/user/${uid}/profile-name`, { name: name });
    } catch (err: unknown) {
       setError("Unexpected error: " + err);
    }
  }

  const handleFileChange = async (file: File) => {
    if (!authReady || !user) {
      setError("User not signed in");
      return;
    }

    const uid = user.uid;
    if (!uid) {
      setError("User uid missing");
      return;
    }
    setError(null);
    setUploading(true);
    setPreview(URL.createObjectURL(file));

    // Always send contentType if rules check for images
    const metadata = { contentType: file.type || 'image/jpeg' };

    try {

      /* Handle profile picture updating */
      const fileRef = ref(storage, `user_uploads/${uid}/${file.name}`);
      await uploadBytes(fileRef, file, metadata);

      const imageUrl = await getDownloadURL(fileRef);
      await axios.put(`http://localhost:3000/api/user/${uid}/profile-picture`, { imageUrl });
      onSuccess?.(imageUrl);

      return imageUrl;
    } catch (err: unknown) {
      if (err && typeof err === "object" && "code" in err) {
        const e = err as { code?: string };
        if (e.code === "storage/unauthorized") {
          setError("Unauthorized by Storage rules. Check UID, rules, and contentType.");
        } else {
          setError("Upload failed");
        }
      } 
       else 
        setError("Unexpected error");
    
  } finally {
      setUploading(false);
    }
  };

  return { preview, uploading, error, setProfileName, handleFileChange };
}