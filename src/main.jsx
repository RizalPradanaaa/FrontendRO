import React from "react";
import ReactDOM from "react-dom/client";

import FileUpload from "./FileUpload";
import CustomFileInput from "./CustomFile.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dashboard } from "./Pages/Dashboard";

// import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Dashboard />
    {/* <FileUpload /> */}
    {/* <CustomFileInput /> */}
  </React.StrictMode>
);
