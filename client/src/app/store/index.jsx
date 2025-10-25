import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import { useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export const useAppSelector = useSelector;
export default store;