import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import FormHeader from "../components/Form/FormHeader/FormHeader";
import FormField from "../components/Form/FormField/FormField";
import PrimaryButton from "../components/PrimaryButton/PrimaryButton";
import FormWrapper from "../components/Form/FormWrapper/FormWrapper";

const LoginPage = () => {
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
          <FormField label="Email address" type="email" />
          <FormField label="Password" type="password" />
        </section>
        <footer>
          <PrimaryButton
            logButton={false}
            homeButton={false}
            onClick={() => null}
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
