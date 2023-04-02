import React from "react";

function AuthLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="flex flex-col items-center justify-center text-white">
        <p className="text-sm mb-8">
          Please wait while we authenticate your account.
        </p>
        <div className="relative w-40 h-40">
          <div className="absolute inset-0 flex items-center justify-center"></div>
        
        </div>
      </div>
    </div>
  );
}

export default AuthLoader;
