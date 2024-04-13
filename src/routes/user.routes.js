import { Router } from "express";
import { loginUser, logoutUser, registerUser, refreshAccessToken } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
    // upload is the name of the method in multer
    upload.fields([
        {
            name: "avatar",          // the front end should also be same 
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
);

router.route("/login").post(loginUser);

// secured routes
// added verifyJWT middleware
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken)
// basically, when access token has expired then a 401 request will go to the user and will tell to start session again or do login again, but we can give frontend developer this end-point so that he can make a call to this end point and generate a new access token as well as a refresh Token if it is also expired.

export default router;

