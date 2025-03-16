// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProjectDetails from "./pages/ProjectDetails";
import Explore from "./pages/Explore";
import Contractors from "./pages/Contractors";
import Projects from "./pages/Projects";
import Users from "./pages/Users";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/contractors" element={<Contractors />} />
      <Route path="/project" element={<Projects />} />
      <Route path="/users" element={<Users />} />
      <Route
        path="/project-details/:projectName"
        element={<ProjectDetails />}
      />
    </Routes>
  );
}

export default App;
