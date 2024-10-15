import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // Hash the password using bcryptjs
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create a new user instance with the hashed password
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
    });

    // Save the user in the database
    await newUser.save();

    // Send a response
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: "Error creating user", error: error.message });
  }
};
