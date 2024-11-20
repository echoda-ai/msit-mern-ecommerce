import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Home } from "../pages/home";
import { Login } from "../pages/login";
import { Register } from "../pages/register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "sign-up", element: <Register /> },
    ],
  },
]);

export default router;
