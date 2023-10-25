import React from "react";
import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      <a
        className="sidebar-brand d-flex align-items-center justify-content-center"
        href="/"
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

      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "nav-item active" : "nav-item"
        }
      >
        <li className="nav-link collapsed">
          <i className="fas fa-fw fa-wrench"></i>
          <span>Compare</span>
        </li>
      </NavLink>

      <NavLink
        to="/data"
        className={({ isActive }) =>
          isActive ? "nav-item active" : "nav-item"
        }
      >
        <li className="nav-link collapsed">
          <i className="fas fa-fw fa-wrench"></i>
          <span>Data</span>
        </li>
      </NavLink>

      <hr className="sidebar-divider" />
      <div className="sidebar-heading">Settings</div>
      <hr className="sidebar-divider d-none d-md-block" />
      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle"></button>
      </div>
    </ul>
  );
};
