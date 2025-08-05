import { useState } from "react";
import "./LogMoodStep4.css";

const LogMoodStep4 = () => {
  const [selected, setSelected] = useState("");
  const options = ["9+", "7-8", "5-6", "3-4", "0-2"];

  return (
    <>
      <h3 className="text-preset-3-mobile md:text-preset-3 text-neutral-900">
        How many hours did you sleep last night?
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
            <span className="mood-option-title">{option} hours</span>
          </label>
        ))}
      </div>
    </>
  );
};

export default LogMoodStep4;
