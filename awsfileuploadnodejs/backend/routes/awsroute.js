import express from "express"
import { getfilecontroller,getobjectofusercontroller,uploadobjectcontroller } from "../controller/awscontroller.js";
import upload from "../middleware/multer.js";
import {authuser} from "../middleware/auth.js"
const router=express.Router()

router.route("/aws/getobject").get(getfilecontroller)
router.route("/aws/uploadfile").post(upload.array("files"), uploadobjectcontroller)
router.route("/aws/object/me").get(authuser,getobjectofusercontroller)


export default router;