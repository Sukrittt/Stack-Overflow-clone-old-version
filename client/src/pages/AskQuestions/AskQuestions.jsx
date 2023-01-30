import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//redux
import { useDispatch, useSelector } from "react-redux";
//actions
import { askQuestion } from "../../actions/question";
//css
import "./AskQuestions.css";

const AskQuestions = () => {
  //useState hook to store the title, body and tags
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [tags, setTags] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.currentUserReducer); // will get the details of the user logged in
  const navigate = useNavigate();

  //to handle the data after submitting a question
  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(
      askQuestion(
        {
          questionTitle,
          questionBody,
          tags,
          userPosted: user.result.name, // in 'user' we got a token 'result' which contains the name of the user logged in
          userId: user?.result?._id,
        },
        navigate
      )
    );
  };

  //to handle the event of the 'enter' key pressed in the question's body
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setQuestionBody(questionBody + "\n"); // When 'enter' is pressed then add a '\n' to the 'questionBody' as well
    }
  };
  return (
    <div className="ask-question">
      <div className="ask-ques-container">
        <h1>Ask a public Question</h1>
        <form onSubmit={handleOnSubmit}>
          <div className="ask-form-container">
            <label htmlFor="ask-ques-title">
              <h4>Title</h4>
              <p>
                Be specific and imagine you are asking a question to another
                person
              </p>
              <input
                type="text"
                name="question-title"
                id="ask-ques-title"
                placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
                onChange={(e) => {
                  setQuestionTitle(e.target.value);
                }}
              />
            </label>
            <label htmlFor="ask-ques-body">
              <h4>Body</h4>
              <p>
                Include all the information someone would need to answer your
                question
              </p>
              <textarea
                name="ask-ques-body"
                id="ask-ques-body"
                cols="30"
                rows="10"
                onChange={(e) => {
                  setQuestionBody(e.target.value);
                }}
                onKeyDown={handleEnter}
              ></textarea>
            </label>
            <label htmlFor="ask-ques-tags">
              <h4>Tags</h4>
              <p>
                Be specific and imagine you are asking a question to another
                person
              </p>
              <input
                type="text"
                name="question-tags"
                id="ask-ques-tags"
                placeholder="e.g. (xml typescript wordpress)"
                onChange={(e) => {
                  setTags(e.target.value.split(" "));
                }}
              />
            </label>
          </div>
          <input
            type="submit"
            value="Review your question"
            className="review-btn"
          />
        </form>
      </div>
    </div>
  );
};

export default AskQuestions;
