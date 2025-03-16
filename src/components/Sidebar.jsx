import { NavLink } from "react-router-dom";
import {
  MdOutlineExplore,
  MdOutlineWorkOutline,
  MdOutlineAssignment,
} from "react-icons/md";
import { LuUsers } from "react-icons/lu";

const Sidebar = () => {
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

  return (
    <div className="w-30 bg-[#0B083E] text-[#FFFFFF] flex flex-col items-center p-4 h-[98%] fixed rounded-2xl ml-2 mt-1.5">
      <div className="text-2xl font-bold mb-6 tracking-wide">Logo</div>
      <nav className="w-full">
        <ul className="space-y-4">
          {navItems.map(({ icon, text, path }) => (
            <li key={text}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 text-[#FFFFFF] ${
                    isActive
                      ? "bg-[#FFFFFF] bg-opacity-20"
                      : "bg-transparent  hover:text-amber-300"
                  }`
                }
              >
                <span className="text-2xl">{icon}</span>
                <span className="text-sm font-medium">{text}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
