import React from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/animation/Loading .json";

function Loader() {
  return (
    <div className=" absolute bottom-1/2 translate-y-1/2 right-1/2 translate-x-1/2 ">
      <div className="h-20 w-20"><Lottie animationData={animationData} /></div>
    </div>
  );
}

export default Loader;
