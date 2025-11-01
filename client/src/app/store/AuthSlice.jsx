import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  connectionStatus: "disconnected",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken, refreshToken } = action.payload;
      console.log(action, "action")
      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.connectionStatus = "connected";
    },
    setLogout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.connectionStatus = "disconnected";
    },
    setConnectionStatus: (state, action) => {
      state.connectionStatus = action.payload;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});
export const { setCredentials, setLogout, setConnectionStatus, updateUser } = authSlice.actions;
export default authSlice.reducer;
