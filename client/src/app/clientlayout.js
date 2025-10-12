"use client";

import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header/Header";
import { usePathname } from "next/navigation";
import { errorRoutes, excludeRoutes, generalRoutes } from "./config/GeneralConfig";
import { Provider } from "react-redux";
import store from "./store";
import { ping } from "./services/AuthService";
import Footer from "./components/Footer/Footer";

const ClientLayout = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const [userData, setUserData] = useState(null)
  const path = usePathname();
   const [intervalId, setIntervalId] = useState(null);

  const sendPing = async () => {
    try{
    let res = await ping(path);
    if (res && res.user) {
        setUserData(res.user);
      } else {
        setUserData(null);
      }
      return res;
    } catch (error) {
      setUserData(null);
      return null;
    }
  };

   useEffect(() => {
    if (!mounted) return;

    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }


    if (!errorRoutes.includes(path) && !generalRoutes.includes(path) && !excludeRoutes.includes(path)) { 
      sendPing();
      const id = setInterval(() => {
        sendPing();
      }, 30000);
      setIntervalId(id);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [mounted]);

    useEffect(() => {
      setMounted(true);
    }, []);

    if (!mounted) {
      return null;
    }

  return (
    <Provider store={store}>
      {!excludeRoutes.includes(path) && <Header path={path} userData={userData}/>}
      <ToastContainer />
      {children}
      {!excludeRoutes.includes(path) && <Footer />}
    </Provider>
  );
};

  export default ClientLayout;
