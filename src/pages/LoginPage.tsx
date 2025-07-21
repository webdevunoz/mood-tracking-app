import { Link } from "react-router-dom";
import { useState } from "react";
import ErrorMessage from "../components/ErrorMessage";

const LoginPage = () => {
  const [emailValue, setEmailValue] = useState("");
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmailValue(value);
    setIsValid(e.target.validity.valid);
  };

  return (
    <>
      <header className="logo-wrapper">
        <img src="/src/assets/images/logo.svg" alt="Mood tracker logo" />
      </header>
      <main className="form-wrapper">
        <form className="form">
          <header>
            <h1 className="form-heading text-preset-3 text-neutral-900">
              Welcome back!
            </h1>
            <p className="text-preset-6-regular text-neutral-600">
              Log in to continue tracking your mood and sleep.
            </p>
          </header>
          <section>
            <div className="input-wrapper">
              <label
                htmlFor="email"
                className="text-preset-6-regular text-neutral-900"
              >
                Email address
              </label>
              <input
                value={emailValue}
                onChange={handleChange}
                id="email"
                type="email"
                className="form-input text-preset-6-regular"
                placeholder="name@mail.com"
              ></input>
              {!isValid && <ErrorMessage message="Invalid email format." />}
            </div>
            <div className="input-wrapper">
              <label
                htmlFor="password"
                className="text-preset-6-regular text-neutral-900"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                className="form-input text-preset-6-regular"
              ></input>
            </div>
          </section>
          <footer>
            <button
              type="submit"
              className="form-button text-preset-5 text-neutral-0 bg-blue-600"
            >
              Log In
            </button>
            <p className="form-footer-message text-preset-6-regular text-neutral-600 text-center">
              Haven't got an account?{" "}
              <Link to="/signup" className="text-blue-600">
                Sign up.
              </Link>
            </p>
          </footer>
        </form>
      </main>
    </>
  );
};

export default LoginPage;
