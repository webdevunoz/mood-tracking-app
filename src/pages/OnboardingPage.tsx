import "./OnboardingPage.css";
import { useNavigate } from "react-router-dom";
import UploadImage from "../components/Form/UploadImage";
import Logo from "../components/Logo";
import FormHeader from "../components/Form/FormHeader/FormHeader";
import FormField from "../components/Form/FormField/FormField";
import PrimaryButton from "../components/PrimaryButton/PrimaryButton";
import FormWrapper from "../components/Form/FormWrapper/FormWrapper";

const OnboardingPage = () => {
  const navigate = useNavigate();

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
          <FormField label="Name" placeholder="Jane Appleseed" />
          <UploadImage />
        </section>
        <footer>
          <PrimaryButton
            logButton={false}
            homeButton={false}
            onClick={() => navigate("/home")}
          >
            Start Tracking
          </PrimaryButton>
        </footer>
      </FormWrapper>
    </>
  );
};

export default OnboardingPage;
