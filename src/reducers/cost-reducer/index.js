import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorageItem, setLocalStorageItem } from "../../utils/local-storage.util";
import { LOGIN_KEY, SESSION_TIME } from "../../config/vars";

const initialState = {
  value: {
    selectedTabIndex: 0,
    overview: {
      isLoading: false
    },
    breakdown: {
      isLoading: false
    },
    anomaly: {
      isLoading: false
    },
    recommendation: {
      isLoading: false
    },
  }
};

const costSlice = createSlice({
  name: 'COST_SLICE',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.value.isLoading = action.payload;
    },
    setSelectedTabIndex: (state, action) => {
      state.value.selectedTabIndex = action.payload;
    },
  }
});

export const { setSelectedTabIndex, setLoading } = costSlice.actions;
export default costSlice.reducer;