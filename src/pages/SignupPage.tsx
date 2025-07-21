import { Link } from "react-router-dom";
import "./SignupPage.css";
import { useState } from "react";

const SignupPage = () => {
  const [emailValue, setEmailValue] = useState("");
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmailValue(value);
    setIsValid(e.target.validity.valid); // built-in HTML5 validation
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
              Create an account
            </h1>
            <p className="text-preset-6-regular text-neutral-600">
              Join to track your daily mood and sleep with ease.
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
                className="form-input text-preset-6-regular text-neutral-600"
                placeholder="name@mail.com"
              ></input>
              {!isValid && (
                <span className="error-email-message text-preset-9">
                  <i className="fas fa-info-circle"></i>Invalid email format.
                </span>
              )}
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
                className="form-input text-preset-6-regular text-neutral-600"
              ></input>
            </div>
          </section>
          <footer>
            <button
              type="submit"
              className="form-button text-preset-5 text-neutral-0 bg-blue-600"
            >
              Sign Up
            </button>
            <p className="text-preset-6-regular text-neutral-600 text-center">
              Already got an account?{" "}
              <Link to="/login" className="text-blue-600">
                Log in.
              </Link>
            </p>
          </footer>
        </form>
      </main>
    </>
  );
};

export default SignupPage;
