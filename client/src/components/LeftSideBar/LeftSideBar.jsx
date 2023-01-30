import React from "react";
import { NavLink } from "react-router-dom";

//css
import "./LeftSideBar.css";

//assets
import Globe from "../../assets/globe.svg";

const LeftSideBar = () => {
  return (
    <div className="left-sidebar">
      <nav className="side-nav">
        <NavLink to="/" className="side-nav-links" activeclass="active">
          <p>Home</p>
        </NavLink>
        <div className="side-nav-div">
          <div>
            <p>Public</p>
          </div>
          <NavLink
            to="/questions"
            className="side-nav-links"
            activeclass="active"
          >
            <img src={Globe} alt="Globe" height="20px" />
            <p style={{ paddingLeft: "10px" }}>Questions</p>
          </NavLink>
          <NavLink
            to="/tags"
            style={{ paddingLeft: "40px" }}
            className="side-nav-links"
            activeclass="active"
          >
            <p>Tags</p>
          </NavLink>
          <NavLink
            to="/user"
            style={{ paddingLeft: "40px" }}
            className="side-nav-links"
            activeclass="active"
          >
            <p>Users</p>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default LeftSideBar;
