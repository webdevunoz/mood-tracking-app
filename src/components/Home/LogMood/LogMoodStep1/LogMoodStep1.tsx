import { useState } from "react";

import "./LogMoodStep1.css";

const LogMoodStep1 = () => {
  const [selected, setSelected] = useState("");
  const options = ["Very Happy", "Happy", "Neutral", "Sad", "Very Sad"];
  const optionsFileName = ["very-happy", "happy", "neutral", "sad", "very-sad"];

  return (
    <>
      <h3 className="text-preset-3-mobile md:text-preset-3 text-neutral-900">
        How was your mood today?
      </h3>
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
    </>
  );
};

export default LogMoodStep1;
