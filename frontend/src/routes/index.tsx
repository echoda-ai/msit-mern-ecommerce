import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Home } from "../pages/home";
import { Login } from "../pages/login";
import { Register } from "../pages/register";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { path: "", element: <Home /> },
        { path: "login", element: <Login /> },
        { path: "sign-up", element: <Register /> },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_partialHydration: true,
      v7_normalizeFormMethod: true,
      v7_fetcherPersist: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

export default router;
