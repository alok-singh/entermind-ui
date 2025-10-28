import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorageItem, setLocalStorageItem } from "../../utils/local-storage.util";
import { LOGIN_KEY, SESSION_TIME } from "../../config/vars";

const initialState = {
  value: {
    isLoggedIn: getLocalStorageItem(LOGIN_KEY),
    userName: '',
    password: '',
    isLoading: false
  }
};

const loginSlice = createSlice({
  name: 'LOGIN_SLICE',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.value.isLoading = action.payload;
    },
    setLogin: (state, action) => {
      state.value.isLoggedIn = action.payload;
      setLocalStorageItem(LOGIN_KEY, action.payload, SESSION_TIME);
    },
    setUserName: (state, action) => {
      state.value.userName = action.payload;
    },
    setPassword: (state, action) => {
      state.value.password = action.payload;
    }
  }
});

export const { setLogin, setUserName, setPassword, setLoading } = loginSlice.actions;
export default loginSlice.reducer;