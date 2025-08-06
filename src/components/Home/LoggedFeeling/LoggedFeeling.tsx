import "./LoggedFeeling.css";

const LoggedFeeling = () => {
  return (
    <div className="log-feeling-wrapper">
      <header className="log-feeling-header">
        <h3 className="text-preset-3 text-neutral-900 opacity-70">
          I'm feeling
        </h3>
        <h2 className="text-preset-2 text-neutral-900">Very Happy</h2>
      </header>
      <img
        className="log-feeling-icon"
        src="/src/assets/images/icon-very-happy-color.svg"
      />
      <div className="log-feeling-quote-wrapper">
        <img
          className="log-feeling-quote-icon"
          src="/src/assets/images/icon-quote.svg"
        />
        <blockquote className="log-feeling-quote text-preset-6-italic text-neutral-900">
          “When your heart is full, share your light with the world.”
        </blockquote>
      </div>
    </div>
  );
};

export default LoggedFeeling;
