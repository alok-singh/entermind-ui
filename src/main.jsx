import { configureStore } from '@reduxjs/toolkit';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/dashboard';
import LoginPage from './pages/login';
import SettingsPage from './pages/settings';
import DataStorePage from './pages/data-store/index.jsx';
import loginReducer from './reducers/login-reducer';
import dataPageReducer from './reducers/data-page-reducer';
import costPageReducer from './reducers/cost-reducer';
import Footer from './components/footer';
import Header from './components/header';
import { Toaster } from './components/toast';
import { LOGIN_KEY } from './config/vars';
import CostExplorer from './pages/cost';
import { getLocalStorageItem } from './utils/local-storage.util';
import './index.css';
import RoiPage from './pages/roi/index.jsx';
import InsightsPage from './pages/insights/index.jsx';

const store = configureStore({
  reducer: {
    login: loginReducer,
    uploadPage: dataPageReducer,
    costPage: costPageReducer
  }
});

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = getLocalStorageItem(LOGIN_KEY);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="protected-routes">
      <Header />
      {children}
      <Toaster />
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path=""
            element={
              <ProtectedRoute>
                <Outlet />
              </ProtectedRoute>
            }
          >
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/cost" element={<CostExplorer />} />
            <Route path="/data" element={<DataStorePage />} />
            <Route path="/roi" element={<RoiPage />} />
            <Route path="/insights" element={<InsightsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
