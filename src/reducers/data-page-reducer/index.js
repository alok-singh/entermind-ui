import { createSlice } from "@reduxjs/toolkit";
import { TEMPLATES } from "../../config/vars";

const initialState = {
  value: {
    selectedTabIndex: 0,
    history: {
      isLoading: false,
      uploadHistoryEntries: [],
    },
    uploadCSV: {
      fileName: '',
      errors: [],
      data: [],
      isLoading: false,
      totalRows: 0,
      validRows: 0,
      template: ''
    },
    manualEntry: {
      isLoading: false,
      template: Object.keys(TEMPLATES)[0],
      formData: Object.keys(TEMPLATES).reduce((acc, template) => {
        const mapTemplate = TEMPLATES[template];
        acc[template] = mapTemplate.FIELDS.reduce((form, field, index) => {
          const fieldType = mapTemplate.TYPES[index];
          return {
            ...form,
            [field]: fieldType === 'number' ? 0 : fieldType === 'date' ? new Date().getTime() : ''
          };
        }, {});
        return acc;
      }, {})
    }
  }
};

const dataPageSlice = createSlice({
  name: 'UPLOAD_SLICE',
  initialState,
  reducers: {
    setHistoryLoading: (state, action) => {
      state.value.history.isLoading = action.payload;
    },
    setSelectedTabIndex: (state, action) => {
      state.value.selectedTabIndex = action.payload;
    },
    uploadHistory: (state, action) => {
      state.value.history.uploadHistoryEntries = action.payload;
    },

    setUploadLoading: (state, action) => {
      state.value.uploadCSV.isLoading = action.payload;
    },

    setManualEntryLoading: (state, action) => {
      state.value.manualEntry.isLoading = action.payload;
    },

    setManualEntryTemplate: (state, action) => {
      state.value.manualEntry.template = action.payload;
    },

    setManualEntryFormData: (state, action) => {
      state.value.manualEntry.formData[state.value.manualEntry.template][action.payload.name] = action.payload.value;
    },

    setUploadData: (state, action) => {
      const { fileName, results } = action.payload;

      const errorsMap = results?.errors?.reduce((acc, item) => {
        acc[item.row] = acc[item.row] ? acc[item.row] : [];
        acc[item.row].push(item.message);
        return acc;
      }, {});

      const errors = Object.keys(errorsMap).map(key => {
        return { row: key, messages: errorsMap[key] }
      });

      state.value.uploadCSV.errors = errors;
      state.value.uploadCSV.fileName = fileName;
      state.value.uploadCSV.totalRows = results.data.length;
      state.value.uploadCSV.validRows = results.data.length - errors.length;
      state.value.uploadCSV.template = results.template;
      state.value.uploadCSV.data = {
        columns: Object.keys(results?.data?.[0] || {}),
        rows: results.data.map(item => Object.values(item))
      }
    }
  }
});

export const {
  uploadHistory,
  setHistoryLoading,
  setSelectedTabIndex,
  setUploadData,
  setUploadLoading,
  setManualEntryTemplate,
  setManualEntryFormData,
  setManualEntryLoading
} = dataPageSlice.actions;

export default dataPageSlice.reducer;