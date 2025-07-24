const TodaysDate = () => {
  function formatDateWithSuffix(date = new Date()) {
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const weekday = date.toLocaleString("en-US", { weekday: "long" });
    const year = date.getFullYear();

    // Get suffix
    const suffix =
      day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
        ? "rd"
        : "th";

    return `${weekday}, ${month} ${day}${suffix}, ${year}`;
  }

  const formatted = formatDateWithSuffix();

  return <p className="text-preset-6 text-neutral-600">{formatted}</p>;
};

export default TodaysDate;
