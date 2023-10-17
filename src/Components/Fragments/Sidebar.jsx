import React from "react";

export const Sidebar = () => {
  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      <a
        className="sidebar-brand d-flex align-items-center justify-content-center"
        href="index.html"
      >
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa fa-home"></i>
        </div>
        <div className="sidebar-brand-text mx-2 fw-medium">
          Dashboard <sup>RO</sup>
        </div>
      </a>
      <hr className="sidebar-divider my-0" />
      <hr className="sidebar-divider" />
      <div className="sidebar-heading ">Menu</div>
      <li className="nav-item">
        <a className="nav-link collapsed" href="/">
          <i className="fas fa-fw fa-cog"></i>
          <span>Compare</span>
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link collapsed" href="/data">
          <i className="fas fa-fw fa-wrench"></i>
          <span>Data</span>
        </a>
      </li>
      <hr className="sidebar-divider" />
      <div className="sidebar-heading">Settings</div>
      <hr className="sidebar-divider d-none d-md-block" />
      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle"></button>
      </div>
    </ul>
  );
};
