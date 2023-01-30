import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
//css
import "./UserProfile.css";
//components
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import Avatar from "../../components/Avatar/Avatar";
import EditProfileForm from "./EditProfileForm";
import ProfileBio from "./ProfileBio";
//assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake, faPen } from "@fortawesome/free-solid-svg-icons";

const UserProfile = () => {
  const { id } = useParams();
  const users = useSelector((state) => state.userReducer);
  //will filter out all other other id except the one that matches the url's id
  // the profile which is clicked and select the 1st element as there will only be 1 element
  const currentProfile = users.filter((user) => user._id === id)[0]; // the profile which is clicked
  const currentUser = useSelector((state) => state.currentUserReducer); // the profile which is logged in
  // console.log(currentProfile);
  //edit profile useState
  const [editswitch, setEditSwitch] = useState(false);
  return (
    <div className="home-container-1">
      <LeftSideBar />
      <div className="home-container-2">
        <section>
          <div className="user-details-container">
            <div className="user-details">
              <Avatar
                backgroundColor="purple"
                color="white"
                fontSize="50px"
                px="40px"
                py="30px"
              >
                {currentProfile?.name.charAt(0).toUpperCase()}
              </Avatar>
              <div className="user-name">
                <h1>{currentProfile?.name}</h1>
                <p>
                  <FontAwesomeIcon icon={faBirthdayCake} /> Joined{" "}
                  {moment(currentProfile?.joinedOn).fromNow()}
                </p>
              </div>
            </div>
            {/*Edit profile button will be available only when the currentUser's id matches the id which is in the url */}
            {/*CurrentUser is the user which is being displayed on the page*/}
            {currentUser?.result._id === id && (
              <button
                type="button"
                onClick={() => setEditSwitch(true)}
                className="edit-profile-btn"
              >
                <FontAwesomeIcon icon={faPen} /> Edit Profile
              </button>
            )}
          </div>
          <>
            {editswitch ? (
              <EditProfileForm
                currentUser={currentUser}
                setEditswitch={setEditSwitch}
              /> //Only the user logged in can edit the profile
            ) : (
              <ProfileBio currentProfile={currentProfile} />
            )}
          </>
        </section>
      </div>
    </div>
  );
};

export default UserProfile;
