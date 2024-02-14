import express from 'express';
import { loginUser, logoutUser, registerUser , resetPassword as forgotPaswsword, getUserDetails} from '../controller/authControllers.js';
import { isUserAuthentic } from '../middleware/authenticUser.js';

const router = express.Router();


router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logoutUser);

router.route("/password/forgot").post(forgotPaswsword);

router.route("/me").get(isUserAuthentic,getUserDetails);

export default router;

