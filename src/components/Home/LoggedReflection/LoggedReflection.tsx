import type { MoodData } from "../../../CustomHooks/useMoodData";
import StyledIcon from "../../StyledIcon";
import "./LoggedReflection.css";

interface LoggedReflectionProps {
  data: MoodData;
}

const LoggedReflection = ({ data }: LoggedReflectionProps) => {
  return (
    <div className="log-reflection-wrapper">
      <header className="log-reflection-header">
        <StyledIcon
          className="log-reflection-icon"
          src={"/src/assets/images/icon-reflection.svg"}
          fill="var(--color-neutral-600)"
        />
        <p className="text-preset-6 text-neutral-600">Reflection of the day</p>
      </header>
      <p className="log-reflection-text text-preset-6 text-neutral-900">
        {data.reflection}
      </p>
      <ul className="log-tag-list text-preset-6-italic text-neutral-600">
        {data.tags?.map((tag, i) => (
          <li key={i}>#{tag}</li>
        ))}
      </ul>
    </div>
  );
};

export default LoggedReflection;
