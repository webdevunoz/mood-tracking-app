import { useState } from "react";
import FormWrapper from "../../../Form/FormWrapper/FormWrapper";
import LogMoodStep1 from "../LogMoodStep1/LogMoodStep1";
import "./LogMoodForm.css";
import PrimaryButton from "../../../PrimaryButton/PrimaryButton";
import LogMoodStep2 from "../LogMoodStep2/LogMoodStep2";
import LogMoodStep3 from "../LogMoodStep3/LogMoodStep3";
import LogMoodStep4 from "../LogMoodStep4/LogMoodStep4";
import ErrorMessage from "../../../Form/ErrorMessage/ErrorMessage";

interface LogMoodFormProps {
  onClose: () => void;
}

const LogMoodForm = ({ onClose }: LogMoodFormProps) => {
  const FORM_STEPS = 4;
  const [stepNum, setStepNum] = useState(1);
  const [formError, setFormError] = useState(false);
  const [displayError, setDisplayError] = useState(false);
  const errorMessages = [
    "Please select a mood before continuing.",
    "You can only select a maximum of 3 tags.",
    "Please write a few words about your day before continuing.",
    "Please select how many hours slept before submitting.",
  ];
  const progressSpans = [];
  for (let i = 0; i < FORM_STEPS; i++) {
    progressSpans.push(
      <span
        key={i}
        className="progress-bar"
        style={{
          backgroundColor: `${i + 1 <= stepNum && "var(--color-blue-600)"}`,
        }}
      ></span>
    );
  }

  const handleFormClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    //Check if there was a form Error
    if (formError) {
      setDisplayError(true);
      e.preventDefault();
    } else if (stepNum < FORM_STEPS) {
      setDisplayError(false);
      setFormError(false);
      setStepNum(stepNum + 1);
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  return (
    <div className="log-mood-overlay">
      <div className="log-mood-wrapper">
        <FormWrapper
          className="log-mood"
          background="var(--light-gradient)"
          onClose={onClose}
          hasClose={true}
        >
          <header className="log-mood-gap">
            <h2 className="text-preset-2-mobile md:text-preset-2 text-neutral-900">
              Log your mood
            </h2>
            <div className="log-mood-progress-bar">{progressSpans}</div>
          </header>
          <main className="log-mood-gap">
            {stepNum === 1 ? (
              <LogMoodStep1 hasFormError={(e) => setFormError(e)} />
            ) : stepNum === 2 ? (
              <LogMoodStep2 hasFormError={(e) => setFormError(e)} />
            ) : stepNum === 3 ? (
              <LogMoodStep3 hasFormError={(e) => setFormError(e)} />
            ) : stepNum === 4 ? (
              <LogMoodStep4 hasFormError={(e) => setFormError(e)} />
            ) : null}
          </main>
          <footer className="log-mood-footer log-mood-gap">
            {displayError && (
              <ErrorMessage
                className="text-preset-7"
                iconSize="15.5px"
                message={errorMessages[stepNum - 1]}
              />
            )}
            <PrimaryButton
              textClass="text-preset-4"
              homeButton={true}
              logButton={false}
              onClick={(e) => {
                handleFormClick(e);
              }}
            >
              {stepNum !== FORM_STEPS ? "Continue" : "Submit"}
            </PrimaryButton>
          </footer>
        </FormWrapper>
      </div>
    </div>
  );
};

export default LogMoodForm;
