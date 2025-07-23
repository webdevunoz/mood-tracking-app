import { useRef, useState } from "react";
import ErrorMessage from "./ErrorMessage/ErrorMessage";

interface UploadImageProps {
  initialSrc?: string;
}

const UploadImage = ({ initialSrc }: UploadImageProps) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [previewSrc, setPreviewSrc] = useState(
    initialSrc || "/src/assets/images/avatar-placeholder.svg"
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setIsValid(false);
      setErrorMessage("Upload an image.");
      return;
    }
    //250KB Max File Size Validation
    const isUnderSizeLimit = file.size <= 250 * 1024;

    //PNG or JPEG Validation
    const isValidType = /image\/(png|jpeg)/.test(file.type);

    if (!isValidType) {
      setIsValid(false);
      setErrorMessage("Unsupported file type. Please upload a PNG or JPEG");
    }

    if (!isUnderSizeLimit && isValidType) {
      setIsValid(false);
      setErrorMessage("File must be 250KB or less.");
    }

    if (isValidType && isUnderSizeLimit)
      setPreviewSrc(URL.createObjectURL(file)); //Update preview source image
  };
  return (
    <div className="upload-wrapper">
      <img className="upload-image" src={previewSrc}></img>
      <div className="upload-content">
        <div className="upload-heading">
          <p className="upload-header text-preset-6-regular text-neutral-900">
            Upload Image
          </p>
          <p className="text-preset-7 text-neutral-600">
            Max 250KB, PNG or JPEG
          </p>
        </div>
        <button className="upload-button" type="button" onClick={handleClick}>
          Upload
        </button>
        <input
          type="file"
          ref={inputRef}
          onChange={handleChange}
          className="sr-only"
        />
        {!isValid && <ErrorMessage message={errorMessage} />}
      </div>
    </div>
  );
};

export default UploadImage;
