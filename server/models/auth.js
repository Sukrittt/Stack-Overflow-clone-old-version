import mongoose from "mongoose";

// Schema for user's authentication
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  about: { type: String },
  tags: { type: [String] }, // Will contain an array of strings
  joinedOn: { type: Date, default: Date.now }, // Date.now - The database will autofill the time
});

export default mongoose.model("User", userSchema);
