import catchasyncerror from "../middleware/catchasyncerror.js";
import Errorhandler from "../utils/errorhandler.js";
import userdata from "../models/userschema.js";
import dotenv from "dotenv"
import sendtoken from "../utils/sendtoken.js";
import jwt_decode from "jwt-decode";
if(process.env.NODE_ENV!=="PRODUCTION"){
    dotenv.config({path:"backend/config.env"})
};


            
export const registerusercontroller=catchasyncerror(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email ||!password){
        return next(new Errorhandler("please enter all fields",400))
    };
    let user=await userdata.findOne({email});
    if(user){
        return next(new Errorhandler("user already exist", 409))
    };
    user=await userdata.create({
        email,password
    })
    sendtoken(res,user,201,"register user successfully")
    

    
});


export const loginusercontroller=catchasyncerror(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email ||!password){
        return next(new Errorhandler("please enter all fields",400))
    };
    const user=await userdata.findOne({email}).select("+password");
    if(!user){
        return next(new Errorhandler("incorrect email",401))
    };
    const matchpassword=await user.comparepassword(password);
    
    if(!matchpassword){
        return next(new Errorhandler("incorrect password",401))
    };
    sendtoken(res,user,200,"welcome back")
});


export const logoutusercontroller=catchasyncerror(async(req,res,next)=>{
    res.status(200).cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
        secure:true,
        sameSite:"none"
    }).json({
        success:true,
        message:"logout successfully"
    })
})


export const getprofilecontroller=catchasyncerror(async(req,res,next)=>{
    const user=await userdata.findById(req.user.id);
    if(!user){
        return next(new Errorhandler("please login to access the resource",401))
    };
    res.status(200).json({
        success:true,
        user,
    })
});



// google authentication controller

export const googleregistercontroller=catchasyncerror(async(req,res,next)=>{
    const {token}=req.body;
    
    if(!token){
        return next(new Errorhandler("require field are missing",400))
    };
    const userinfo=jwt_decode(token);
    const loginBy="google"

    const {email,name,picture}=userinfo;
    let user=await userdata.findOne({email});
    if(!user){
        user=await userdata.create({
            email,name,picture,loginBy,
        });
    };
    sendtoken(res,user,201,"register user successfully")

});
