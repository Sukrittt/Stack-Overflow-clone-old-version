import React from "react";
import { Route, Routes } from "react-router-dom";

//components
import Home from "./pages/Home/Home";
import Auth from "./pages/auth/Auth";
import Questions from "./pages/Questions/Questions";
import AskQuestions from "./pages/AskQuestions/AskQuestions";
import DisplayQuestion from "./Questions/DisplayQuestion";
import Tags from "./pages/Tags/Tags";
import Users from "./pages/Users/Users";
import UserProfile from "./pages/UserProfile/UserProfile";

const RoutePage = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/auth" element={<Auth />} />
      <Route exact path="/questions" element={<Questions />} />
      <Route exact path="/AskQuestions" element={<AskQuestions />} />
      <Route exact path="/questions/:id" element={<DisplayQuestion />} />
      <Route exact path="/tags" element={<Tags />} />
      <Route exact path="/user" element={<Users />} />
      <Route exact path="/user/:id" element={<UserProfile />} />
    </Routes>
  );
};

export default RoutePage;
