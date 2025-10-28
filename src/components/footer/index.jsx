import {
  Brain,
  Database,
  DollarSign,
  LayoutDashboard,
  TrendingUp,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const currentPath = useLocation();
  const activeColor = "text-[#007aff]";
  const inactiveColor = "text-[#99a1af]";
  const classList = "flex flex-col items-center text-[10.5px] gap-1.5";
  const linkList = [
    { path: "/dashboard", icon: <LayoutDashboard />, text: "Dashboard" },
    { path: "/cost", icon: <DollarSign />, text: "Cost" },
    { path: "/roi", icon: <TrendingUp />, text: "ROI" },
    { path: "/insights", icon: <Brain />, text: "Insights" },
    { path: "/data", icon: <Database />, text: "Data" },
  ];

  return (
    <div className="p-2.5 sticky bottom-0 bg-[#ffffffcc] backdrop-blur-xl">
      <div className="flex items-center justify-around max-w-[1366px] mx-auto">
        {linkList.map((item) => {
          return (
            <Link
              className={`${classList} ${
                currentPath.pathname === item.path ? activeColor : inactiveColor
              }`}
              to={item.path}
            >
              {item.icon}
              <div>{item.text}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Footer;
