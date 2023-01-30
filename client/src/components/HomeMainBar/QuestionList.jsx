import React from "react";

//component
import Questions from "./Questions";

const QuestionList = ({ questionList }) => {
  return (
    <>
      {questionList.map((question) => (
        <Questions question={question} key={question._id} />
      ))}
    </>
  );
};

export default QuestionList;
