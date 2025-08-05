import { useState } from "react";
import FormWrapper from "../../../Form/FormWrapper/FormWrapper";
import LogMoodStep1 from "../LogMoodStep1/LogMoodStep1";
import "./LogMoodForm.css";
import PrimaryButton from "../../../PrimaryButton/PrimaryButton";
import LogMoodStep2 from "../LogMoodStep2/LogMoodStep2";
import LogMoodStep3 from "../LogMoodStep3/LogMoodStep3";

interface LogMoodFormProps {
  onClose: () => void;
}

const LogMoodForm = ({ onClose }: LogMoodFormProps) => {
  const [stepNum, setStepNum] = useState(1);
  const progressSpans = [];
  for (let i = 0; i < 4; i++) {
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
          ) : null}
          <PrimaryButton
            textClass="text-preset-4"
            homeButton={true}
            logButton={false}
            onClick={(e) => {
              setStepNum(stepNum + 1);
              e.currentTarget.blur();
            }}
          >
            Continue
          </PrimaryButton>
        </FormWrapper>
      </div>
    </div>
  );
};

export default LogMoodForm;
