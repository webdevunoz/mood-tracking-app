import "./AverageContent.css";
import { useEffect, useState } from "react";
import StyledIcon from "../../StyledIcon";
import type { MoodData } from "../../../CustomHooks/useMoodData";

interface AverageContentProps {
  variant: "mood" | "sleep";
  dataLogs: MoodData[];
}

const AverageContent = ({ variant, dataLogs }: AverageContentProps) => {
  const initialStatus =
    variant === "mood" ? "Keep tracking!" : "Not enough data yet!";
  const initialIcon = "";
  const inititalBgColor = `var(--color-blue-100)`;
  const initialComparisonText =
    variant === "mood"
      ? "Log 5 check-ins to see your average mood."
      : "Track 5 nights to view average sleep.";

  const [status, setStatus] = useState<string>(initialStatus);
  const [statusIcon, setStatusIcon] = useState(initialIcon);
  const [bgColor, setBgColor] = useState(inititalBgColor);
  const [trendIcon, setTrendIcon] = useState(initialIcon);
  const [comparisonText, setComparisonText] = useState(initialComparisonText);
  const [enoughData, setEnoughData] = useState(false);

  useEffect(() => {
    /* String to Number Map for Averaging Moods */
    const moodMap: Record<string, number> = {
      "Very Happy": 4,
      Happy: 3,
      Neutral: 2,
      Sad: 1,
      "Very Sad": 0,
    };

    /* String to Number Map for Averaging Hours */
    const hoursMap: Record<string, number> = {
      "9+": 4,
      "7-8": 3,
      "5-6": 2,
      "3-4": 1,
      "0-2": 0,
    };

    /* Checks the Average of the last 5, or previous 5 available logs */
    const checkAvg = (map: Record<string, number>, offsetNum = 5) => {
      let sum = 0,
        count = 0;
      for (
        let i = Math.max(0, dataLogs.length - offsetNum);
        i < dataLogs.length - (offsetNum - 5);
        i++
      ) {
        let val;
        if (variant === "mood") val = map[dataLogs[i].mood!];
        else val = map[dataLogs[i].hours!];

        if (typeof val === "number") {
          sum += val;
          count++;
        }
      }
      const avg = Math.round(sum / (count || 1));
      return avg;
    };

    if (dataLogs)
      if (dataLogs.length >= 5) {
        /* If there is at least 5 logs */
        setEnoughData(true);
        /* Get and set the average status */
        let avgStatus = "";
        let avgStatusValue = 0;
        if (variant === "mood") {
          avgStatusValue = checkAvg(moodMap);
          avgStatus =
            Object.keys(moodMap).find(
              (key) => moodMap[key] === avgStatusValue
            ) ?? "";
        } else {
          avgStatusValue = checkAvg(hoursMap);
          avgStatus =
            (Object.keys(hoursMap).find(
              (key) => hoursMap[key] === avgStatusValue
            ) ?? "") + " Hours";
        }
        setStatus(avgStatus);

        /* Get and set the status icon */
        let iconFileName = "";
        if (variant === "mood") {
          const kebabIconName = (s: string) =>
            s.replace(/\s+/g, "-").toLowerCase();
          iconFileName = `icon-${kebabIconName(avgStatus)}-white.svg`;
        } else iconFileName = `icon-sleep.svg`;

        setStatusIcon(iconFileName);

        /* Get and set background color of average content */
        let moodColor;
        if (variant === "mood")
          if (avgStatus === "Very Happy") moodColor = "var(--color-amber-300)";
          else if (avgStatus === "Happy") moodColor = "var(--color-green-300)";
          else if (avgStatus === "Neutral") moodColor = "var(--color-blue-300)";
          else if (avgStatus === "Sad") moodColor = "var(--color-indigo-200)";
          else moodColor = "var(--color-red-300)";
        else moodColor = "var(--color-blue-600";

        setBgColor(moodColor);

        /* Get and set average comparison text and icon */
        if (dataLogs.length >= 6) {
          let prevAvgStatusValue;
          if (variant === "mood") prevAvgStatusValue = checkAvg(moodMap, 6);
          else prevAvgStatusValue = checkAvg(hoursMap, 6);

          let text = "";
          let icon = "";
          if (avgStatusValue === prevAvgStatusValue) {
            text = "Same as the previous 5 check-ins";
            icon = "same";
          } else if (avgStatusValue < prevAvgStatusValue) {
            text = "Decrease from the previous 5 check-ins";
            icon = "decrease";
          } else {
            text = "Increase from the previous 5 check-ins";
            icon = "increase";
          }
          setTrendIcon(icon);
          setComparisonText(text);
        }
      } else {
        /* Reset States if not enough data */
        setStatus(initialStatus);
        setStatusIcon(initialIcon);
        setBgColor(inititalBgColor);
        setTrendIcon(initialIcon);
        setComparisonText(initialComparisonText);
        setEnoughData(false);
      }
  }, [
    dataLogs,
    variant,
    initialStatus,
    inititalBgColor,
    initialComparisonText,
  ]);

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
        style={{ backgroundColor: `${bgColor}` }}
      >
        <div className="average-status">
          {statusIcon && (
            <StyledIcon
              src={`/src/assets/images/${statusIcon}`}
              className="average-status-icon"
              fill={variant === "sleep" ? "var(--color-neutral-0)" : undefined}
              opacity={variant === "sleep" ? "0.7" : "1.0"}
            />
          )}
          <h4
            className="text-preset-4"
            style={{
              color:
                variant === "sleep" && enoughData
                  ? "var(--color-neutral-0)"
                  : "var(--color-neutral-900)",
            }}
          >
            {status}
          </h4>
        </div>
        <div className="average-trend-comparison">
          {trendIcon && (
            <StyledIcon
              src={`/src/assets/images/icon-trend-${trendIcon}.svg`}
              fill={variant === "sleep" ? "var(--color-neutral-0)" : ""}
              opacity={variant === "sleep" ? "0.7" : "1.0"}
            />
          )}
          <p
            className="text-preset-7"
            style={{
              color:
                variant === "sleep" && enoughData
                  ? "var(--color-neutral-0)"
                  : "var(--color-neutral-900)",
              opacity: variant === "sleep" ? "0.7" : "1.0",
            }}
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
