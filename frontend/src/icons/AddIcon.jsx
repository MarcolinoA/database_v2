import React from "react";

function AddIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="45"
      height="45"
      version="1"
      viewBox="0 0 32 32"
      className={`${className}`}
    >
      <path
        d="M100 273C5 224 13 80 113 41c105-40 206 61 166 166-27 70-111 101-179 66zm110-18c32-17 60-61 60-95 0-53-57-110-110-110S50 107 50 160c0 33 28 78 58 94 35 20 66 20 102 1z"
        transform="matrix(.1 0 0 -.1 0 32)"
        fill="currentColor"
      ></path>
      <path
        d="M150 190c0-13-7-20-20-20-11 0-20-4-20-10 0-5 9-10 20-10 13 0 20-7 20-20 0-11 5-20 10-20 6 0 10 9 10 20 0 13 7 20 20 20 11 0 20 5 20 10 0 6-9 10-20 10-13 0-20 7-20 20 0 11-4 20-10 20-5 0-10-9-10-20z"
        transform="matrix(.1 0 0 -.1 0 32)"
        fill="currentColor"
      ></path>
    </svg>
  );
}

export default AddIcon;

