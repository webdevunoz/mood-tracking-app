import "./OnboardingPage.css";
import { useNavigate } from "react-router-dom";
import UploadImage from "../components/Form/UploadImage";
import Logo from "../components/Logo";
import FormHeader from "../components/Form/FormHeader/FormHeader";
import FormField from "../components/Form/FormField/FormField";
import PrimaryButton from "../components/PrimaryButton/PrimaryButton";
import FormWrapper from "../components/Form/FormWrapper/FormWrapper";
import { useUserId } from "../CustomHooks/useUserId";
import { useEffect, useState } from "react";
import { useUpdateUserProfile } from "../CustomHooks/useUpdateUserProfile";

const OnboardingPage = () => {
  const navigate = useNavigate();
  const { preview, uploading, error, setProfileName, handleFileChange } =
    useUpdateUserProfile();
  const [name, setName] = useState<string | undefined>(undefined);
  const id = useUserId();
  const [userId, setUserId] = useState<string>("");
  const [validName, setValidName] = useState<boolean>(true);

  useEffect(() => {
    if (id) setUserId(id);
  }, [id]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!name) setValidName(false);
    else {
      setProfileName(name);
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
          {userId && (
            <UploadImage
              preview={preview}
              uploading={uploading}
              error={error}
              handleFileChange={handleFileChange}
            />
          )}
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
