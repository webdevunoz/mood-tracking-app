import "./PrimaryButton.css";

interface PrimaryButtonProps {
  children: React.ReactNode;
  textClass?: string;
  logButton: boolean;
  homeButton: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const PrimaryButton = ({
  children,
  textClass = "text-preset-5",
  logButton,
  homeButton,
  onClick,
}: PrimaryButtonProps) => {
  return (
    <button
      type="submit"
      onClick={(e) => {
        onClick(e);
        e.preventDefault();
      }}
      className={`${textClass} button--primary${
        logButton ? " button--log" : ""
      }${homeButton ? " button--home" : ""}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
