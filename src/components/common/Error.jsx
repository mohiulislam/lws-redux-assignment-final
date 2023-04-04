import React from "react";

const Error = ({ message }) => {
  return (
    <div className="absolute bottom-1/2 translate-y-1/2 right-1/2 translate-x-1/2">
      <p className="text-red-500 text-l font-sans">Error: {message}</p>
    </div>
  );
};

export default Error;
