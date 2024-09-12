import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserForm from "./modules/auth/components/UserAuth";
import UserAppoin from "./modules/appointment/components/Appointment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <UserForm />,
  },
  {
    // citas
    path: "/appointment",
    element: <UserAppoin />,
  },
]);

// eslint-disable-next-line react-refresh/only-export-components
export { router, RouterProvider };
