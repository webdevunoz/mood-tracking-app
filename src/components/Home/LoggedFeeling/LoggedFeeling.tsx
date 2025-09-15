import type { MoodData } from "../../../CustomHooks/useMoodData";
import "./LoggedFeeling.css";

interface LoggedFeelingProps {
  data: MoodData;
}

const LoggedFeeling = ({ data }: LoggedFeelingProps) => {
  const kebabIconName = (s: string | undefined) =>
    s?.replace(/\s+/g, "-").toLowerCase();

  const moodQuotes: Record<string, string> = {
    "Very Happy": "When your heart is full, share your light with the world.",
    Happy: "Happiness grows when it's shared with others.",
    Neutral: "A calm mind can find opportunity in every moment.",
    Sad: "One small positive thought can change your entire day.",
    "Very Sad": "You are stronger than you think; the storm will pass.",
  };

  const moodQuote = moodQuotes[data.mood ?? ""] ?? "";

  return (
    <div className="log-feeling-wrapper">
      <header className="log-feeling-header">
        <h3 className="text-preset-3 text-neutral-900 opacity-70">
          I'm feeling
        </h3>
        <h2 className="text-preset-2 text-neutral-900">{data.mood}</h2>
      </header>
      <img
        className="log-feeling-icon"
        src={`/src/assets/images/icon-${kebabIconName(data.mood)}-color.svg`}
      />
      <div className="log-feeling-quote-wrapper">
        <img
          className="log-feeling-quote-icon"
          src="/src/assets/images/icon-quote.svg"
        />
        <blockquote className="log-feeling-quote text-preset-6-italic text-neutral-900">
          {moodQuote}
        </blockquote>
      </div>
    </div>
  );
};

export default LoggedFeeling;
