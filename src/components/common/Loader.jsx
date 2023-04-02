import React from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/animation/Loading .json";

function Loader() {
  return (
    <div className="flex h-full w-full items-center justify-center ">
      <Lottie animationData={animationData} />
    </div>
  );
}

export default Loader;
