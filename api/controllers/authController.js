import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
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
    next(error);
    // Handle any errors
    // res.status(500).json({ message: "Error creating user", error: error.message });
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Find the user by email
    const validUser = await User.findOne({ email: email });
    if (!validUser) return next(errorHandler("User Not Found", 401));

    // Check if the password is valid
    const validPassword = await bcryptjs.compare(password, validUser.password);
    if (!validPassword)
      return next(errorHandler("Invalid email or password", 401));

    // Generate JWT token
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Destructure to exclude the password from the response
    const { password: pass, ...rest } = validUser._doc;

    // Set the token as an HTTP-only cookie and send response
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 3600000),
      })
      .status(200)
      .json({ message: "User logged in successfully", user: rest });  // Single json() call
  } catch (error) {
    next(error);
  }
};
