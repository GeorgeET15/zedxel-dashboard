import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import Sidebar from "../components/Sidebar";
import {
  MdArrowBackIosNew,
  MdOutlineSearch,
  MdOutlineSync,
} from "react-icons/md";
import avatar from "/public/Avatar.png";

const excelSerialToDate = (serial) => {
  const utcDays = Math.floor(serial - 25569);
  const utcValue = utcDays * 86400 * 1000;
  return new Date(utcValue).toISOString().split("T")[0];
};

const ProjectDetails = () => {
  const { projectName } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [activeTab, setActiveTab] = useState("Details");

  const projectImages = [
    "/1.png",
    "/2.png",
    "/1.png",
    "/2.png",
    "/1.png",
    "/2.png",
  ];

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch("/sample_project_data.xlsx");
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rawData = XLSX.utils.sheet_to_json(sheet);

        const mappedData = rawData.map((item) => ({
          name: item["Project Name"],
          startDate: excelSerialToDate(item["Start Date"]),
          endDate: excelSerialToDate(item["End Date"]),
          status: item["Status"],
          venue: item["Venue"],
          venueCity: item["Venue City"] || "Dubai",
          venueCountry: item["Venue Country"] || "UAE",
          totalSqM: item["Total Sq m"] || "1450",
          standNumber: item["Stand Number"] || "20",
          hallNumber: item["Hall Number"] || "05",
        }));

        const foundProject = mappedData.find((p) => p.name === projectName);
        setProject(foundProject || { name: "Project Not Found" });
      } catch (error) {
        console.error("Error loading project details:", error);
        setProject({ name: "Error Loading Project" });
      }
    };
    loadProjects();
  }, [projectName]);

  if (!project) return <div>Loading...</div>;

  const tabs = ["Details", "Contractors", "Questions"];

  return (
    <>
      <Sidebar />
      <div className="flex-1 p-4 ml-40 min-h-screen">
        <button
          onClick={() => navigate("/")}
          className="flex items-center cursor-pointer p-1 mb-4"
        >
          <MdArrowBackIosNew className="mr-1 text-sm" />
          Back to Projects
        </button>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold tracking-tight">{project.name}</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search within project..."
              className="border border-[#8B8BA2] rounded-3xl p-2 pl-8 w-64 placeholder-[#8B8BA2] text-sm focus:outline-none focus:ring-2 focus:ring-[#0B083E] transition-all duration-200"
            />
            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#8B8BA2]">
              <MdOutlineSearch className="text-lg" />
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs font-medium px-3 py-1 text-[#0B083E] transition-all duration-200 ${
                  activeTab === tab
                    ? "border-b-2 border-[#0B083E]"
                    : "hover:border-b-2 hover:border-[#0B083E] hover:border-opacity-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="flex items-center bg-[#0B083E] text-[#FFFFFF] px-3 py-1 rounded-3xl hover:bg-opacity-90 transition-all duration-200 text-xs">
            <MdOutlineSync className="mr-1 text-lg" />
            Sync
          </button>
        </div>
        <div className="p-4 mb-4">
          {activeTab === "Details" && (
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <img
                  src={avatar}
                  className="w-28 h-28 rounded-full object-cover"
                  alt="Contractor Avatar"
                />
              </div>
              <div className="flex-1">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-1 mb-1">
                  <div>
                    <p className="text-[#8B8BA2] text-sm">Start Date</p>
                    <p className="text-[#0B083E] font-medium text-base">
                      {project.startDate || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#8B8BA2] text-sm">End Date</p>
                    <p className="text-[#0B083E] font-medium text-base">
                      {project.endDate || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#8B8BA2] text-sm">Venue Name</p>
                    <p className="text-[#0B083E] font-medium text-base">
                      {project.venue || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#8B8BA2] text-sm">Venue City</p>
                    <p className="text-[#0B083E] font-medium text-base">
                      {project.venueCity}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
                  <div>
                    <p className="text-[#8B8BA2] text-sm">Venue Country</p>
                    <p className="text-[#0B083E] font-medium text-base">
                      {project.venueCountry}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#8B8BA2] text-sm">Venue Hall Number</p>
                    <p className="text-[#0B083E] font-medium text-base">
                      {project.hallNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#8B8BA2] text-sm">Venue Stand Number</p>
                    <p className="text-[#0B083E] font-medium text-base">
                      {project.standNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#8B8BA2] text-sm">Total Sq.m</p>
                    <p className="text-[#0B083E] font-medium text-base">
                      {project.totalSqM}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "Contractors" && (
            <p className="text-[#0B083E] text-sm">
              Contractors content coming soon...
            </p>
          )}
          {activeTab === "Questions" && (
            <p className="text-[#0B083E] text-sm">
              Questions content coming soon...
            </p>
          )}
        </div>
        {/* Thin line separation */}
        <div className="border-t border-[#8B8BA2] h-[1px] mb-4"></div>
        <div className="grid grid-cols-3 gap-4">
          {projectImages.map((src, index) => (
            <div key={index} className="rounded-xl overflow-hidden">
              <img
                src={src}
                alt={`Project Image ${index + 1}`}
                className="w-full max-h-40 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
