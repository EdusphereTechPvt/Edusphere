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
import Loader from "./components/Loader/Loader.jsx";
import LoaderConfig from "./config/LoaderConfig";

const ClientLayout = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const [userData, setUserData] = useState(null)
  const path = usePathname();
  const [intervalId, setIntervalId] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);

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

    if (!errorRoutes.includes(path) && !excludeRoutes.includes(path)) {
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

    useEffect(() => {
      setPageLoading(true);
      const timer = setTimeout(() => {
        setPageLoading(false);
      }, 2000);

      return () => clearTimeout(timer);
    }, [path]);

  if (!mounted) {
    return null;
  }

  const getLoaderConfig = (pathname) => {
    if (pathname === '/')
    return LoaderConfig.home;
    if (pathname.startsWith('/about'))
      return LoaderConfig.about;
    if (pathname.startsWith('/contact'))
      return LoaderConfig.contact;
    if (pathname.startsWith('/demo'))
      return LoaderConfig.demo;
    if (pathname.startsWith('/pricing'))
      return LoaderConfig.pricing;
    if (pathname.startsWith('/list/'))
      return LoaderConfig.list;
    if (pathname.startsWith('/ptm-scheduling'))
      return LoaderConfig.ptm;
      // return null;
  };

  if (pageLoading && !excludeRoutes.includes(path) && !errorRoutes.includes(path)) {
    const loaderConfig = getLoaderConfig(path);
    if (loaderConfig) {
      return <Loader config={loaderConfig} />;
    }
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
