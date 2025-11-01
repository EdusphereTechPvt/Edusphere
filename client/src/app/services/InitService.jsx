import store from "../store";
import { setCredentials, setConnectionStatus } from "../store/AuthSlice";
import api from "./MiddlewareService";

export const initializeAuth = async () => {

  try {
    store.dispatch(setConnectionStatus("connecting"));
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/me`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        }
      }
    ).then(res => res.json());
    console.log(response)
    
    if (response.user) {
      store.dispatch(setCredentials({
        ...store.getState().auth,
        user: response.user,
      }));
      store.dispatch(setConnectionStatus("connected"));
      return response.user;
    }
    
    return null;
  } catch (error) {
    store.dispatch(setConnectionStatus("disconnected"));
    console.log("No active session found", error);
    return null;
  }
};