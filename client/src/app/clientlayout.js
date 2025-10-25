"use client";

import React, { useEffect, useState, useRef } from "react";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header/Header";
import { usePathname } from "next/navigation";
import { errorRoutes, excludeRoutes, generalRoutes } from "./config/GeneralConfig";
import { Provider, useSelector } from "react-redux";
import store from "./store";
import { ping } from "./services/AuthService";
import Footer from "./components/Footer/Footer";
import { initializeAuth } from "./services/InitService";

const shouldExcludeRoute = (path) => {
  return excludeRoutes.some(route => {
    if (typeof route === 'string') {
      return route === path;
    } else if (route instanceof RegExp) {
      return route.test(path);
    }
    return false;
  });
};

const isProtectedRoute = (path) => {
  return !generalRoutes.includes(path) && 
         !errorRoutes.includes(path) && 
         !shouldExcludeRoute(path);
};

const ClientLayoutContent = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const path = usePathname();
  const intervalRef = useRef(null);
  const { user, connectionStatus } = useSelector((state) => state.auth);
  
  const sendPing = async () => {
    const isProtected = isProtectedRoute(path);
    await ping(path, isProtected);
  };

  useEffect(() => {
    if (!mounted) return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (!shouldExcludeRoute(path) && !errorRoutes.includes(path)) {
      sendPing();
      
      intervalRef.current = setInterval(() => {
        sendPing();
      }, 30000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [mounted, user, path]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
     if (!user) {
      const init = async () => {
        const result = await initializeAuth();
      };
      init();
    }
  }, [mounted,user]);

  if (!mounted) {
    return null;
  }

  const showHeader = !shouldExcludeRoute(path);
  const showFooter = !shouldExcludeRoute(path);

  return (
    <>
      {showHeader && <Header path={path} connectionStatus={connectionStatus} />}
      <ToastContainer />
      {children}
      {showFooter && <Footer />}
    </>
  );
};

const ClientLayout = ({ children }) => {
  return (
    <Provider store={store}>
      <ClientLayoutContent>{children}</ClientLayoutContent>
    </Provider>
  );
};

export default ClientLayout;