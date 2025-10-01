"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header/Header";
import { usePathname } from "next/navigation";
import { errorRoutes, excludeRoutes, generalRoutes } from "./config/GeneralConfig";
import { Provider } from "react-redux";
import store from "./store";
import { ping } from "./services/AuthService";

const ClientLayout = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const path = usePathname();
   const [intervalId, setIntervalId] = useState(null);

  const sendPing = async () => {
    let res = await ping(path);
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
      {!excludeRoutes.includes(path) && <Header path={path} />}
      <ToastContainer />
      {children}
    </Provider>
  );
};

export default ClientLayout;
