import express from "express";

//controllers
import { signup, login } from "../controllers/auth.js";
import { getAllUsers, updateProfile } from "../controllers/users.js";

//middlewares
import auth from "../middlewares/auth.js";

const router = express.Router();

// Setting up functions for different paths importing from controllers
router.post("/signup", signup); // If request is a signup request
router.post("/login", login); // If request is a login request

//to get the names of all the user who have registered in the website
router.get("/getAllUsers", getAllUsers);

//to store user details
router.patch("/update/:id", auth, updateProfile); //will send a patch request to the databse to update the user details

export default router;
