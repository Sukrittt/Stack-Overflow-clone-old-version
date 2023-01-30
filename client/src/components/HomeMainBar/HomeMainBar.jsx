import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

//css
import "./HomeSideBar.css";

//redux
import { useSelector } from "react-redux";

//component
import QuestionList from "./QuestionList";

const HomeMainBar = () => {
  const questionList = useSelector((state) => state.questionReducer); //data received from backend
  const location = useLocation(); //will get the path which is active at present

  const user = useSelector((state) => state.currentUserReducer); //will get the user details from the redux store;
  const navigate = useNavigate();

  const checkAuth = () => {
    if (user === null) {
      alert("Login/Signup to ask a question");
      navigate("/auth");
    } else {
      navigate("/AskQuestions");
    }
  };
  return (
    <div className="main-bar">
      <div className="main-bar-header">
        {location.pathname === "/" ? (
          <h1>Top Questions</h1>
        ) : (
          <h1>All Questions</h1>
        )}
        <button onClick={checkAuth} className="ask-btn">
          Ask Question
        </button>
      </div>
      <div>
        {questionList.data === null ? (
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          <>
            <p>{questionList.data.length} questions</p>
            <QuestionList questionList={questionList.data} />
          </>
        )}
      </div>
    </div>
  );
};

export default HomeMainBar;
