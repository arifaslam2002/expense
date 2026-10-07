import bcrypt from "bcrypt";
import User from "../model/User.js";
import jwt from "jsonwebtoken"
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All Field are required",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password Must be at least 6 characters",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "this email is already registered ",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      message: "User Registered Successfully",
    });
  } catch (error) {
    console.log("Register Error", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "All Field are required",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "this email is not registered ",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "email or Password is incorrect",
      });
    }
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      },
    );
    res.status(201).json({
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Login Error", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};
