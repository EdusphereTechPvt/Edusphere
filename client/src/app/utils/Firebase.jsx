
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyDCtsIEGyIFesbReEk_HorLbaYVWBy-hdM",
  authDomain: "edusphere-3567f.firebaseapp.com",
  projectId: "edusphere-3567f",
  storageBucket: "edusphere-3567f.firebasestorage.app",
  messagingSenderId: "880603470668",
  appId: "1:880603470668:web:4d76877eaaaea7b8cc4de9",
  measurementId: "G-YK00XBT0W6"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
// const analytics = getAnalytics(app);