// src/pages/Dashboard.jsx
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <>
      <Sidebar />
      <div className="flex-1 p-8 ml-40 bg-white">
        <h1 className="text-4xl font-bold text-black tracking-tight">
          Welcome to the Dashboard
        </h1>
        <p className="mt-4 text-lg text-[#8B8BA2]">
          Use the sidebar to navigate to different sections of the application.
        </p>
      </div>
    </>
  );
};

export default Dashboard;
