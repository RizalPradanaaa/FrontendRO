import React from "react";
import { Navbar } from "../Components/Fragments/Navbar";
import { Sidebar } from "../Components/Fragments/Sidebar";
import { Footer } from "../Components/Fragments/Footer";

export const Dashboard = () => {
  return (
    <>
      <div id="wrapper">
        <Sidebar></Sidebar>
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Navbar></Navbar>
            <div className="container-fluid">
              <h1 className="h3 mb-4 text-gray-800">Blank Page</h1>
            </div>
          </div>

          <Footer></Footer>
        </div>
      </div>

      <div>
        {/* Scroll to Top Button */}
        <a className="scroll-to-top rounded" href=".page-top">
          <i className="fas fa-angle-up"></i>
        </a>

        {/* Logout Modal */}
        <div
          className="modal fade"
          id="logoutModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Ready to Leave?
                </h5>
                <button
                  className="close"
                  type="button"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                Select "Logout" below if you are ready to end your current
                session.
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  type="button"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <a className="btn btn-primary" href="login.html">
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
