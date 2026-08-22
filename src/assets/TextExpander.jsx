import { useState } from "react";


export default function TextExpander({
  collapsedTextNum = 15,
  children,
  color = "green",
  size = 12,
  buttonText = "more",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const text = Array.isArray(children) ? children.join("") : children;

  const displayText = text.slice(0, collapsedTextNum);

  const viewMoreBtn = {
    color: color,
    fontSize: `${size}px`,
    border: "none",
    cursor: "pointer",
  };

  return (
    <div>
      <p
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {isOpen ? text : displayText}
        {isOpen ? "" : <button style={viewMoreBtn}>...{buttonText}</button>}
      </p>
    </div>
  );
}
