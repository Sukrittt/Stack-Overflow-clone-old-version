import React, { useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import moment from "moment";
import copy from "copy-to-clipboard";

//redux
import { useSelector, useDispatch } from "react-redux";

//actions
import { deleteQuestion, postAnswer, voteQuestion } from "../actions/question";

//assets
import upVote from "../assets/upVote.svg";
import downVote from "../assets/downVote.svg";

//colors
import { colorPalette } from "../ColorPalette/colorPalette";

//css
import "./Questions.css";

//component
import Avatar from "../components/Avatar/Avatar";
import DisplayAnswers from "./DisplayAnswers";

const QuestionDetails = () => {
  const { id } = useParams(); // will return an object
  const [Answer, setAnswer] = useState(""); //will store the answer

  const user = useSelector((state) => state.currentUserReducer); //will get the user details from the redux store
  const questionList = useSelector((state) => state.questionReducer); //will get the questions from the redux store

  const navigate = useNavigate(); // to navigate to other url
  const location = useLocation(); // to get the current url
  const dispatch = useDispatch(); // to dispatch information in redux-store

  //to post the answer and send the data to the databse and redux store
  const handlePostAnswer = (e, answerLength) => {
    e.preventDefault();
    if (user === null) {
      alert("Login/Signup to answer a question");
      navigate("/Auth"); //if user is not logged in then redirect to login/signup page
    } else {
      if (Answer === "") {
        alert("Please write something in order to post something");
      } else {
        dispatch(
          postAnswer({
            id,
            noOfAnswers: answerLength + 1, // +1 because we are adding a new answer
            anwerBody: Answer,
            userAnswered: user.result.name,
            userId: user.result._id,
          })
        );
        let answerBody = document.getElementById("answer-body");
        answerBody.value = "";
      }
    }
  };
  const URL = "http://localhost:3000";
  //to copy the url for share functionality
  const handleShare = () => {
    copy(URL + location.pathname); // will concat home url with the path and copy it to clipboard
    alert("Copied url: " + URL + location.pathname);
  };

  // to delete the question
  const handleDelete = () => {
    dispatch(deleteQuestion(id, navigate));
  };

  //to handle up vote
  const handleUpVote = () => {
    dispatch(voteQuestion(id, "upVote", user.result._id));
  };

  //to handle down vote
  const handleDownVote = () => {
    dispatch(voteQuestion(id, "downVote", user.result._id));
  };
  return (
    <div className="question-details-page">
      {questionList.data === null ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {questionList.data
            .filter((question) => question._id === id)
            .map((question) => (
              <div key={question._id}>
                <section className="question-details-container">
                  <h1>{question.questionTitle}</h1>
                  <div className="question-details-container-2">
                    <div className="question-votes">
                      <img
                        src={upVote}
                        onClick={handleUpVote}
                        className="votes-icon"
                        alt="up-vote"
                        width="18"
                      />
                      <p>{question.upVote.length - question.downVote.length}</p>
                      <img
                        src={downVote}
                        onClick={handleDownVote}
                        className="votes-icon"
                        alt="down-vote"
                        width="18"
                      />
                    </div>
                    <div style={{ width: "100%" }}>
                      <p className="question-body">{question.questionBody}</p>
                      <div className="question-details-tags">
                        {question.tags.map((tags) => (
                          <p key={tags}>{tags}</p>
                        ))}
                      </div>
                      <div className="question-actions-user">
                        <div>
                          <button type="button" onClick={handleShare}>
                            Share
                          </button>
                          {user?.result?._id === question?.userId && (
                            // If the id of the user logged in and the id of the user who posted the question matches
                            <button type="button" onClick={handleDelete}>
                              Delete
                            </button>
                          )}
                        </div>
                        <div>
                          <p>asked {moment(question.askedOn).fromNow()}</p>
                          <Link
                            to={`/user/${question.userId}`}
                            className="user-link"
                            style={{ color: "#0086d8" }}
                          >
                            <Avatar backgroundColor="#FC5130" px="8px" py="5px">
                              {question.userPosted.charAt(0).toUpperCase()}
                            </Avatar>
                            <div>{question.userPosted}</div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {question.noOfAnswers !== 0 && (
                  <section>
                    <h3>{question.noOfAnswers} Answers</h3>
                    <DisplayAnswers
                      key={question._id}
                      question={question}
                      handleShare={handleShare}
                    />
                  </section>
                )}
                <section className="post-ans-container">
                  <h3>Your Answer</h3>
                  <form
                    onSubmit={(e) => {
                      handlePostAnswer(e, question.answer.length);
                    }}
                  >
                    <textarea
                      id="answer-body"
                      cols="30"
                      rows="10"
                      placeholder="Add a comment"
                      onChange={(e) => setAnswer(e.target.value)}
                    ></textarea>
                    <br />
                    <input
                      type="submit"
                      value="Post Your Answer"
                      className="post-ans-btn"
                    />
                  </form>
                  <p>
                    Browse other Question tagged
                    {question.tags.map((tag) => (
                      <Link key={tag} to="/tags" className="ans-tags">
                        {" " + tag + " "}
                      </Link>
                    ))}{" "}
                    or{" "}
                    <Link
                      to="/AskQuestions"
                      style={{ textDecoration: "none", color: "#009dff" }}
                    >
                      {" "}
                      ask your question
                    </Link>
                  </p>
                </section>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default QuestionDetails;
