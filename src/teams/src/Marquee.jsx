// Marquee strip — content is duplicated so the -50% translate loops cleanly.

const Marquee = ({
  items,
  separator = "·",
  className = "",
  trackClassName = "",
  itemClassName = "",
  separatorClassName = "",
  fast = false,
}) => {
  // Duplicate items twice for seamless loop
  const sequence = [...items, ...items];

  return (
    <div className={"overflow-hidden " + className} aria-hidden="true">
      <div
        className={
          "marquee-track flex w-max " +
          (fast ? "marquee-track-fast " : "") +
          trackClassName
        }
      >
        {sequence.map((item, i) => (
          <div key={i} className="flex items-center shrink-0">
            <span className={itemClassName}>{item}</span>
            <span
              className={"mx-8 md:mx-12 " + separatorClassName}
              aria-hidden="true"
            >
              {separator}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
