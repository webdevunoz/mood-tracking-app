import { useState } from "react";
import "./LogMoodStep3.css";

interface LogMoodStep3Props {
  hasFormError: (e: boolean) => void;
}

const LogMoodStep3 = ({ hasFormError }: LogMoodStep3Props) => {
  const [characterCount, setCharacterCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const MAX_CHARACTERS = 150;

  const countWords = (text: string) =>
    text.trim().split(/\s+/).filter(Boolean).length;

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharacterCount(e.currentTarget.textLength);
    const numWords = countWords(e.currentTarget.value);
    setWordCount(numWords);
  };

  if (wordCount < 2) hasFormError(true);
  else hasFormError(false);

  return (
    <section className="log-mood-section">
      <header>
        <h3 className="text-preset-3-mobile md:text-preset-3">
          Write about your day...
        </h3>
      </header>
      <div className="mood-textarea-container">
        <textarea
          maxLength={MAX_CHARACTERS}
          onChange={handleTextAreaChange}
          className="mood-textarea text-preset-6 placeholder:text-preset-6-italic text-neutral-600"
          placeholder="Today, I felt..."
        ></textarea>
        <p className="text-preset-8 text-neutral-600">
          {characterCount}/{MAX_CHARACTERS}
        </p>
      </div>
    </section>
  );
};

export default LogMoodStep3;
