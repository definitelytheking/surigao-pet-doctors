import logo from "../assets/logo.png";
import { NavLink, Link } from "react-router-dom";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/Firebase";
import { toast } from "react-toastify";
import { PiShoppingCartLight } from "react-icons/pi";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/Firebase";
import { useEffect, useState } from "react";

const Navbar = ({ user }) => {
  const navLinkStyles = ({ isActive }) => ({
    textDecoration: isActive ? "underline" : "none",
    textUnderlineOffset: "8px",
    color: isActive ? "#3ebb9e" : "",
  });
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await auth.signOut();
      navigate("/");
      toast.error("Logout Successfully!", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error);
    }
  }

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "Users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.role === "admin") {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="sticky top-0 p-[5px] border-b-[1px] bg-white border-b-gray-800 w-full font-poppins font-medium">
      <div className="flex justify-around items-center max-w-[1152px] mx-auto">
        <div className="flex gap-[10px]">
          <img src={logo} width={100} alt="logo" />
        </div>
        <ul className="flex items-center gap-[35px] font-medium text-[15px]">
          <li>
            <NavLink style={navLinkStyles} to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink style={navLinkStyles} to="/browsepets">
              Browse Pets
            </NavLink>
          </li>
          <li>
            <NavLink style={navLinkStyles} to="/about">
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink style={navLinkStyles} to="/ourteam">
              Our Team
            </NavLink>
          </li>
          <li>
            <NavLink style={navLinkStyles} to="/services">
              Services
            </NavLink>
          </li>
          <li>
            <NavLink style={navLinkStyles} to="/contact">
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink style={navLinkStyles} to="/store">
              Store
            </NavLink>
          </li>
        </ul>
        {!user ? (
          <div className="flex items-center gap-[20px]">
            <SignInModal />
            <SignUpModal />
          </div>
        ) : (
          <div className="flex items-center gap-[25px]">
            <span>
              {isAdmin ? (
                <Link to="/admin-dashboard">Hi, {user}</Link>
              ) : (
                <Link to="/user-dashboard">Hi, {user}</Link>
              )}
            </span>
            <span>
              <Link to="/cartproducts" className="flex items-center gap-[3px]">
                <PiShoppingCartLight size={25} />
                <span>0</span>
              </Link>
            </span>
            <span>
              <button
                onClick={handleLogout}
                className="bg-[#00674f] hover:bg-[#00674f9e] flex items-center justify-center text-[18px] font-poppins font-semibold py-3 px-8 rounded-2xl text-white"
              >
                Logout
              </button>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
