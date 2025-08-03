import "./PrimaryButton.css";

interface PrimaryButtonProps {
  children: React.ReactNode;
  textClass?: string;
  homeButton: boolean;
  onClick: () => void;
}

const PrimaryButton = ({
  children,
  textClass = "text-preset-5",
  homeButton,
  onClick,
}: PrimaryButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${textClass} button--primary${
        homeButton ? " button--home" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
