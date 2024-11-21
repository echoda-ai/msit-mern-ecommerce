import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import { AxiosError } from "axios";
import API from "./state/base";
import { API_ENDPOINTS } from "./configs/apiEndpoints";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      const res = await API.get(API_ENDPOINTS.USER.PROFILE, {
        withCredentials: true,
      });
      dispatch(setUserDetails(res.data.data));
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || error.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <ToastContainer position="top-center" />
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
