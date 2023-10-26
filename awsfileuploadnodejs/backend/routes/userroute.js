
import express from "express"
import { getprofilecontroller, googleregistercontroller, loginusercontroller, logoutusercontroller, registerusercontroller} from "../controller/usercontroller.js";
import {authuser} from "../middleware/auth.js"


const router=express.Router();
router.route("/user/register").post(registerusercontroller);
router.route("/user/login").post(loginusercontroller);
router.route("/user/logout").get(logoutusercontroller);
router.route("/user/me").get(authuser,getprofilecontroller);
router.route("/google/new").post(googleregistercontroller);





export default router  ;