import { useEffect, useState } from "react";
import "./LogMoodStep2.css";

interface LogMoodStep2Props {
  hasFormError: (e: boolean) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LogMoodStep2 = ({ hasFormError, handleChange }: LogMoodStep2Props) => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleCheckboxChange = (option: string) => {
    if (selected.includes(option))
      setSelected((prev) => prev.filter((value) => value !== option));
    else setSelected((prev) => [...prev, option]);
  };

  const overSelected = selected.length > 3;

  useEffect(() => {
    if (overSelected) hasFormError(true);
    else hasFormError(false);
  }, [overSelected, hasFormError]);

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
    <section className="log-mood-section">
      <header className="log-mood-header">
        <h3 className="text-preset-3-mobile md:text-preset-3 text-neutral-900">
          How did you feel?
        </h3>
        <p className="text-preset-6 text-neutral-600">
          Select up to three tags:
        </p>
      </header>
      <div className="checkbox-options-container">
        {options.map((option, i) => (
          <label
            key={i}
            className={`text-preset-6-regular text-neutral-900 mood-option-button label--checkbox ${
              selected.includes(option) && "active"
            }`}
          >
            <input
              onChange={(e) => {
                handleCheckboxChange(option);
                handleChange(e);
              }}
              type="checkbox"
              value={option}
              key={option}
              name="tags"
            />
            <span className="mood-option-title">{option}</span>
          </label>
        ))}
      </div>
    </section>
  );
};

export default LogMoodStep2;
