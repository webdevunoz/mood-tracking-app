import { useEffect, useState } from "react";
import "./LogMoodStep4.css";

interface LogMoodStep4Props {
  hasFormError: (e: boolean) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LogMoodStep4 = ({ hasFormError, handleChange }: LogMoodStep4Props) => {
  const [selected, setSelected] = useState("");
  const options = ["9+", "7-8", "5-6", "3-4", "0-2"];

  useEffect(() => {
    if (selected) hasFormError(false);
    else hasFormError(true);
  }, [selected, hasFormError]);

  return (
    <section className="log-mood-section">
      <header>
        <h3 className="text-preset-3-mobile md:text-preset-3 text-neutral-900">
          How many hours did you sleep last night?
        </h3>
      </header>
      <div className="mood-options-container">
        {options.map((option, i) => (
          <label
            key={i}
            className={`text-preset-5 text-neutral-900 mood-option-button label--radio2 ${
              selected === option ? "active" : ""
            }`}
          >
            <input
              type="radio"
              value={option}
              key={option}
              name="hoursSlept"
              onChange={handleChange}
              onClick={() => setSelected(option)}
            />
            <span className="mood-option-title">{option} hours</span>
          </label>
        ))}
      </div>
    </section>
  );
};

export default LogMoodStep4;
