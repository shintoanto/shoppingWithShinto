import express from 'express';
import { loginUser, logoutUser, registerUser , resetPassword as forgotPaswsword} from '../controller/authControllers.js';

const router = express.Router();


router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logoutUser);

router.route("/password/forgot").post(forgotPaswsword);

export default router;

