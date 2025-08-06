import { useState } from "react";

import "./LogMoodStep1.css";

interface LogMoodStep1Props {
  hasFormError: (e: boolean) => void;
}

const LogMoodStep1 = ({ hasFormError }: LogMoodStep1Props) => {
  const [selected, setSelected] = useState("");
  const options = ["Very Happy", "Happy", "Neutral", "Sad", "Very Sad"];
  const optionsFileName = ["very-happy", "happy", "neutral", "sad", "very-sad"];

  if (selected) hasFormError(false);
  else hasFormError(true);

  return (
    <section className="log-mood-section">
      <header>
        <h3 className="text-preset-3-mobile md:text-preset-3 text-neutral-900">
          How was your mood today?
        </h3>
      </header>
      <div className="mood-options-container">
        {options.map((option, i) => (
          <label
            key={i}
            className={`text-preset-5 text-neutral-900 mood-option-button label--radio ${
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
    </section>
  );
};

export default LogMoodStep1;
