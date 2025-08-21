import "./FormField.css";
import { useState } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

interface FormFieldProps {
  label: string;
  type?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setValidity?: (isValid: boolean) => void;
  isValidName?: boolean;
}

const FormField = ({
  label,
  type = "text",
  value,
  placeholder,
  onChange = () => null,
  setValidity = () => true,
  isValidName = true,
}: FormFieldProps) => {
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valid = e.target.validity.valid;
    setValidity(valid);
    setIsValid(valid);
    onChange(e);
  };

  return (
    <div className="input-wrapper">
      <label htmlFor={type} className="text-preset-6-regular text-neutral-900">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => handleChange(e)}
        id={type}
        type={type}
        className="form-input text-preset-6-regular"
        placeholder={type === "email" ? "name@mail.com" : placeholder}
      ></input>
      {!isValid && <ErrorMessage message="Invalid email format." />}
      {!isValidName && <ErrorMessage message="You must put a name." />}
    </div>
  );
};

export default FormField;
