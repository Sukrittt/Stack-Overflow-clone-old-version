import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//redux
import { useDispatch } from "react-redux";
//css
import "./auth.css";
//assets
import icon from "../../assets/icon.png";
//component
import AboutAuth from "./AboutAuth";
//actions
import { signup, login } from "../../actions/auth";

const Auth = () => {
  // If isSignUp is true then it means user is in Sign Up page
  const [isSignUp, setIsSignUp] = useState(false);

  //useState hook to set the name, email and password in it.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch(); // To send an action to the redux store
  const navigate = useNavigate(); // To navigate to another page

  const handleSubmit = (e) => {
    e.preventDefault(); //To prevent the default state of submitting a form which is page refresh and url change
    if (!email || !password) {
      alert("Please enter email and password");
    }
    if (isSignUp) {
      if (!name) {
        alert("Please enter a name to continue");
      }
      dispatch(signup({ name, email, password }, navigate)); // sends data to the actions and stores it in the redux store
    } else {
      dispatch(login({ email, password }, navigate)); // sends data to the actions and stores it in the redux store
    }
  };

  return (
    <section className="auth-section">
      {isSignUp && <AboutAuth />}
      <div className="auth-container-2">
        {!isSignUp && (
          <img src={icon} className="login-logo" alt="stack-overflow-icon" />
        )}
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <label htmlFor="name">
              <h4>Display Name</h4>
              <input
                type="text"
                name="name"
                id="name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </label>
          )}
          <label htmlFor="email">
            <h4>Email</h4>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
          <label htmlFor="password">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4>Password</h4>
              {!isSignUp && (
                <p
                  style={{
                    color: "#007ac6",
                    fontSize: "14px",
                  }}
                >
                  forgot your password?
                </p>
              )}
            </div>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {isSignUp && (
              <p style={{ color: "#666767", fontSize: "14px" }}>
                Passwords must contain at least eight
                <br />
                characters including atleast 1 letter and 1<br />
                number.
              </p>
            )}
          </label>
          {isSignUp && (
            <label htmlFor="check">
              <input type="checkbox" name="checkbox" id="check" />
              <p style={{ fontSize: "14px" }}>
                Opt-in to receive occasional,
                <br /> product, updates, user research invitations,
                <br /> company announcements, and digests.
              </p>
            </label>
          )}
          <button type="submit" className="auth-btn">
            {isSignUp ? "Sign Up" : "Log In"}
          </button>
        </form>
        <p>
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <button
            type="button"
            className="handleSwitch"
            onClick={() => {
              setIsSignUp(!isSignUp);
            }}
          >
            {isSignUp ? "Log in" : "sign Up"}
          </button>
          {isSignUp && (
            <p style={{ color: "#666767", fontSize: "14px" }}>
              By clicking "Sign up", you agree to our{" "}
              <span style={{ color: "#007ac6" }}>
                terms of <br />
                service
              </span>
              , <span style={{ color: "#007ac6" }}>privacy policy</span> and
              <span style={{ color: "#007ac6" }}> cookie policy</span>
            </p>
          )}
        </p>
      </div>
    </section>
  );
};

export default Auth;
