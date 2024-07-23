import { React, useState } from "react";
import Modal from "react-modal";
import PokoySignUp from "../assets/pokoy-signup.png";
import { IoMdClose } from "react-icons/io";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/Firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

Modal.setAppElement("#root");

const SignUpModal = () => {
  const [signUpVisible, setSignUpVisible] = useState(false);
  const [signInVisible, setSignInVisible] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [confirmPassword, setConfirmpassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        position: "top-center",
      });
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          uid: user.uid,
          role: "user",
        });
      }
      toast.success("User Registered Successfully", {
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
        className="outline outline-2 outline-[#00674f] text-[#00674f] py-[8px] px-[35px] rounded-xl"
        onClick={() => setSignUpVisible(true)}
      >
        Sign up
      </button>
      <Modal
        isOpen={signUpVisible}
        onRequestClose={() => setSignUpVisible(false)}
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
            <img src={PokoySignUp} width={835} alt="" />
          </div>
          <div className="w-[435px] bg-white pl-[48px]">
            <div className="flex">
              <h1 className="pt-[52px] text-[30px] font-poppins font-medium text-[#404040] overflow">
                Sign up for account
              </h1>
            </div>
            <form onSubmit={handleRegister}>
              <div>
                <div className="flex flex-col pt-[29px]">
                  <div className="py-[8px]">
                    <h1 className="font-poppins text-[20px] font-medium text-[#404040] pb-1">
                      First Name
                    </h1>
                    <input
                      type="text"
                      placeholder="Your First Name"
                      value={fname}
                      onChange={(e) => setFname(e.target.value)}
                      className="flex items-center bg-[#F8F7F7] border-2 rounded-xl placeholder-[#9A9A9A] text-[17px] font-poppins font-medium py-[16px] px-[53px]"
                      required
                    />
                  </div>
                  <div className="py-[8px]">
                    <h1 className="font-poppins text-[20px] font-medium text-[#404040] pb-1">
                      Last Name
                    </h1>
                    <input
                      type="text"
                      placeholder="Your Last Name"
                      value={lname}
                      onChange={(e) => setLname(e.target.value)}
                      className="flex items-center bg-[#F8F7F7] border-2 rounded-xl placeholder-[#9A9A9A] text-[17px] font-poppins font-medium py-[16px] px-[53px]"
                      required
                    />
                  </div>
                  <div className="">
                    <h1 className="font-poppins text-[20px] font-medium text-[#404040] pb-1">
                      Email Address
                    </h1>
                    <input
                      type="email"
                      placeholder="Enter Your Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex items-center bg-[#F8F7F7] border-2 rounded-xl placeholder-[#9A9A9A] text-[17px] font-poppins font-medium py-[16px] px-[53px]"
                      required
                    />
                  </div>
                  <div className="py-[8px]">
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
                  <div className="py-[8px]">
                    <h1 className="font-poppins text-[20px] font-medium text-[#404040] pb-1">
                      Confirm Password
                    </h1>
                    <input
                      type="password"
                      placeholder="Confirm Your Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmpassword(e.target.value)}
                      className="flex items-center bg-[#F8F7F7] border-2 rounded-xl placeholder-[#9A9A9A] text-[17px] font-poppins font-medium py-[16px] px-[53px]"
                      required
                    />
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-[#00674f] active:bg-[#00674f] text-white my-[16px] py-[16px] px-[50px] rounded-xl text-[20px] font-medium font-poppins"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SignUpModal;
