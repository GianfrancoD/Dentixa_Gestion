import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserForm from "./modules/auth/components/UserAuth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <UserForm />,
  },
]);

// eslint-disable-next-line react-refresh/only-export-components
export { router, RouterProvider };
