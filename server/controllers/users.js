import mongoose from "mongoose";
import users from "../models/auth.js";

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await users.find(); //get all the data from the database
    const allUserDetails = [];
    //looping through each element of allUsers
    // pusing an object for each user in 'allUserDetails'
    allUsers.forEach((user) => {
      allUserDetails.push({
        _id: user._id,
        about: user.about,
        name: user.name,
        tags: user.tags,
        joinedOn: user.joinedOn,
      });
    });
    res.status(200).json(allUserDetails);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  const { id: _id } = req.params; //to get the id in the url
  const { name, about, tags } = req.body;

  //checking if the id is a valid id or not
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("User is unavailable");
  }
  try {
    /*Finding the user with that specific id and then updating it in the database.
      Using the '$set' property to re-assign name, about and tags recieved from the frontend.
      'new:true' is used to indicate that the updated profile has to be sent as a response.
      If it is not mentioned then it will send the record before updating the profile.
      Note: The database will be updated but the response will be containing old details
            if it is not mentioned.
    */
    const updatedProfile = await users.findByIdAndUpdate(
      _id,
      {
        $set: { name: name, about: about, tags: tags },
      },
      { new: true }
    );
    res.status(200).json(updatedProfile); //send updated profile to the frontend
  } catch (error) {
    res.status(405).json({ message: error.message });
  }
};
