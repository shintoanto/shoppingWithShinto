import express from 'express';
import { loginUser, registerUser } from '../controller/authControllers.js';

const router = express.Router();


router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

console.log("/login/");

export default router;

