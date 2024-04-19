import React from "react";

function AddIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      version="1"
      viewBox="0 0 100 100"
      className={`${className}`}
    >
      <path
        d="M386 944C161 890 10 658 48 427 110 60 560-86 821 175c329 330 18 879-435 769zm219-39c312-81 418-473 191-701C555-36 145 97 87 434 37 729 313 980 605 905z"
        transform="matrix(.1 0 0 -.1 0 100)"
        fill="currentColor"
        fill-rule="evenodd"
      ></path>
      <path
        d="M487 654c-4-4-7-36-7-70v-63l-67-3c-53-2-68-6-68-18s15-16 67-18l67-3 3-67c2-52 6-67 18-67s16 15 18 67l3 67 67 3c52 2 67 6 67 18s-15 16-67 18l-67 3-3 66c-3 61-14 84-31 67z"
        transform="matrix(.1 0 0 -.1 0 100)"
        fill="currentColor"
        fill-rule="evenodd"
      ></path>
    </svg>
  );
}

export default AddIcon;