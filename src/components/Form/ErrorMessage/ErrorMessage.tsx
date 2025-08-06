import "./ErrorMessage.css";

interface ErrorMessageProps {
  className?: string;
  iconSize?: string;
  message: string;
}

const ErrorMessage = ({
  className = "text-preset-9",
  iconSize = "12px",
  message,
}: ErrorMessageProps) => {
  return (
    <span className={`error-message ${className}`}>
      <i
        className={`fas fa-info-circle`}
        style={{ width: `${iconSize}`, height: `${iconSize}` }}
      ></i>
      {message}
    </span>
  );
};

export default ErrorMessage;
