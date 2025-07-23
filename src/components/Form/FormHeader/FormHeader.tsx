import "./FormHeader.css";

interface FormHeaderProps {
  heading: string;
  desc: string;
}

const FormHeader = ({ heading, desc }: FormHeaderProps) => {
  return (
    <header>
      <h1 className="form-heading text-preset-3 text-neutral-900">{heading}</h1>
      <p className="text-preset-6-regular text-neutral-600">{desc}</p>
    </header>
  );
};

export default FormHeader;
