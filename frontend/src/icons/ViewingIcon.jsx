import React from "react";

function ViewingIcon({ className }) {
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
        d="M40 260V20h125c77 0 125 4 125 10s-45 10-115 10H60v440h180V340h140v-40c0-22 5-40 10-40 6 0 10 21 10 47 0 46-3 51-72 120l-72 73H40V260zm275 150l49-50H260v50c0 28 1 50 3 50 1 0 25-22 52-50z"
        transform="matrix(.1 0 0 -.1 0 50)"
        fill="currentColor"
      ></path>
      <path
        d="M311 226c-28-16-50-52-51-84-1-72 80-124 142-91 17 9 25 6 49-17 38-36 51-23 15 15-23 24-26 32-17 49 44 83-54 174-138 128zm104-31c50-49 15-135-55-135-41 0-80 39-80 80s39 80 80 80c19 0 40-9 55-25z"
        transform="matrix(.1 0 0 -.1 0 50)"
        fill="currentColor"
      ></path>
    </svg>
  );
}

export default ViewingIcon;