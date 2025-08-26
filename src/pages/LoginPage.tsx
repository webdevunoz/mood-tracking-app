import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import FormHeader from "../components/Form/FormHeader/FormHeader";
import FormField from "../components/Form/FormField/FormField";
import PrimaryButton from "../components/PrimaryButton/PrimaryButton";
import FormWrapper from "../components/Form/FormWrapper/FormWrapper";
import ErrorMessage from "../components/Form/ErrorMessage/ErrorMessage";
import { useState } from "react";
import { useLogin } from "../CustomHooks/useLogin";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(true);
  const { login, error } = useLogin({
    onSuccess: ({ user }) => {
      console.log("Logged in as:", user);
      navigate("/home");
    },
    onError: (err) => {
      console.error("Login error:", err);
    },
  });
  const [displayError, setDisplayError] = useState<string>("");

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let errorMessage = "";

    if ((!isValid || !email) && !password)
      errorMessage = "Email and password are required.";
    else if (!email) errorMessage = "Email is required.";
    else if (!password) errorMessage = "Password is required.";

    if (errorMessage) setDisplayError(errorMessage);
    else {
      await login({ email: email, password: password });
    }
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
      <FormWrapper className="login">
        <FormHeader
          heading="Welcome back!"
          desc="Log in to continue tracking your mood and sleep."
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
            Log In
          </PrimaryButton>
          <p className="mt-[margin-top:var(--spacing-250)] text-preset-6-regular text-neutral-600 text-center">
            Haven't got an account?{" "}
            <Link to="/signup" className="text-blue-600">
              Sign up.
            </Link>
          </p>
        </footer>
      </FormWrapper>
    </>
  );
};

export default LoginPage;
