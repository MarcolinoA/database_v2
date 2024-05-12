import React from "react";

function DownloadIcon({ className }) {
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
        d="M240 333V176l-35 34c-19 18-38 30-42 26-4-3 14-28 40-54l47-47 47 47c26 26 44 51 40 54-4 4-23-8-42-26l-35-34v157c0 98-4 157-10 157s-10-59-10-157z"
        transform="matrix(.1 0 0 -.1 0 50)"
        fill="currentColor"
      ></path>
      <path
        d="M70 170V0h360v340h-55c-30 0-55-4-55-10 0-5 20-10 45-10h45V20H90v300h45c25 0 45 5 45 10 0 6-25 10-55 10H70V170z"
        transform="matrix(.1 0 0 -.1 0 50)"
        fill="currentColor"
      ></path>
    </svg>
  );
}

export default DownloadIcon;