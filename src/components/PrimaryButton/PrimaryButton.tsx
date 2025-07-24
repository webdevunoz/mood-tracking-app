import "./PrimaryButton.css";

interface PrimaryButtonProps {
  children: React.ReactNode;
  homeButton: boolean;
  onClick: () => void;
}

const PrimaryButton = ({
  children,
  homeButton,
  onClick,
}: PrimaryButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`text-preset-5 button--primary${
        homeButton ? " button--home" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
