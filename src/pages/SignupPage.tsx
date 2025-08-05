import { Link, useNavigate } from "react-router-dom";
import "./SignupPage.css";
import FormField from "../components/Form/FormField/FormField";
import FormHeader from "../components/Form/FormHeader/FormHeader";
import PrimaryButton from "../components/PrimaryButton/PrimaryButton";
import Logo from "../components/Logo";
import FormWrapper from "../components/Form/FormWrapper/FormWrapper";

const SignupPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <header className="logo-wrapper">
        <Logo />
      </header>
      <FormWrapper className="signup">
        <FormHeader
          heading="Create an account"
          desc="Join to track your daily mood and sleep with ease."
        />
        <section>
          <FormField label="Email" type="email" />
          <FormField label="Password" type="password" />
        </section>
        <footer>
          <PrimaryButton
            logButton={false}
            onClick={() => navigate("/onboarding")}
          >
            Sign Up
          </PrimaryButton>
          <p className="mt-[margin-top:var(--spacing-250)] text-preset-6-regular text-neutral-600 text-center">
            Already got an account?{" "}
            <Link to="/login" className="text-blue-600">
              Log in.
            </Link>
          </p>
        </footer>
      </FormWrapper>
    </>
  );
};

export default SignupPage;
