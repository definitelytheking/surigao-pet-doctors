// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHtx5fwSNhnZ3kJEE5-DbGvcr0P1iX3x0",
  authDomain: "surigao-pet-doctors-a3be0.firebaseapp.com",
  projectId: "surigao-pet-doctors-a3be0",
  storageBucket: "surigao-pet-doctors-a3be0.appspot.com",
  messagingSenderId: "140977106274",
  appId: "1:140977106274:web:00640c431fafba9a40503b",
  measurementId: "G-VY77CYCD99",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
