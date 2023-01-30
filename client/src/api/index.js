import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:80", // To send data to the backend url which is port 5000
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("Profile")).token
    }`;
  }
  return req;
});

//authentication
//will send the auth data collected from frontend and send it to backend
export const logIn = (authData) => API.post("/user/login", authData);
export const signUp = (authData) => API.post("/user/signup", authData);

//askQuestion
export const postQuestion = (questionData) =>
  API.post("/questions/Ask", questionData);
//displayQuestion
export const getQuestion = () => API.get("/questions/get"); // will send a get request to this backend url
//delete question
export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`); // will send a delete request to this backend url
//voting in question
export const voteQuestion = (id, value, userId) =>
  API.patch(`/questions/vote/${id}`, { value, userId });

//post answer
//will send a patch request to this backend url to update this data
export const postAnswer = (id, noOfAnswers, anwerBody, userAnswered, userId) =>
  API.patch(`/answer/post/${id}`, {
    noOfAnswers,
    anwerBody,
    userAnswered,
    userId,
  });

//delete answer
// will send a patch request to this backend url to delete this data
export const deleteAnswer = (id, answerId, noOfAnswers) =>
  API.patch(`/answer/delete/${id}`, { id, answerId, noOfAnswers });

//fetch all user details
export const fetchAllUsers = () => API.get("/user/getAllUsers");

//to update user details
export const updateProfile = (id, updateData) =>
  //sending patch request in this url and sending updateData which is an object containing name, about and tags, to the req.body
  API.patch(`/user/update/${id}`, updateData);
