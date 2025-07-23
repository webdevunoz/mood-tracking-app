import "./ErrorMessage.css";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <span className="error-message text-preset-9">
      <i className="fas fa-info-circle"></i>
      {message}
    </span>
  );
};

export default ErrorMessage;
