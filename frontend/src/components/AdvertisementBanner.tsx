import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

export const AdvertisementBanner = () => {
  return (
    <div className="container mx-auto px-4 mt-20 rounded h-56 md:h-72 w-full bg-slate-200 relative ">
      <div className="absolute z-10 h-full w-full md:flex items-center hidden ">
        <div className=" flex justify-between w-full text-2xl">
          <button
            onClick={() => {}}
            className="bg-white shadow-md rounded-full p-1"
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={() => {}}
            className="bg-white shadow-md rounded-full p-1"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
};
