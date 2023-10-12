import React from "react";
import ReactDOM from "react-dom/client";

import FileUpload from "./FileUpload";
import CustomFileInput from "./CustomFile.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { ComparePage } from "./Pages/ComparePage";
import "./CustomFileInput.css";
// import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ComparePage />
    {/* <FileUpload /> */}
    {/* <CustomFileInput /> */}
  </React.StrictMode>
);
