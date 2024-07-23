import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import OurTeam from "./pages/OurTeam";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Store from "./pages/Store";
import BrowsePets from "./pages/BrowsePets";
import { ToastContainer } from "react-toastify";
import Modal from "react-modal";
import "react-toastify/dist/ReactToastify.css";
import { auth, db } from "./config/Firebase";
import { doc, getDoc } from "firebase/firestore";
import ForgotPassword from "./pages/ForgotPassword";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserDashboard from "./pages/user/UserDashboard";
import ProtectedRouteForUser from "./protectedRoute/ProtectedRouteForUser";
import ProtectedRouteForAdmin from "./protectedRoute/ProtectedRouteForAdmin";
import Loader from "./loader/Loader";
import AddProducts from "./pages/admin/AddProducts";

Modal.setAppElement("#root");

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        setUser(docSnap.exists() ? docSnap.data().firstName : null);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <Navbar user={user} />
      <Routes>
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRouteForUser>
              <UserDashboard />
            </ProtectedRouteForUser>
          }
        ></Route>
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRouteForAdmin>
              <AdminDashboard />
            </ProtectedRouteForAdmin>
          }
        ></Route>

        <Route path="/" element={<Home user={user} />}></Route>
        <Route path="browsepets" element={<BrowsePets />}></Route>
        <Route path="about" element={<About />}></Route>
        <Route path="ourteam" element={<OurTeam />}></Route>
        <Route path="services" element={<Services />}></Route>
        <Route path="contact" element={<Contact />}></Route>
        <Route path="store" element={<Store />}></Route>
        <Route path="/reset-password" element={<ForgotPassword />}></Route>
        <Route path="/add-product" element={<AddProducts />}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
