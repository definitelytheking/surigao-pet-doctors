// ProtectedRouteForAdmin.js
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth, db } from "../config/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Loader from "../loader/Loader";

const ProtectedRouteForAdmin = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "Users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.role === "admin") {
            setIsAdmin(true);
          }
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    ); // Show a loading indicator while checking user status
  }

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRouteForAdmin;
