import Sidebar from "../components/Sidebar";

const Explore = () => {
  return (
    <>
      <Sidebar />
      <div className="flex-1 p-8 ml-40 bg-white">
        <h1 className="text-4xl font-bold text-black tracking-tight">
          Explore
        </h1>
        <p className="mt-4 text-lg text-[#8B8BA2]">
          Explore content goes here.
        </p>
      </div>
    </>
  );
};

export default Explore;
