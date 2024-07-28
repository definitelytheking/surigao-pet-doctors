import React from "react";
import DogAndCat from "../assets/dogandcat.png";

const Hero = () => {
  return (
    <div className="max-w-[1152px] mx-auto flex justify-center pt-[100px]">
      <div className="">
        <img src={DogAndCat} width={500} alt="" />
      </div>
      <div className="flex flex-col pt-10">
        <div className="items-center">
          <h1 className="font-poppins font-bold text-[50px]">
            <span className="text-[#038e4b]">Surigao</span> Pet{" "}
            <span className="text-[#ec0a0d]">Doctors</span>
          </h1>
          <p className="font-poppins font-medium text-[20px] max-w-[500px] pt-3">
            Surigao Pet Doctors is always making sure that we can offer you and
            your Pet the best possible products & services because "Your Pet is
            Our Passion".
          </p>
        </div>
        <div className="pt-20 flex flex-col w-full ">
          <button className="bg-[#00674f] hover:bg-[#038e4b] flex items-center justify-center text-[18px] font-poppins font-semibold py-5 rounded-2xl text-white ">
            24/7 CUSTOMER SERVICE
          </button>
          <p className="text-[20px] font-poppins flex items-center justify-center pt-3">
            We're here whenever you need us!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
