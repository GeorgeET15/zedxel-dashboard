import Sidebar from "../components/Sidebar";

const Contractors = () => {
  return (
    <>
      <Sidebar />
      <div className="flex-1 p-8 ml-40 bg-white">
        <h1 className="text-4xl font-bold text-black tracking-tight">
          Contractors
        </h1>
        <p className="mt-4 text-lg text-[#8B8BA2]">
          Contractors content goes here.
        </p>
      </div>
    </>
  );
};

export default Contractors;
