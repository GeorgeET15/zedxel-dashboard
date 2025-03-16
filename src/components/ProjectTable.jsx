import { useNavigate } from "react-router-dom";

const ProjectTable = ({ projects, currentPage, itemsPerPage }) => {
  const navigate = useNavigate();

  const getStatusStyle = (status) => {
    const styles = {
      "Design Submitted": "border border-green-500 text-green-500 bg-green-50",
      "Project Confirmed":
        "border border-yellow-500 text-yellow-500 bg-yellow-50",
      "In Progress": "border border-yellow-500 text-yellow-500 bg-yellow-50",
      Pending: "border border-red-500 text-red-500 bg-red-50",
      "Admin Approved": "border border-blue-500 text-blue-500 bg-blue-50",
    };
    return `${
      styles[status] || "border border-gray-500 text-gray-500 bg-gray-50"
    } inline-block px-3 py-1 rounded-full text-sm font-medium`;
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProjects = projects.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="overflow-x-auto rounded-2xl shadow-lg">
      <table className="min-w-full bg-[#FFFFFF] rounded-2xl">
        <thead className="bg-[#F7F7F9] text-[#8B8BA2] sticky top-0 z-10">
          <tr>
            {["Name", "Start Date", "End Date", "Status", "Venue"].map(
              (header) => (
                <th
                  key={header}
                  className="py-4 px-6 text-left text-sm font-semibold tracking-wider first:rounded-tl-2xl last:rounded-tr-2xl"
                >
                  {header}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {paginatedProjects.map(
            ({ name, startDate, endDate, status, venue }, index) => (
              <tr
                key={name}
                className={`border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150 cursor-pointer ${
                  index === paginatedProjects.length - 1 ? "last-row" : ""
                }`}
                onClick={() => navigate(`/project-details/${name}`)}
              >
                <td className="py-4 px-6 text-sm font-medium text-black">
                  {name}
                </td>
                <td className="py-4 px-6 text-sm text-[#8B8BA2]">
                  {startDate}
                </td>
                <td className="py-4 px-6 text-sm text-[#8B8BA2]">{endDate}</td>
                <td className="py-4 px-6">
                  <span className={getStatusStyle(status)}>{status}</span>
                </td>
                <td className="py-4 px-6 text-sm text-[#8B8BA2]">{venue}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <style jsx>{`
        .last-row td:first-child {
          border-bottom-left-radius: 1rem;
        }
        .last-row td:last-child {
          border-bottom-right-radius: 1rem;
        }
        thead {
          position: sticky;
          top: 0;
          background-color: #f7f7f9;
          color: #8b8ba2;
        }
      `}</style>
    </div>
  );
};

export default ProjectTable;
