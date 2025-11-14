import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    selectedTabIndex: 0,
    isLoading: false,
    costData: [],
    anomalies: []
  }
};

const costSlice = createSlice({
  name: 'COST_SLICE',
  initialState,
  reducers: {
    setSelectedTabIndex: (state, action) => {
      state.value.selectedTabIndex = action.payload;
    },
    setCostLoading: (state, action) => {
      state.value.isLoading = action.payload;
    },
    setCostData: (state, action) => {
      state.value.costData = action.payload;
    },
    setAnomaliesData: (state, action) => {
      state.value.anomalies = action.payload;
    }
  }
});

export const { setSelectedTabIndex, setAnomaliesData, setCostData, setCostLoading } = costSlice.actions;
export default costSlice.reducer;