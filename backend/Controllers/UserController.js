import UserModel from "../Models/UserModel.js";
import jwt from "jsonwebtoken";

//method to generate token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

/*
  semua logic yang berkaitan dengan validasi, hashing password, authentikasi ditaruh di model
*/

//login user
export const loginUser = async (req, res) => {
  //grab the body of the request (login request)
  const { username, password } = req.body;

  try {
    const user = await UserModel.login(username, password);

    //create token here
    const token = createToken(user._id);

    res.status(200).json({ username, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//showing all signedup users
export const getUsers = async (req, res) => {
  const users = await UserModel.find();
  try {
    res.json(users);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//signup user
export const signupUser = async (req, res) => {
  //grab the body of the request
  const { username, password } = req.body;

  try {
    const user = await UserModel.signup(username, password);

    //create token here
    const token = createToken(user._id);

    res.status(200).json({ username, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
