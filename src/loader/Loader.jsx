import React from "react";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
      <div className="relative inline-flex">
        <div className="w-16 h-16 bg-[#73e6cb] rounded-full"></div>
        <div className="w-16 h-16 bg-[#73e6cb] rounded-full absolute top-0 left-0 animate-ping"></div>
        <div className="w-16 h-16 bg-[#73e6cb] rounded-full absolute top-0 left-0 animate-pulse"></div>
      </div>
    </div>
  );
};

export default Loader;
