import FormField from "../Form/FormField/FormField";
import FormHeader from "../Form/FormHeader/FormHeader";
import FormWrapper from "../Form/FormWrapper/FormWrapper";
import UploadImage from "../Form/UploadImage";
import "./SettingsModal.css";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import { useUpdateUserProfile } from "../../CustomHooks/useUpdateUserProfile";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import ErrorMessage from "../Form/ErrorMessage/ErrorMessage";

interface SettingsModalProps {
  onClose: () => void;
}

const SettingsModal = ({ onClose }: SettingsModalProps) => {
  const { user } = useAuth();
  const originalName = user?.name;
  const { preview, uploading, error, setProfileName, handleFileUpload } =
    useUpdateUserProfile();
  const [name, setName] = useState<string | undefined>(originalName);
  const [validName, setValidName] = useState<boolean>(true);
  const [profilePictureFile, setProfilePictureFile] = useState<File>();
  const [nameError, setNameError] = useState<boolean>(false);

  const handleSubmit = () => {
    if (!name) {
      setValidName(false);
      setNameError(true);
    }

    if (name && profilePictureFile) {
      setProfileName(name);
      handleFileUpload(profilePictureFile);
    }
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-wrapper">
        <FormWrapper className="settings" onClose={onClose} hasClose={true}>
          <FormHeader
            heading="Update your profile"
            desc="Personalize your account with your name and photo."
          />
          <section>
            <FormField
              label="Name"
              defaultValue={originalName ?? ""}
              onChange={(e) => setName(e.target.value)}
              isValidName={validName}
            />
            <UploadImage
              preview={preview}
              uploading={uploading}
              error={error}
              setProfilePictureFile={(file) => setProfilePictureFile(file)}
            />
          </section>
          <footer className="modal-footer">
            {nameError && (
              <ErrorMessage
                className="text-preset-7"
                iconSize="15.5px"
                message={"Error: Could not obtain user name from database"}
              />
            )}
            <PrimaryButton
              homeButton={true}
              logButton={false}
              onClick={handleSubmit}
            >
              Save changes
            </PrimaryButton>
          </footer>
        </FormWrapper>
      </div>
    </div>
  );
};

export default SettingsModal;
