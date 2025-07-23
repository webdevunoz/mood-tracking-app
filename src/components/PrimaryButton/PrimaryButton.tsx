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
      className={`button--primary text-neutral-0${
        homeButton ? " button--home" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
