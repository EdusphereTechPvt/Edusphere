"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header/Header";
import { usePathname } from "next/navigation";
import { includeRoutes } from "./config/GeneralConfig";

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
    <>
      {includeRoutes.includes(path) && <Header path={path}/>}
      <ToastContainer />
      {children}
    </>
  );
};

export default ClientLayout;
