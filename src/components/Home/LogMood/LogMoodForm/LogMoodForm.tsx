import FormWrapper from "../../../Form/FormWrapper/FormWrapper";
import "./LogMoodForm.css";

interface LogMoodFormProps {
  stepNum: number;
  onClose: () => void;
  children: React.ReactNode;
}

const LogMoodForm = ({ stepNum, onClose, children }: LogMoodFormProps) => {
  const progressSpans = [];
  for (let i = 0; i < 4; i++) {
    progressSpans.push(
      <span
        key={i}
        className="progress-bar"
        style={{
          backgroundColor: `${i + 1 <= stepNum && "var(--color-blue-600)"}`,
        }}
      ></span>
    );
  }

  return (
    <div className="log-mood-overlay">
      <div className="log-mood-wrapper">
        <FormWrapper
          className="log-mood"
          background="var(--light-gradient)"
          onClose={onClose}
          hasClose={true}
        >
          <h2 className="text-preset-2-mobile md:text-preset-2 text-neutral-900">
            Log your mood
          </h2>
          <div className="log-mood-progress-bar">{progressSpans}</div>
          {children}
        </FormWrapper>
      </div>
    </div>
  );
};

export default LogMoodForm;
