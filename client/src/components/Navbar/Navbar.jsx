//Dependencies
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import decode from "jwt-decode";
//css
import "./Navbar.css";

//assets
import logo from "../../assets/stackOverFlow_image.jpg";
import search from "../../assets/search-icon.svg";

//redux
import { useSelector, useDispatch } from "react-redux";

//components
import Avatar from "../Avatar/Avatar";

//actions
import { setCurrentUser } from "../../actions/currentUser";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let User = useSelector((state) => state.currentUserReducer); //Selects the state of currentUserReducer where the data of user is stored

  //logout
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/"); //to navigate to home page if user has logged out in any other page
    dispatch(setCurrentUser(null));
  };

  //Whenever the dispatch changes/occur it will send data to the function 'setCurrentUser'
  useEffect(() => {
    const token = User?.token; //jwt token of the user
    if (token) {
      const decodedToken = decode(token); // to decode the token
      //if current time has exceeded the expiry time then log out the user automatically
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
  }, [dispatch]);

  return (
    <nav className="main-nav">
      <div className="navbar">
        <Link to="/" className="nav-btn">
          <img src={logo} alt="home logo" />
        </Link>
        <Link to="/" className="nav-item nav-btn">
          About
        </Link>
        <Link to="/" className="nav-item nav-btn">
          Products
        </Link>
        <Link to="/" className="nav-item nav-btn">
          For Teams
        </Link>
        <form>
          <input type="text" placeholder="Search..." />
          <img
            src={search}
            alt="search-icon"
            width="18"
            className="search-icon"
          />
        </form>
        {User === null ? (
          <Link to="/auth" className="nav-item nav-links">
            Log in
          </Link>
        ) : (
          <>
            <Link
              to={`/user/${User.result._id}`}
              style={{ textDecoration: "none", color: "white" }}
            >
              <Avatar
                backgroundColor="#009dff"
                px="10px"
                py="7px"
                color="white"
                borderRadius="50%"
              >
                {User.result.name.charAt(0).toUpperCase()}
              </Avatar>
            </Link>
            <button
              className="nav-item nav-links"
              onClick={handleLogout}
              style={{ marginLeft: "10px" }}
            >
              Log out
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
