import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProjectDetails from "./pages/ProjectDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route
        path="/project-details/:projectName"
        element={<ProjectDetails />}
      />
      {/* Add other routes like /explore, /contractors, /users if needed */}
    </Routes>
  );
}

export default App;
