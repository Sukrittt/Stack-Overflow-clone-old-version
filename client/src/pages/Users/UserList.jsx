import React from "react";
import { useSelector } from "react-redux";
//components
import User from "./User";
//css
import "./users.css";

const UserList = () => {
  const users = useSelector((state) => state.userReducer);
  return (
    <div className="user-list-container">
      {users.map((user) => (
        <User user={user} key={user?._id} />
      ))}
    </div>
  );
};

export default UserList;
