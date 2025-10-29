import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    selectedTabIndex: 0,
    costData: [],
    overview: {
      isLoading: false,
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
    setCostData: (state, action) => {
      state.value.costData = action.payload;
    }
  }
});

export const { setSelectedTabIndex, setLoading, setCostData } = costSlice.actions;
export default costSlice.reducer;