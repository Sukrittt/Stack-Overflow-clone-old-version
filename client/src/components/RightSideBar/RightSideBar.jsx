import React from "react";

//components
import Widget from "./Widget";
import WidgetTags from "./WidgetTags";

//css
import "./RightSideBar.css";

const RightSideBar = () => {
  return (
    <aside className="rightside-bar">
      <Widget />
      <WidgetTags />
    </aside>
  );
};

export default RightSideBar;
