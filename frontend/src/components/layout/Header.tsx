import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../Logo";
import { GrSearch } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import API from "../../state/base";
import { API_ENDPOINTS } from "../../configs/apiEndpoints";
import { clearUserDetails } from "../../store/userSlice";

export const Header = () => {
  // @ts-expect-error
  const user = useSelector((state) => state?.user.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await API.delete(API_ENDPOINTS.USER.LOGOUT, {
        withCredentials: true,
      });

      toast.success("User logout successfully");
      dispatch(clearUserDetails());
      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || error.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };
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

        <div className="flex items-center gap-7">
          <div className="relative flex justify-center">
            {user?._id && (
              <div className="text-3xl cursor-pointer relative flex justify-center">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    className="w-10 h-10 rounded-full"
                    alt={user?.username}
                  />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}
          </div>

          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
