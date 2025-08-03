import "./FormWrapper.css";

interface FormWrapperProps {
  className: string;
  onClose?: () => void;
  hasClose?: boolean;
  background?: string;
  children: React.ReactNode;
}

const FormWrapper = ({
  className,
  onClose,
  hasClose = false,
  background = "var(--color-neutral-0)",
  children,
}: FormWrapperProps) => {
  return (
    <div
      className={`form-wrapper ${className}`}
      style={{ background: `${background}` }}
    >
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
