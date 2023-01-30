//import all functions from the api folder
import * as api from "../api";
//action
import { setCurrentUser } from "./currentUser";

export const signup = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(authData);
    dispatch({ type: "AUTH", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile")))); // Storing the data in the redux store
    navigate("/"); //to navigate to the home page after signing in
  } catch (error) {
    console.log(error);
  }
};

export const login = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.logIn(authData);
    dispatch({ type: "AUTH", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    navigate("/"); //to navigate to the home page after signing in
  } catch (error) {
    console.log(error);
  }
};
