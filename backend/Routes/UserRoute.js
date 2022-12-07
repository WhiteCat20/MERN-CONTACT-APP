import express from "express";
//controller functions
import {
  loginUser,
  signupUser,
  getUsers,
} from "../Controllers/UserController.js";

const router = express.Router();

//http://localhost:5000/api/user

//show all user route
router.get("/", getUsers);

//login route
router.post("/login", loginUser);

//signup route
router.post("/signup", signupUser);

export default router;
