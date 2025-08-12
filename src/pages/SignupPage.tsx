import { Link, useNavigate } from "react-router-dom";
import "./SignupPage.css";
import FormField from "../components/Form/FormField/FormField";
import FormHeader from "../components/Form/FormHeader/FormHeader";
import PrimaryButton from "../components/PrimaryButton/PrimaryButton";
import Logo from "../components/Logo";
import FormWrapper from "../components/Form/FormWrapper/FormWrapper";
import { useSignup } from "../components/Home/CustomHooks/useSignup";
import { useEffect, useState } from "react";
import ErrorMessage from "../components/Form/ErrorMessage/ErrorMessage";

const SignupPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [userCreated, setUserCreated] = useState(false);
  const { signup, loading, error } = useSignup({
    onSuccess: () => setUserCreated(true),
    onError: (err) => {
      if (err instanceof Error) setDisplayError(err.message);
      else setDisplayError("Something went wrong.");
    },
  });
  const [displayError, setDisplayError] = useState<string>("");

  useEffect(() => {
    if (!loading && userCreated) navigate("/onboarding");
  }, [loading, userCreated, navigate]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let errorMessage = "";

    if ((!isValid || !email) && !password)
      errorMessage = "Email and password are required.";
    else if (!email) errorMessage = "Email is required.";
    else if (!password) errorMessage = "Password is required.";

    if (errorMessage) setDisplayError(errorMessage);
    else signup({ email, password });
  };

  const getErrorMessage = (error: unknown): string =>
    error instanceof Error
      ? error.message
      : typeof error === "string"
      ? error
      : "";

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
          <FormField
            label="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            setValidity={(isValid) => setIsValid(isValid)}
          />
          <FormField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </section>
        <footer className="signup-login-footer">
          {(displayError || error !== null) && (
            <ErrorMessage
              className="text-preset-7"
              iconSize="15.5px"
              message={displayError || getErrorMessage(error)}
            />
          )}
          <PrimaryButton
            logButton={false}
            homeButton={false}
            onClick={(e) => {
              handleSubmit(e);
            }}
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
