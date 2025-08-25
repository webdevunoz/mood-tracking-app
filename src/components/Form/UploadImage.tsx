import { useEffect, useRef, useState } from "react";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import { useAuth } from "../../context/AuthContext";

interface UploadImageProps {
  preview: string | null;
  uploading: boolean;
  error: string | null;
  setProfilePictureFile: (file: File | undefined) => void;
}

const UploadImage = ({
  preview,
  uploading,
  error,
  setProfilePictureFile,
}: UploadImageProps) => {
  const [validationError, setValidationError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { user, authReady } = useAuth();
  const profilePicture = user?.profilePicture;
  const [displaySrc, setDisplaySrc] = useState(
    profilePicture || "/src/assets/images/avatar-placeholder.svg"
  );

  // Show preview if available
  useEffect(() => {
    if (preview) {
      setDisplaySrc(preview);
    }
  }, [preview]);

  const handleClick = () => inputRef.current?.click();

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setValidationError("Upload an image.");
      return;
    }

    // File validations
    const isUnderSizeLimit = file.size <= 250 * 1024; // 250KB
    const isValidType = /image\/(png|jpeg)/.test(file.type);

    if (!isValidType) {
      setValidationError("Unsupported file type. Please upload a PNG or JPEG.");
      return;
    }
    if (!isUnderSizeLimit) {
      setValidationError("File must be 250KB or less.");
      return;
    }

    setValidationError(null);

    const imageUrl = URL.createObjectURL(file);

    if (imageUrl && user) {
      setDisplaySrc(imageUrl);
      setProfilePictureFile(file);
    }
  };

  if (!authReady) {
    return <p>Checking authentication…</p>;
  }

  if (!user) {
    return <p>Please log in to upload your profile picture.</p>;
  }

  return (
    <div className="upload-wrapper">
      <img src={displaySrc} alt="Profile preview" className="upload-image" />
      <div className="upload-content">
        <div className="upload-heading">
          <p className="upload-header text-preset-6-regular text-neutral-900">
            Upload Image
          </p>
          <p className="text-preset-7 text-neutral-600">
            Max 250KB, PNG or JPEG
          </p>
        </div>
        <button
          className="upload-button"
          type="button"
          onClick={handleClick}
          disabled={uploading}
        >
          {uploading ? "Uploading ..." : "Upload"}
        </button>
        <input
          type="file"
          ref={inputRef}
          onChange={handleChange}
          accept="image/png, image/jpeg"
          className="sr-only"
        />
        {(validationError || error) && (
          <ErrorMessage message={validationError || error} />
        )}
      </div>
    </div>
  );
};

export default UploadImage;
