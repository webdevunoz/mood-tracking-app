import "./FormSubmitButton.css";

interface FormSubmitButtonProps {
  text: string;
  onClick: () => void;
}

const FormSubmitButton = ({ text, onClick }: FormSubmitButtonProps) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="submit-button text-preset-5 text-neutral-0"
    >
      {text}
    </button>
  );
};

export default FormSubmitButton;
