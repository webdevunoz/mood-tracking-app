import StyledIcon from "../../StyledIcon";
import "./LoggedSleep.css";

const LoggedSleep = () => {
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
      <h3 className="text-preset-3 text-neutral-900">9+ hours</h3>
    </div>
  );
};

export default LoggedSleep;
