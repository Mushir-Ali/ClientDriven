import express from "express";
const router = express.Router();
import {registerUser} from "../controller/UserController.js";
import {loginUser} from "../controller/UserController.js";
import {getUserProfile} from "../controller/UserController.js";
import {protect} from "../middlewares/authMiddlewares.js";


// routing portion

// register
router.post('/register', registerUser);

// login
router.post('/login', loginUser);

// profile
router.get('/profile',protect,getUserProfile);

export default router;