import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userInfo: userInfoFromStorage || false,
  loginLoading: false,
  loginErrors: false,
  registerLoading: false,
  registerErrors: false,
};

console.log(userInfoFromStorage, "hehe");

const inputSlice = createSlice({
  name: "input",
  initialState,
  reducers: {
    userLoginRequest: (state, action) => {
      state.loginLoading = true;
    },
    userLoginSuccess: (state, action) => {
      state.loginLoading = false;
      state.userInfo = action.payload;
      state.loginErrors = false;
    },
    userLoginError: (state, action) => {
      state.loginLoading = false;
      state.loginErrors = action.payload;
    },
    userRegisterRequest: (state, action) => {
      state.RegisterLoading = true;
    },
    userRegisterSuccess: (state, action) => {
      state.RegisterLoading = false;
      state.userInfo = action.payload;
      state.RegisterErrors = false;
    },
    userRegisterError: (state, action) => {
      state.RegisterLoading = false;
      state.RegisterErrors = action.payload;
    },

    userLogout: (state) => {
      state.userInfo = false;
    },
  },
});

export const {
  userLoginRequest,
  userLoginSuccess,
  userLoginError,
  userRegisterRequest,
  userRegisterSuccess,
  userRegisterError,
  userLogout,
} = inputSlice.actions;

export default inputSlice.reducer;

export const login = ({ name, password }) => {
  return async (dispatch) => {
    try {
      dispatch(userLoginRequest());
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/users/login",
        { name, password },
        config
      );
      dispatch(userLoginSuccess(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch(
        userLoginError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
};

export const handleRegister = ({ name, email, password }) => {
  return async (dispatch) => {
    try {
      dispatch(userRegisterRequest());
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/users/",
        { name, email,password },
        config
      );
      dispatch(userRegisterSuccess(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch(
        userRegisterError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
    }
  };
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch(userLogout());
};
