import { Header } from "./components/layout/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import API from "./state/base";
import { API_ENDPOINTS } from "./configs/apiEndpoints";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import Context from "./context";

function App() {
  const dispatch = useDispatch();

  const getUserProfile = async () => {
    const res = await API.get(API_ENDPOINTS.USER.PROFILE, {
      withCredentials: true,
    });

    if (res.data.success) {
      dispatch(setUserDetails(res.data.data));
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);
  return (
    <>
      <Context.Provider
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        value={{ getUserProfile }}
      >
        <ToastContainer position="top-center" />
        <Header />
        <main className="min-h-[calc(100vh-120px)] pt-16">
          <Outlet />
        </main>
      </Context.Provider>
    </>
  );
}

export default App;
