import express from "express";
const router = express.Router();
import {registerUser} from "../controller/UserController.js";
import {loginUser} from "../controller/UserController.js";

// routing portion

// register
router.post('/register', registerUser);

// login
router.post('/login', loginUser);

export default router;