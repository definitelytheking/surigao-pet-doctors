import React from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../config/Firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailVal = e.target.email.value;
    try {
      await sendPasswordResetEmail(auth, emailVal);
      toast.success("Password reset email sent!", {
        position: "top-center",
      });
      navigate("/");
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center pt-10">
      <h1 className="font-poppins text-[50px] font-bold text-[#404040] pb-4">
        Reset Password
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          required
          className="flex items-center mb-4 bg-[#F8F7F7] border-2 rounded-xl placeholder-[#9A9A9A] text-[17px] font-poppins font-medium py-[16px] px-[53px]"
        />
        <button
          type="submit"
          className="bg-[#f40005] active:bg-[#f400049e] text-white py-[16px] px-[50px] rounded-xl text-[20px] font-medium font-poppins"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
