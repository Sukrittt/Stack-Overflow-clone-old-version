import React from "react";

//css
import "./users.css";
//components
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import UserList from "./UserList";

const Users = () => {
  return (
    <div className="home-container-1">
      <LeftSideBar />
      <div
        className="home-container-2"
        style={{ marginTop: "70px", marginBottom: 0 }}
      >
        <h1 style={{ fontWeight: 400 }}>Users</h1>
        <UserList />
      </div>
    </div>
  );
};

export default Users;
