import { Link } from "react-router-dom";

export const Register = () => {
  return (
    <section
      className="h-[calc(100vh-120px)] flex justify-center items-center"
      id="register"
    >
      <div className="p-5 w-full max-w-sm mx-auto">
        <img
          src="https://media.giphy.com/media/zZw4eEWLMbc6k/giphy.gif"
          alt="login icons"
          className="w-40 mx-auto bg-transparent"
        />
        <form className="flex flex-col gap-6">
          <input
            type="username"
            placeholder="Username"
            name="username"
            className="w-full h-full bg-slate-100 py-2 px-5 outline-none bg-transparent rounded-lg"
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="w-full h-full bg-slate-100 py-2 px-5 outline-none bg-transparent rounded-lg"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
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
