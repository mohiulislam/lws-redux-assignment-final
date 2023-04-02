import React from "react";

function NotFound({ desire }) {
  return (
    <div class="flex h-full justify-center items-center">
      <p class="text-yellow-500 text-l font-sans">No {desire} Found</p>
    </div>
  );
}

export default NotFound;
