import { useSelector } from "react-redux";

const SettingsPage = () => {
  const loginState = useSelector(state => state.login.value.isLoggedIn);
  return <div className="settings-page">
    Settings Page
    Login State: {loginState.toString()}
  </div>
};

export default SettingsPage;