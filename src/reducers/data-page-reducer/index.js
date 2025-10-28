import { createSlice } from "@reduxjs/toolkit";

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
      totalRows: 0,
      validRows: 0,
      template: ''
    }
  }
};

// const results = {
//   data: [
//     {
//       date: '# "Date value was realized or projected"',
//       initiative: "AI initiative or use case name",
//       category: "Type of value delivered",
//       value_type: "Realization status",
//       amount: "Value amount in USD",
//       kpi: "Key performance indicator affected",
//       confidence: "Confidence level (0-100)",
//       mechanism: "How value was created",
//       agents: "AI agents involved",
//       notes: "Supporting evidence or context",
//     },
//     {
//       date: '# "2025-01-15"',
//       initiative: "AI-Powered Lead Qualification",
//       category: "Revenue Growth",
//       value_type: "Realized",
//       amount: "125000",
//       kpi: "+45% conversion rate",
//       confidence: "92",
//       mechanism: "Automated lead scoring reduced time-to-contact by 68%",
//       agents: "Moana (Business), Maka (Product)",
//       notes: "Based on Q4 2024 sales data analysis",
//     },
//   ],
//   errors: [
//     {
//       row: 0,
//       column: "date",
//       error: "date must be a valid date (YYYY-MM-DD)",
//     },
//     {
//       row: 0,
//       column: "category",
//       error:
//         "category must be one of: AI Model Costs, Infrastructure & Compute, Agent Platform Licenses, Talent Costs, Data & Integration",
//     },
//     {
//       row: 1,
//       column: "date",
//       error: "date must be a valid date (YYYY-MM-DD)",
//     },
//     {
//       row: 1,
//       column: "category",
//       error:
//         "category must be one of: AI Model Costs, Infrastructure & Compute, Agent Platform Licenses, Talent Costs, Data & Integration",
//     },
//   ],
//   meta: {
//     delimiter: ",",
//     linebreak: "\r\n",
//     aborted: false,
//     truncated: false,
//     cursor: 583,
//     renamedHeaders: null,
//     fields: [
//       "agents",
//       "amount",
//       "category",
//       "confidence",
//       "date",
//       "initiative",
//       "kpi",
//       "mechanism",
//       "notes",
//       "value_type",
//     ],
//   },
//   template: {
//     isCostTemplate: false,
//     isRoiTemplate: true,
//     isUsageTemplate: false,
//     isValid: true,
//   },
// };

// const errors = [
//   {
//     row: "1",
//     messages: [
//       "date must be a valid date (YYYY-MM-DD)",
//       "category must be one of: AI Model Costs, Infrastructure & Compute, Agent Platform Licenses, Talent Costs, Data & Integration",
//       "amount must be a valid number",
//     ],
//   },
// ];
// const totalRows = 10;
// const validRows = 7;
// const data = {
//   columns: [
//     "date",
//     "vendor",
//     "category",
//     "subcategory",
//     "amount",
//     "units",
//     "project",
//     "tags",
//     "notes",
//   ],
//   rows: [
//     [
//       "1/15/25",
//       "OpenAI",
//       "AI Model Costs",
//       "GPT-4 API Calls",
//       "2450.75",
//       "2500000 tokens",
//       "Customer Service AI",
//       "production,Q1-2025",
//       "Monthly API usage",
//     ],
//   ],
// };

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


export const { uploadHistory, setHistoryLoading, setSelectedTabIndex, setUploadData } = dataPageSlice.actions;
export default dataPageSlice.reducer;