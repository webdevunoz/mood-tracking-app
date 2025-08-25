import "./OnboardingPage.css";
import { useNavigate } from "react-router-dom";
import UploadImage from "../components/Form/UploadImage";
import Logo from "../components/Logo";
import FormHeader from "../components/Form/FormHeader/FormHeader";
import FormField from "../components/Form/FormField/FormField";
import PrimaryButton from "../components/PrimaryButton/PrimaryButton";
import FormWrapper from "../components/Form/FormWrapper/FormWrapper";
import { useState } from "react";
import { useUpdateUserProfile } from "../CustomHooks/useUpdateUserProfile";

const OnboardingPage = () => {
  const navigate = useNavigate();

  const { preview, uploading, error, setProfileName, handleFileUpload } =
    useUpdateUserProfile();
  const [name, setName] = useState<string | undefined>(undefined);
  const [validName, setValidName] = useState<boolean>(true);
  const [profilePictureFile, setProfilePictureFile] = useState<File>();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!name) setValidName(false);

    if (name && profilePictureFile) {
      setProfileName(name);
      handleFileUpload(profilePictureFile);
      navigate("/home");
    }
  };

  return (
    <>
      <header className="logo-wrapper">
        <Logo />
      </header>
      <FormWrapper className="onboarding">
        <FormHeader
          heading="Personalize your experience"
          desc="Add your name and a profile picture to make Mood yours."
        />
        <section>
          <FormField
            label="Name"
            placeholder="Jane Appleseed"
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
        <footer>
          <PrimaryButton
            logButton={false}
            homeButton={false}
            onClick={(e) => handleSubmit(e)}
          >
            Start Tracking
          </PrimaryButton>
        </footer>
      </FormWrapper>
    </>
  );
};

export default OnboardingPage;
