import { useEffect, useState } from "react";
import "./LogMoodStep3.css";

interface LogMoodStep3Props {
  hasFormError: (e: boolean) => void;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const LogMoodStep3 = ({ hasFormError, handleChange }: LogMoodStep3Props) => {
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

  const minWordCount = wordCount < 2;

  useEffect(() => {
    if (minWordCount) hasFormError(true);
    else hasFormError(false);
  }, [minWordCount, hasFormError]);

  return (
    <section className="log-mood-section">
      <header>
        <h3 className="text-preset-3-mobile md:text-preset-3">
          Write about your day...
        </h3>
      </header>
      <div className="mood-textarea-container">
        <textarea
          name="reflection"
          maxLength={MAX_CHARACTERS}
          onChange={(e) => {
            handleTextAreaChange(e);
            handleChange(e);
          }}
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
