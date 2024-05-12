import React from "react";

function CreateIcon({ className }) {
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
        d="M70 250V20h360v336l-63 62-63 62H70V250zm220 150v-60h120V40H90v420h200v-60zm65 0l39-40h-84v40c0 22 1 40 3 40s21-18 42-40z"
        transform="matrix(.1 0 0 -.1 0 50)"
        fill="currentColor"
      ></path>
      <path
        d="M240 255c0-33-2-35-35-35-19 0-35-4-35-10 0-5 16-10 35-10 33 0 35-2 35-35 0-19 5-35 10-35 6 0 10 16 10 35 0 33 2 35 35 35 19 0 35 5 35 10 0 6-16 10-35 10-33 0-35 2-35 35 0 19-4 35-10 35-5 0-10-16-10-35z"
        transform="matrix(.1 0 0 -.1 0 50)"
        fill="currentColor"
      ></path>
    </svg>
  );
}

export default CreateIcon;
