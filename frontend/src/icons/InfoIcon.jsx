import React from "react";

function InfoIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="45"
      height="45"
      version="1"
      viewBox="0 0 50 50"
      className={`${className}`}
    >
      <path
        d="M155 456c-60-28-87-56-114-116C5 261 22 157 83 91c33-36 115-71 167-71s134 35 167 71c34 37 63 110 63 159 0 52-35 134-71 167-37 34-110 63-159 63-27 0-65-10-95-24zm180-15c128-58 164-223 72-328C306-2 124 25 59 165c-79 171 104 354 276 276z"
        transform="matrix(.1 0 0 -.1 0 50)"
        fill="currentColor"
      ></path>
      <path
        d="M224 376c-10-26 4-48 28-44 33 4 33 52 0 56-13 2-25-3-28-12zM210 280c0-5 5-10 10-10 6 0 10-28 10-65s-4-65-10-65c-5 0-10-4-10-10 0-5 18-10 40-10s40 5 40 10c0 6-4 10-10 10s-10 32-10 75v75h-30c-16 0-30-4-30-10z"
        transform="matrix(.1 0 0 -.1 0 50)"
        fill="currentColor"
      ></path>
    </svg>
  );
}

export default InfoIcon;