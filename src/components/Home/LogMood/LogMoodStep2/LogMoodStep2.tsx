import { useState } from "react";
import "./LogMoodStep2.css";

const LogMoodStep2 = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const MAX_SELECTION = 3;

  const handleCheckboxChange = (option: string) => {
    setSelected(
      (prev) =>
        prev.includes(option)
          ? prev.filter((m) => m !== option) // if option is already in selection, remove it
          : prev.length < MAX_SELECTION // if option is not already in selection and were less than the max selected
          ? [...prev, option] // add the option to the previous selected options
          : prev // otherwise if were over the max selection, keep what we have
    );
  };

  const options = [
    "Joyful",
    "Down",
    "Anxious",
    "Calm",
    "Excited",
    "Frustrated",
    "Lonely",
    "Grateful",
    "Overwhelmed",
    "Motivated",
    "Irritable",
    "Peaceful",
    "Tired",
    "Hopeful",
    "Confident",
    "Stressed",
    "Content",
    "Disappointed",
    "Optimistic",
    "Restless",
  ];

  return (
    <>
      <header className="log-mood-header">
        <h3 className="text-preset-3-mobile md:text-preset-3 text-neutral-900">
          How did you feel?
        </h3>
        <p className="text-preset-6 text-neutral-600">
          Select up to three tags:
        </p>
      </header>
      <div className="checkbox-options-container">
        {options.map((option, i) => {
          const isChecked = selected.includes(option);
          return (
            <label
              key={i}
              className={`text-preset-6-regular text-neutral-900 mood-option-button label--checkbox ${
                selected.includes(option) ? "active" : ""
              }`}
            >
              <input
                disabled={!isChecked && selected.length >= MAX_SELECTION}
                onChange={() => handleCheckboxChange(option)}
                type="checkbox"
                value={option}
                key={option}
                name="mood"
              />
              <span className="mood-option-title">{option}</span>
            </label>
          );
        })}
      </div>
    </>
  );
};

export default LogMoodStep2;
