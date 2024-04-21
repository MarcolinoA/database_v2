import React from "react";

function CreateIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="42"
      height="42"
      version="1"
      viewBox="0 0 50 50"
      className={`${className}`}
    >
      <path
        d="M423 473c-18-7-16-27 5-46 25-23 39-21 47 3 11 34-17 58-52 43zM272 327c-84-84-113-120-118-146l-7-34 34 7c26 5 62 34 146 118 62 61 109 116 106 121s-56-41-117-102c-89-88-114-109-124-99s11 35 99 124c61 61 107 114 102 117s-60-44-121-106z"
        transform="matrix(.1 0 0 -.1 0 50)"
        fill="currentColor"
      ></path>
      <path
        d="M20 210V20h380v151c0 97-4 148-10 144s-10-62-10-141V40H40v340h134c79 0 137 4 141 10s-47 10-144 10H20V210z"
        transform="matrix(.1 0 0 -.1 0 50)"
        fill="currentColor"
      ></path>
    </svg>
  );
}

export default CreateIcon;