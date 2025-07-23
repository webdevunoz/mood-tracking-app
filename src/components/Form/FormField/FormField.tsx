import "./FormField.css";
import { useState } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

interface FormFieldProps {
  label: string;
  type?: string;
  value?: string;
  placeholder?: string;
  onChange?: () => void;
}

const FormField = ({
  label,
  type = "text",
  value,
  placeholder,
  onChange,
}: FormFieldProps) => {
  const [emailValue, setEmailValue] = useState("");
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmailValue(value);
    setIsValid(e.target.validity.valid);
  };

  return (
    <div className="input-wrapper">
      <label htmlFor={type} className="text-preset-6-regular text-neutral-900">
        {label}
      </label>
      <input
        defaultValue={value}
        value={type === "email" ? emailValue : undefined}
        onChange={type === "email" ? handleChange : onChange}
        id={type}
        type={type}
        className="form-input text-preset-6-regular"
        placeholder={type === "email" ? "name@mail.com" : placeholder}
      ></input>
      {!isValid && <ErrorMessage message="Invalid email format." />}
    </div>
  );
};

export default FormField;
