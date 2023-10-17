import React from "react";
import ReactDOM from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import { ComparePage } from "./Pages/ComparePage";
import { ErrorPage } from "./Pages/ErrorPage";
// import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DataPage } from "./Pages/DataPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ComparePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/data",
    element: <DataPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
