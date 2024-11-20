import { Link } from "react-router-dom";
import { Logo } from "../Logo";
import { GrSearch } from "react-icons/gr";

export const Header = () => {
  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className=" h-full container mx-auto flex items-center px-4 justify-between">
        <Link to={"/"}>
          <Logo />
        </Link>
        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            className="w-full outline-none"
            onChange={() => {}}
          />
          <div className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white">
            <GrSearch />
          </div>
        </div>
      </div>
    </header>
  );
};
