import React from "react";

const Error = ({ message }) => {
  return (
    <div class="flex h-full justify-center items-center">
      <p class="text-red-500 text-l font-sans">Error: {message}</p>
    </div>
  );
};

export default Error;
