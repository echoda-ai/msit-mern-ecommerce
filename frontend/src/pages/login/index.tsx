import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../state/base";
import { API_ENDPOINTS } from "../../configs/apiEndpoints";
import { AxiosError } from "axios";
import Context from "../../context";

export const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { getUserProfile } = useContext<any>(Context);

  const navigate = useNavigate();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await API.post(API_ENDPOINTS.AUTH.LOGIN, data);
      toast.success("User login successfully");
      getUserProfile();
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
    <section
      className="h-[calc(100vh-120px-80px)] flex justify-center items-center"
      id="login"
    >
      <div className="p-5 w-full max-w-sm mx-auto">
        <img
          src="https://media.giphy.com/media/zZw4eEWLMbc6k/giphy.gif"
          alt="login icons"
          className="w-40 mx-auto bg-transparent"
        />
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={data.email}
            onChange={handleOnChange}
            className="w-full h-full bg-slate-100 py-2 px-5 outline-none bg-transparent rounded-lg"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={data.password}
            onChange={handleOnChange}
            className="w-full h-full bg-slate-100 py-2 px-5 outline-none bg-transparent rounded-lg"
          />
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block ">
            Login
          </button>
        </form>
        <p className="my-5">
          Don't have account ?{" "}
          <Link
            to={"/sign-up"}
            className=" text-red-600 hover:text-red-700 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
};
