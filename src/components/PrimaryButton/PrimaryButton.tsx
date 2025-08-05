import "./PrimaryButton.css";

interface PrimaryButtonProps {
  children: React.ReactNode;
  textClass?: string;
  logButton: boolean;
  onClick: () => void;
}

const PrimaryButton = ({
  children,
  textClass = "text-preset-5",
  logButton,
  onClick,
}: PrimaryButtonProps) => {
  return (
    <button
      type="submit"
      onClick={(e) => {
        onClick();
        e.preventDefault();
      }}
      className={`${textClass} button--primary${
        logButton ? " button--log" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
