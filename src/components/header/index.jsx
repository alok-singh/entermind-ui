import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import AppIcon from "../../icons/app-icon";
import Button from "../button";

import { setLogin } from "../../reducers/login-reducer";
import { useDispatch } from "react-redux";
import { LogOut, Settings } from "lucide-react";

const Header = () => {
  const currentPath = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setLogin(false));
    navigate("/login");
  };

  const isSettingsActive = currentPath.pathname === "/settings";

  return (
    <div className="shadow-[0_2px_20px_rgba(0,0,0,0.05)] sticky top-0 backdrop-blur-xl z-10">
      <div className="flex max-w-[1366px] mx-auto justify-between items-center h-[66.5px]">
        <div className="flex items-center">
          <AppIcon className="h-8 -mr-4" />
          <div>
            <div className="font-bold text-[14px]">Integrity</div>
            <div className="text-[10.5px] text-[#6a7282]">AI P&L Platform</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            className={`w-full text-[14px] p-3 rounded-xl transition-all text-gray-600 ${
              isSettingsActive ? "bg-[#007AFF]/10 text-[#007AFF]" : "hover:bg-gray-100"
            }`}
          >
            <Link to="/settings">
              <Settings stroke={isSettingsActive ? "#2563eb" : "#333"} />
            </Link>
          </Button>
          <Button
            className="w-full text-[14px] p-3 rounded-xl hover:bg-red-50 text-gray-600 hover:text-red-600 transition-all"
            onClick={handleLogout}
          >
            <LogOut />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
