import "./AverageContent.css";

interface AverageContentProps {
  variant: "mood" | "sleep";
}

const AverageContent = ({ variant }: AverageContentProps) => {
  const heading = {
    mood: "Mood",
    sleep: "Sleep",
  }[variant];

  const status = {
    mood: "Keep tracking!",
    sleep: "Not enough data yet!",
  }[variant];

  const comparisonText = {
    mood: "Log 5 check-ins to see your average mood.",
    sleep: "Track 5 nights to view average sleep.",
  }[variant];

  return (
    <div className="average-content">
      <div className="inline-flex items-baseline">
        <h5 className="text-preset-5 text-neutral-900">
          Average {heading}&nbsp;
        </h5>
        <span className="text-preset-7 text-neutral-600">
          (Last 5 Check-ins)
        </span>
      </div>
      <div className="average-details">
        <div>
          <img className="avgerage-icon" />
          <h4 className="text-preset-4 text-neutral-900">{status}</h4>
        </div>
        <p className="average-comparison-text text-preset-7 text-neutral-900">
          {comparisonText}
        </p>
        <img
          className="average-pattern-img"
          src="/src/assets/images/bg-pattern-averages.svg"
        />
      </div>
    </div>
  );
};

export default AverageContent;
