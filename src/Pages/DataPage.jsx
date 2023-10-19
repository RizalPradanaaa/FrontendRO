import React, { useState } from "react";
import { Dashboard } from "../Components/Layouts/Dashboard";

export const DataPage = () => {
  return (
    <Dashboard>
      <div className="container-xl">
        <div className="row">
          <div className="col-12 mt-3 fs-1 fw-bold">
            <h1 className="h3 mb-4 mx-3 text-gray-800">Excel Data Page</h1>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};
