import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

// eslint-disable-next-line react-refresh/only-export-components
export { router, RouterProvider };
