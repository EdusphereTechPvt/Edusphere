"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header/Header";
import { usePathname } from "next/navigation";
import { excludeRoutes } from "./config/GeneralConfig";
import { Provider } from "react-redux";
import store from "./store";

const ClientLayout = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const path = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Provider store={store}>
      {!excludeRoutes.includes(path) && <Header path={path}/>}
      <ToastContainer />
      {children}
    </Provider>
  );
};

export default ClientLayout;
