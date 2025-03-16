// src/components/Sidebar.jsx
import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  MdOutlineExplore,
  MdOutlineWorkOutline,
  MdOutlineAssignment,
} from "react-icons/md";
import { LuUsers } from "react-icons/lu";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: <MdOutlineExplore />, text: "Explore", path: "/explore" },
    {
      icon: <MdOutlineWorkOutline />,
      text: "Contractors",
      path: "/contractors",
    },
    { icon: <MdOutlineAssignment />, text: "Projects", path: "/project" },
    { icon: <LuUsers />, text: "Users", path: "/users" },
  ];

  // Set "Projects" as the default active tab by matching its path
  const [activeTab, setActiveTab] = useState("/project");

  // Sync activeTab with the current route on page load or navigation
  useEffect(() => {
    const currentPath = location.pathname;
    if (navItems.some((item) => item.path === currentPath)) {
      setActiveTab(currentPath);
    }
  }, [location.pathname]);

  // Handle tab click: update activeTab and navigate
  const handleTabClick = (path) => {
    setActiveTab(path);
    navigate(path);
  };

  return (
    <div className="w-32 bg-[#0B083E] text-[#FFFFFF] flex flex-col items-center p-4 h-[98%] fixed rounded-2xl ml-2 mt-1.5">
      <div className="text-2xl font-bold mb-6 tracking-wide">Logo</div>
      <nav className="w-full">
        <ul className="space-y-4">
          {navItems.map(({ icon, text, path }) => (
            <li key={text}>
              <button
                onClick={() => handleTabClick(path)}
                className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 text-[#FFFFFF] w-full ${
                  activeTab === path
                    ? "text-amber-300"
                    : "bg-transparent hover:text-amber-300"
                }`}
              >
                <span className="text-2xl">{icon}</span>
                <span className="text-sm font-medium">{text}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
