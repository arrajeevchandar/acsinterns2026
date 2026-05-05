// Scroll-triggered fade-up using IntersectionObserver.
// Respects prefers-reduced-motion via CSS.

import React from "react";

const Reveal = ({ children, delay = 0, as: As = "div", className = "" }) => {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <As
      ref={ref}
      className={"reveal " + className}
      style={{ "--reveal-delay": delay + "ms" }}
    >
      {children}
    </As>
  );
};

export default Reveal;
