import { React, useState } from "react";
import Modal from "react-modal";
import Pokoy from "../assets/pokoy.png";
import { IoMdClose } from "react-icons/io";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/Firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignInModal = () => {
  const [signInVisible, setSignInVisible] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleResetPassword = () => {
    setSignInVisible(false);
    navigate("/reset-password");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Sign in successful", {
        position: "top-center",
      });
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
      });
    }
  };

  return (
    <div>
      <button
        className="bg-[#00674f] text-white py-[8px] px-[35px] rounded-xl"
        onClick={() => setSignInVisible(true)}
      >
        Sign in
      </button>
      <Modal
        isOpen={signInVisible}
        onRequestClose={() => setSignInVisible(false)}
        style={{
          overlay: {
            background: "rgba(78, 78, 78, 0.5)",
          },
          content: {
            width: "850px",
            height: "850px",
            display: "flex",
            margin: "auto",
            border: "none",
            background: "none",
          },
        }}
      >
        <div className="flex h-[850] justify-between overflow-hidden">
          <div className="w-[435px] bg-[#00674f]">
            <h1 className="flex font-poppins text-[32px] text-white justify-center pt-10">
              Surigao Pet Doctors
            </h1>
            <img src={Pokoy} alt="" />
          </div>
          <div className="w-[435px] bg-white pl-[48px]">
            <div className="flex">
              <h1 className="pt-[52px] text-[38px] font-poppins font-medium text-[#404040]">
                Login
              </h1>
              <button
                className="pt-[52px] flex items-center text-[#404040] ml-[500px]"
                onClick={() => setSignInVisible(false)}
              ></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div>
                <div className="flex pt-[29px] pb-[24px]"></div>
                <div>
                  <h1 className="font-poppins text-[20px] font-medium text-[#404040] pb-1">
                    Email Address
                  </h1>
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter Your Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex items-center bg-[#F8F7F7] border-2 rounded-xl placeholder-[#9A9A9A] text-[17px] font-poppins font-medium py-[16px] px-[53px]"
                    required
                  />
                </div>
                <div className="flex pt-[29px] pb-[24px]">
                  <div>
                    <h1 className="font-poppins text-[20px] font-medium text-[#404040] pb-1">
                      Password
                    </h1>
                    <input
                      type="password"
                      placeholder="Your Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="flex items-center bg-[#F8F7F7] border-2 rounded-xl placeholder-[#9A9A9A] text-[17px] font-poppins font-medium py-[16px] px-[53px]"
                      required
                    />
                  </div>
                </div>
              </div>
              <div>
                <button className="bg-[#00674f] active:bg-[#00674f] text-white py-[16px] px-[50px] rounded-xl text-[20px] font-medium font-poppins">
                  Sign In
                </button>
                <button
                  onClick={handleResetPassword}
                  className="flex pt-[16px] cursor-pointer font-poppins font-medium text-[20px] text-[#00674f]"
                >
                  Forgot Password?
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SignInModal;
