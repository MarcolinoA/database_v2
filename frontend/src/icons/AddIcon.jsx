import React from "react";

function AddIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="45"
      height="45"
      version="1"
      viewBox="0 0 48 48"
      className={`${className}`}
    >
      <path
        d="M172 429c-48-14-109-80-123-131-23-89 12-182 88-229 57-36 154-34 210 3 62 41 88 90 88 168 0 77-26 127-85 166-43 29-125 39-178 23zm148-42c51-27 90-90 90-147 0-87-83-170-170-170S70 153 70 240c0 20 10 56 23 80 27 51 90 90 147 90 20 0 56-10 80-23z"
        transform="matrix(.1 0 0 -.1 0 48)"
        fill="currentColor"
      ></path>
      <path
        d="M226 324c-3-9-6-29-6-45 0-27-2-29-40-29-40 0-53-13-24-24 9-3 27-6 40-6 19 0 24-5 24-27 0-16 5-35 10-43 9-13 11-13 20 0 5 8 10 27 10 43 0 22 5 27 24 27 13 0 31 3 40 6 29 11 16 24-24 24-38 0-40 2-40 29 0 34-9 61-20 61-4 0-11-7-14-16z"
        transform="matrix(.1 0 0 -.1 0 48)"
        fill="currentColor"
      ></path>
    </svg>
  );
}

export default AddIcon;

