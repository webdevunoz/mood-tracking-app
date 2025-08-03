import { useState } from "react";
import LogMoodForm from "../LogMoodForm/LogMoodForm";
import "./LogMoodStep1.css";
import PrimaryButton from "../../../PrimaryButton/PrimaryButton";

interface LogMoodStep1Props {
  onClose: () => void;
}

const LogMoodStep1 = ({ onClose }: LogMoodStep1Props) => {
  const [selected, setSelected] = useState("");
  const options = ["Very Happy", "Happy", "Neutral", "Sad", "Very Sad"];
  const optionsFileName = ["very-happy", "happy", "neutral", "sad", "very-sad"];

  return (
    <LogMoodForm stepNum={1} onClose={onClose}>
      <h3 className="text-preset-3-mobile md:text-preset-3 text-neutral-900">
        How was your mood today?
      </h3>
      <div className="mood-options-container">
        {options.map((option, i) => (
          <label
            key={i}
            className={`text-preset-5 text-neutral-900 mood-option-button ${
              selected === option ? "active" : ""
            }`}
          >
            <input
              type="radio"
              value={option}
              key={option}
              name="mood"
              onClick={() => setSelected(option)}
            />
            <span className="mood-option-title">{option}</span>
            <img
              className="mood-option-icon"
              src={`/src/assets/images/icon-${optionsFileName[i]}-color.svg`}
            />
          </label>
        ))}
      </div>
      <PrimaryButton
        textClass="text-preset-4"
        homeButton={false}
        onClick={() => null}
      >
        Continue
      </PrimaryButton>
    </LogMoodForm>
  );
};

export default LogMoodStep1;
