import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/User.js";

// Generate JWT
const generateToken=(userId,role) =>{
  return jwt.sign(
    { id: userId, role }, 
    process.env.JWT_SECRET, 
    { expiresIn: process.env.JWT_EXPIRES || "7d" }
  );
};

// @desc    Register a new user
// @route   POST api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  try{
    const { name,email,password} = req.body;

    // check required fields
    if (!name || !email || !password) {
      return res.status(400).json({ message:"Name, email, and password are required"});
    }

    // check if user exists
    const existing = await User.findOne({ email });
    if(existing){
      return res.status(400).json({message:"User already exists"});
    }

    // validate password length
    if(password.length<6){
      return res.status(400).json({message:"Password must be at least 6 characters long"});
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user (role defaults to "USER" if not passed)
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "USER",
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token:generateToken(user._id, user.role),
    });
  }
  catch(error){
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email,password);
    // check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // match password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

