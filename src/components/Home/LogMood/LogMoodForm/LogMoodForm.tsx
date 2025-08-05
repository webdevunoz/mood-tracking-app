import { useState } from "react";
import FormWrapper from "../../../Form/FormWrapper/FormWrapper";
import LogMoodStep1 from "../LogMoodStep1/LogMoodStep1";
import "./LogMoodForm.css";
import PrimaryButton from "../../../PrimaryButton/PrimaryButton";
import LogMoodStep2 from "../LogMoodStep2/LogMoodStep2";
import LogMoodStep3 from "../LogMoodStep3/LogMoodStep3";
import LogMoodStep4 from "../LogMoodStep4/LogMoodStep4";

interface LogMoodFormProps {
  onClose: () => void;
}

const LogMoodForm = ({ onClose }: LogMoodFormProps) => {
  const FORM_STEPS = 4;
  const [stepNum, setStepNum] = useState(1);
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
    if (stepNum < FORM_STEPS) {
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
          <h2 className="text-preset-2-mobile md:text-preset-2 text-neutral-900">
            Log your mood
          </h2>
          <div className="log-mood-progress-bar">{progressSpans}</div>
          {stepNum === 1 ? (
            <LogMoodStep1 />
          ) : stepNum === 2 ? (
            <LogMoodStep2 />
          ) : stepNum === 3 ? (
            <LogMoodStep3 />
          ) : stepNum === 4 ? (
            <LogMoodStep4 />
          ) : null}
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
        </FormWrapper>
      </div>
    </div>
  );
};

export default LogMoodForm;
