import "./AverageContent.css";
import type { logData } from "../../../App";
import { useEffect, useState } from "react";

interface AverageContentProps {
  variant: "mood" | "sleep";
  dataLogs: logData[];
}

const AverageContent = ({ variant, dataLogs }: AverageContentProps) => {
  const [status, setStatus] = useState<string>(
    variant === "mood" ? "Keep tracking!" : "Not enough data yet!"
  );
  const [statusIcon, setStatusIcon] = useState("");
  const [statusBgColor, setStatusBgColor] = useState(`var(--color-blue-100)`);
  const [comparisonText, setComparisonText] = useState(
    variant === "mood"
      ? "Log 5 check-ins to see your average mood."
      : "Track 5 nights to view average sleep."
  );

  const [trendIcon, setTrendIcon] = useState("");

  const moodMap: Record<string, number> = {
    "Very Happy": 4,
    Happy: 3,
    Neutral: 2,
    Sad: 1,
    "Very Sad": 0,
  };

  const checkAvgMood = (offsetNum = 5) => {
    let sum = 0,
      count = 0;
    for (
      let i = Math.max(0, dataLogs.length - offsetNum);
      i < dataLogs.length - (offsetNum - 5);
      i++
    ) {
      const val = moodMap[dataLogs[i].mood];
      if (typeof val === "number") {
        sum += val;
        count++;
      }
    }
    const avgMood = Math.round(sum / (count || 1));
    return avgMood;
  };

  useEffect(() => {
    if (dataLogs)
      if (dataLogs.length >= 5) {
        const avgMoodValue = checkAvgMood();
        const avgMood =
          Object.keys(moodMap).find((key) => moodMap[key] === avgMoodValue) ??
          "";
        setStatus(avgMood);
        const kebabIconName = (s: string) =>
          s.replace(/\s+/g, "-").toLowerCase();
        const iconFileName = `icon-${kebabIconName(avgMood)}-white.svg`;
        setStatusIcon(iconFileName);
        /* Set color of mood bar based on the mood of the day */
        let moodColor;
        if (avgMood === "Very Happy") moodColor = "var(--color-amber-300)";
        else if (avgMood === "Happy") moodColor = "var(--color-green-300)";
        else if (avgMood === "Neutral") moodColor = "var(--color-blue-300)";
        else if (avgMood === "Sad") moodColor = "var(--color-indigo-200)";
        else moodColor = "var(--color-red-300)";
        setStatusBgColor(moodColor);
        if (dataLogs.length >= 6) {
          const prevAvgMoodValue = checkAvgMood(6);
          let text = "";

          console.log(avgMoodValue, prevAvgMoodValue);

          if (avgMoodValue === prevAvgMoodValue) {
            text = "Same as the previous 5 check-ins";
            setTrendIcon("same");
          } else if (avgMoodValue < prevAvgMoodValue) {
            text = "Decrease from the previous 5 check-ins";
            setTrendIcon("decrease");
          } else {
            text = "Increase from the previous 5 check-ins";
            setTrendIcon("increase");
          }
          setComparisonText(text);
        }
      }
  }, [dataLogs]);

  const heading = {
    mood: "Mood",
    sleep: "Sleep",
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
      <div
        className="average-details"
        style={{ backgroundColor: `${statusBgColor}` }}
      >
        <div className="average-status">
          {statusIcon && (
            <img
              className="average-mood-icon"
              src={`/src/assets/images/${statusIcon}`}
              alt={`A ${status} icon`}
            />
          )}
          <h4 className="text-preset-4 text-neutral-900">{status}</h4>
        </div>
        <div className="average-mood-comparison">
          {trendIcon && (
            <img
              className="average-trend-icon"
              src={`/src/assets/images/icon-trend-${trendIcon}.svg`}
              alt=""
            />
          )}
          <p
            className="text-preset-7 text-neutral-900"
            style={{ opacity: `${trendIcon ? 1 : 0.7}` }}
          >
            {comparisonText}
          </p>
        </div>
        <img
          className="average-pattern-img"
          src="/src/assets/images/bg-pattern-averages.svg"
        />
      </div>
    </div>
  );
};

export default AverageContent;
