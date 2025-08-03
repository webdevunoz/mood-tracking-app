import { useEffect, useState } from "react";

type StyledIconProps = {
  src: string; // path to SVG file
  className?: string;
  fill?: string;
  opacity?: string;
};

const StyledIcon = ({
  src,
  className,
  fill,
  opacity = "1.0",
}: StyledIconProps) => {
  const [svgContent, setSvgContent] = useState<string>("");

  useEffect(() => {
    fetch(src)
      .then((res) => res.text())
      .then((data) => {
        let updatedData = data;

        // Add in a optional className with dynamic value
        if (className) {
          const classAttr = `class="${className}"`;
          updatedData = data.replace(/<svg([^>]*?)>/, `<svg$1 ${classAttr}>`);
        }

        // Replace hardcoded fill with optional dynamic value
        if (fill)
          updatedData = updatedData.replace(/fill="[^"]*"/g, `fill="${fill}"`);

        setSvgContent(updatedData);
      });
  }, [src, className, fill]);

  return (
    <span
      style={{ opacity: `${opacity}` }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

export default StyledIcon;
