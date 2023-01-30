import React, { useState } from "react";
import { useDispatch } from "react-redux";

//actions
import { updateProfile } from "../../actions/users";

const EditProfileForm = ({ currentUser, setEditswitch }) => {
  const [name, setName] = useState(currentUser?.result?.name); //the default name will be the name entered at the time of signup
  const [about, setAbout] = useState(currentUser?.result?.about); //Will store the about text and send this to the backend server
  const [tags, setTags] = useState("");

  const dispatch = useDispatch();

  //updated userProfile submit
  const handleSubmit = (e) => {
    // e.preventdefault();
    if (tags.length === 0) {
      dispatch(
        updateProfile(currentUser?.result?._id, {
          name,
          about,
          tags: currentUser?.result?.tags,
        })
      );
    } else {
      dispatch(updateProfile(currentUser?.result?._id, { name, about, tags }));
    }
    setEditswitch(false); //revert back to display profile page
  };
  return (
    <div>
      <h1 className="edit-profile-title">Edit Your Profile</h1>
      <h1 className="edit-profile-title-2">Public information</h1>
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <label htmlFor="name">
          <h3>Display name</h3>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="about">
          <h3>About me</h3>
          <textarea
            id="about"
            cols="30"
            rows="10"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
        </label>
        <label htmlFor="tags">
          <h3>Watched Tags</h3>
          <p>Add Tags separated by a space</p>
          <input
            type="text"
            id="tags"
            onChange={(e) => setTags(e.target.value.split(" "))}
          />
        </label>
        <br />
        <input type="submit" value="Save Profile" className="user-submit-btn" />
        <button
          type="button"
          className="user-cancel-btn"
          onClick={() => setEditswitch(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditProfileForm;
