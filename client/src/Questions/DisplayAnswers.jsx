import React from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
//component
import Avatar from "../components/Avatar/Avatar";
//redux
import { useDispatch, useSelector } from "react-redux";
//colors
import { colorPalette } from "../ColorPalette/colorPalette";
//actions
import { deleteAnswer } from "../actions/question";

const DisplayAnswers = ({ question, handleShare }) => {
  const user = useSelector((state) => state.currentUserReducer); //will get the user details from the redux store
  const { id } = useParams(); // will return an object

  const dispatch = useDispatch();

  //to delete an answer with a particular id
  const handleDelete = (answerId, noOfAnswers) => {
    dispatch(deleteAnswer(id, answerId, noOfAnswers - 1));
  };
  return (
    <div>
      {question.answer.map((ans) => (
        <div className="display-ans" key={ans._id}>
          <p>{ans.anwerBody}</p>
          <div className="question-actions-user">
            <div>
              <button type="button" onClick={handleShare}>
                Share
              </button>
              {user?.result?._id === ans?.userId && (
                // If the id of the user logged in and the id of the user who posted the question matches
                <button
                  type="button"
                  onClick={() => handleDelete(ans._id, question.noOfAnswers)}
                >
                  Delete
                </button>
              )}
            </div>
            <div>
              <p>answered {moment(ans.answeredOn).fromNow()}</p>
              <Link
                to={`/user/${ans.userId}`}
                className="user-link"
                style={{ color: "#0086d8" }}
              >
                <Avatar backgroundColor="#49A078" px="8px" py="5px">
                  {ans.userAnswered.charAt(0).toUpperCase()}
                </Avatar>
                <div>{ans.userAnswered}</div>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayAnswers;
