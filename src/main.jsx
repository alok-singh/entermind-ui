import { configureStore } from "@reduxjs/toolkit";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import DashboardPage from "./pages/dashboard";
import LoginPage from "./pages/login";
import SettingsPage from "./pages/settings";
import DataStorePage from "./pages/data-store/index.jsx";
import loginReducer from "./reducers/login-reducer";
import dataPageReducer from "./reducers/data-page-reducer";

import Footer from "./components/footer";
import Header from "./components/header";

import { Toaster } from "./components/toast";
import { LOGIN_KEY } from "./config/vars";
import "./index.css";
import CostExplorer from "./pages/cost";
import { getLocalStorageItem } from "./utils/local-storage.util";

const store = configureStore({
  reducer: {
    login: loginReducer,
    uploadPage: dataPageReducer
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            element={
              getLocalStorageItem(LOGIN_KEY) ? (
                <div className="protected-routes">
                  <Header />
                  <Outlet />
                  <Toaster />
                  <Footer />
                </div>
              ) : (
                <Navigate to="/login" />
              )
            }
          >
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/cost" element={<CostExplorer />} />
            <Route path="/data" element={<DataStorePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
