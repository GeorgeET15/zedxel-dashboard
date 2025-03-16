// src/pages/Projects.jsx
import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import Sidebar from "../components/Sidebar";
import ProjectTable from "../components/ProjectTable";
import {
  MdArrowBackIosNew,
  MdArrowForwardIos,
  MdOutlineInbox,
  MdOutlineSearch,
} from "react-icons/md";

const excelSerialToDate = (serial) => {
  const utcDays = Math.floor(serial - 25569);
  const utcValue = utcDays * 86400 * 1000;
  return new Date(utcValue).toISOString().split("T")[0];
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 7;

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
        }));

        const sortedData = [...mappedData].sort(
          (a, b) => new Date(b.startDate) - new Date(a.startDate)
        );
        setProjects(sortedData);
      } catch (error) {
        console.error("Error loading Excel file:", error);
        setProjects([]);
      }
    };
    loadProjects();
  }, []);

  const filteredProjects = projects.filter((project) => {
    const query = searchQuery.toLowerCase();
    return (
      (project.name && project.name.toLowerCase().includes(query)) ||
      (project.venue && project.venue.toLowerCase().includes(query)) ||
      (project.status && project.status.toLowerCase().includes(query)) ||
      (project.startDate && project.startDate.toLowerCase().includes(query)) ||
      (project.endDate && project.endDate.toLowerCase().includes(query))
    );
  });

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(
    currentPage * itemsPerPage,
    filteredProjects.length
  );

  const pageNumbers = [];
  const maxPagesToShow = 5;
  const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <Sidebar />
      <div className="flex-1 p-8 ml-40 bg-white">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-black tracking-tight">
            Projects
          </h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by location, user..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-[#8B8BA2] rounded-3xl p-2 pl-10 w-80 text-black placeholder-[#8B8BA2] focus:outline-none focus:ring-2 focus:ring-[#0B083E] transition-all duration-200"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8B8BA2]">
              <MdOutlineSearch className="text-xl" />
            </span>
          </div>
        </div>
        {filteredProjects.length > 0 ? (
          <ProjectTable
            projects={filteredProjects}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-64 bg-[#FFFFFF] rounded-2xl shadow-lg">
            <MdOutlineInbox className="text-6xl text-[#8B8BA2] mb-4" />
            <p className="text-lg text-[#8B8BA2] font-medium">
              No entries to show
            </p>
          </div>
        )}
        {filteredProjects.length > 0 && (
          <div className="flex justify-between items-center mt-6 text-[#8B8BA2] text-sm">
            <span>
              Showing {startIndex}-{endIndex} of {filteredProjects.length}{" "}
              entries
            </span>
            <div className="flex items-center space-x-2">
              <button
                className="p-2 hover:bg-[#F7F7F9] hover:bg-opacity-10 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                <MdArrowBackIosNew />
              </button>
              {pageNumbers.map((page) => (
                <button
                  key={page}
                  className={`px-3 py-1 rounded-xl transition-all duration-200 ${
                    currentPage === page
                      ? "bg-[#F7F7F9] "
                      : " hover:bg-[#F7F7F9] hover:bg-opacity-10"
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              <button
                className="p-2 hover:bg-[#F7F7F9] hover:bg-opacity-10 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                <MdArrowForwardIos />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Projects;
