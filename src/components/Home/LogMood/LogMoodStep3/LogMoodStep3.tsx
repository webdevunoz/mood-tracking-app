import { useState } from "react";
import "./LogMoodStep3.css";

const LogMoodStep3 = () => {
  const [characterCount, setCharacterCount] = useState(0);
  const MAX_CHARACTERS = 150;

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharacterCount(e.currentTarget.textLength);
  };

  return (
    <>
      <h3 className="text-preset-3-mobile md:text-preset-3">
        Write about your day...
      </h3>
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
    </>
  );
};

export default LogMoodStep3;
