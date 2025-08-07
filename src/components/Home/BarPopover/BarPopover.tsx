import type { logData } from "../../../App";
import "./BarPopover.css";

interface BarPopoverProps {
  log: logData;
  index: number;
}

const BarPopover = ({ log, index }: BarPopoverProps) => {
  const kebabIconName = (s: string = "") =>
    s.replace(/\s+/g, "-").toLowerCase();
  const logSections = [
    {
      title: "Mood",
      value: (
        <div className="section-mood-value">
          <img
            className="section-mood-icon"
            src={`/src/assets/images/icon-${kebabIconName(log.mood)}-color.svg`}
            alt={`A ${log.mood} icon`}
          />
          <p className="text-preset-7 text-neutral-900">{log.mood}</p>
        </div>
      ),
    },
    {
      title: "Sleep",
      value: (
        <p className="text-preset-7 text-neutral-900">{log.hours} hours</p>
      ),
    },
    {
      title: "Reflection",
      value: <p className="text-preset-9 text-neutral-900">{log.reflection}</p>,
    },
    {
      title: "Tags",
      value: (
        <ul className="section-tags-value text-preset-9 text-neutral-900">
          {log.tags?.map((tag, i) => (
            <li key={i}>{tag}</li>
          ))}
        </ul>
      ),
    },
  ];

  const arrowTop =
    log.hours === "9+"
      ? "17px"
      : log.hours === "7-8"
      ? "69px"
      : log.hours === "5-6"
      ? "123px"
      : log.hours === "3-4"
      ? "173px"
      : log.hours === "0-2"
      ? "204px"
      : "";

  const arrowShadowTop =
    log.hours !== "0-2"
      ? `calc(${arrowTop} - 5.7px)`
      : `calc(${arrowTop} + 19.2px)`;

  const isLeftPopover = index < 4;
  const popoverArrowLeft = isLeftPopover ? "-6px" : "170px";
  const popoverLeft = isLeftPopover ? "48px" : "-183px";
  const popoverTop = log.hours === "0-2" ? "25px" : "0";
  const arrowPath =
    "M2.46737 0.206792L10.5471 4.55976C11.0692 4.84058 11.3815 5.34655 11.3828 5.91319L11.3828 5.91569C11.3828 6.47982 11.0731 6.98392 10.5557 7.26534L2.47531 11.6727C1.95784 11.9548 1.34177 11.9548 0.825625 11.6727C0.308817 11.3907 0.000452085 10.8859 0.00045211 10.3224L0.000452493 1.56209C0.000452517 0.999834 0.307495 0.495739 0.821657 0.213672C1.33516 -0.0683961 1.95056 -0.0715222 2.46737 0.206792Z";
  return (
    <div
      className="bar-popover-shadow-wrapper"
      style={{ left: `${popoverLeft}` }}
    >
      <div className="bar-popover-wrapper" style={{ top: `${popoverTop}` }}>
        {logSections.map((section, i) => (
          <section key={i} className="popover-section">
            <p
              role="heading"
              aria-level={8}
              className="text-preset-8 text-neutral-600"
            >
              {section.title}
            </p>
            {section.value}
          </section>
        ))}

        <svg
          className={`popover-arrow ${isLeftPopover && "rotate-arrow"}`}
          style={{ left: `${popoverArrowLeft}`, top: `${arrowTop}` }}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={arrowPath} fill="white" />
        </svg>
      </div>
      <svg
        className={`popover-arrow-shadow ${isLeftPopover && "rotate-arrow"}`}
        style={{
          left: `${
            index >= 4
              ? `calc(${popoverArrowLeft} - 1px)`
              : `calc(${popoverArrowLeft} + 1px)`
          }`,
          top: `${arrowShadowTop}`,
        }}
        width="12"
        height="12"
        viewBox="0 0 12 12"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="2"
              stdDeviation="2.5"
              floodColor="rgba(33,33,77, 0.1)"
            />
          </filter>
        </defs>
        <path d={arrowPath} filter="url(#dropShadow)" />
      </svg>
    </div>
  );
};

export default BarPopover;
