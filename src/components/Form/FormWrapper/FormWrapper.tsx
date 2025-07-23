import "./FormWrapper.css";

interface FormWrapperProps {
  className: string;
  onClose?: () => void;
  hasClose?: boolean;
  children: React.ReactNode;
}

const FormWrapper = ({
  className,
  onClose,
  hasClose = false,
  children,
}: FormWrapperProps) => {
  return (
    <div className={`form-wrapper ${className}`}>
      {hasClose && (
        <img
          className="icon-close"
          src="/src/assets/images/icon-close.svg"
          alt=""
          onClick={onClose}
        />
      )}
      <form className={`form ${className}`}>{children}</form>
    </div>
  );
};

export default FormWrapper;
