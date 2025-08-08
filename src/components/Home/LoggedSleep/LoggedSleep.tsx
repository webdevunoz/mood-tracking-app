import type { logData } from "../../../App";
import StyledIcon from "../../StyledIcon";
import "./LoggedSleep.css";

interface LoggedSleepProps {
  data: logData;
}

const LoggedSleep = ({ data }: LoggedSleepProps) => {
  return (
    <div className="log-sleep-wrapper">
      <header className="log-sleep-header">
        <StyledIcon
          className="log-sleep-icon"
          src={"/src/assets/images/icon-sleep.svg"}
          fill="var(--color-neutral-600)"
        />
        <p className="text-preset-6 text-neutral-600">Sleep</p>
      </header>
      <h3 className="text-preset-3 text-neutral-900">{data.hours} hours</h3>
    </div>
  );
};

export default LoggedSleep;
