import type { MoodData } from "../../../../CustomHooks/useMoodData";
import "./MoodBar.css";

interface MoodBarProps {
  log: MoodData;
  enableBarPopover: () => void;
  children: React.ReactNode;
}

const MoodBar = ({ log, enableBarPopover, children }: MoodBarProps) => {
  const timestampDate = new Date(log.moodTimestamp);
  const date = timestampDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
  const { mood, hoursSlept: hours } = log;

  const [month, day] = date.split(" ");
  let barHeight = "";
  let iconFileName = "";
  let moodColor = "";

  if (hours && mood) {
    /* Set the bar heights based on sleep hours data */
    if (hours === "0-2") {
      barHeight = "43.8px";
    } else if (hours === "3-4") {
      barHeight = "98.8px";
    } else if (hours === "5-6") {
      barHeight = "151.8px";
    } else if (hours === "7-8") {
      barHeight = "204.8px";
    } else {
      barHeight = "257.8px";
    }

    /* Set color of mood bar based on the mood of the day */
    if (mood === "Very Happy") moodColor = "var(--color-amber-300)";
    else if (mood === "Happy") moodColor = "var(--color-green-300)";
    else if (mood === "Neutral") moodColor = "var(--color-blue-300)";
    else if (mood === "Sad") moodColor = "var(--color-indigo-200)";
    else moodColor = "var(--color-red-300)";

    /* Set the mood icon based on the mood of the day */
    const kebabIconName = (s: string) => s.replace(/\s+/g, "-").toLowerCase();
    iconFileName = `icon-${kebabIconName(mood)}-white.svg`;
  }
  return (
    <>
      <div className="mood-bar-wrapper">
        {hours && mood && (
          <div className="mood-bar-content" onClick={enableBarPopover}>
            <div
              className="mood-bar"
              style={{
                height: `${barHeight}`,
                backgroundColor: `${moodColor}`,
              }}
            ></div>
            <img
              className="mood-icon"
              src={`/src/assets/images/${iconFileName}`}
              alt={`A ${mood} icon`}
            />
          </div>
        )}
        <div className="mood-bar-details text-neutral-900">
          <p className="text-preset-9 opacity-70">{month}</p>
          <p className="text-preset-8">{day}</p>
        </div>
        {children}
      </div>
    </>
  );
};

export default MoodBar;
