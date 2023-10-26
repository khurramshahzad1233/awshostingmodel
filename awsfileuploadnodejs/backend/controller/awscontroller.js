import catchasyncerror from "../middleware/catchasyncerror.js";
import Errorhandler from "../utils/errorhandler.js";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner"
import dotenv from "dotenv"
import videodata from "../models/videoschema.js";
import userdata from "../models/userschema.js";
if(process.env.NODE_ENV!=="PRODUCTION"){
    dotenv.config({path:"backend/config.env"})
};

const client = new S3Client({
    region:process.env.region,
    credentials:{
        accessKeyId:process.env.accessKeyId,
        secretAccessKey:process.env.secretAccessKey,
    }
});


export const getfilecontroller=catchasyncerror(async(req,res,next)=>{
    const videourldata=await videodata.find({})
    if(videourldata.length===0){
        return res.status(200).json({
            success:true,
            message:"no files found"
        })
    }
    const command=[]
    for(let i=0; i<videourldata.length; i++){
        command.push(videourldata[i].videourl)
    }

    const commandurl=[];
    
    for(let i=0; i<command.length; i++){
        const singleurl=decodeURIComponent(command[i]);
        commandurl.push(singleurl)
    }

    

    const urlArray=[];
    for(let i=0; i<commandurl.length; i++){
        const keyparts=commandurl[i].split("/");
        const userid=keyparts[4];
        const filename=keyparts[5];
        const command=new GetObjectCommand({
            Bucket:process.env.bucket,
            Key: `uploads/${userid}/${filename}`,

        });
        const url = await getSignedUrl(client, command);
        urlArray.push(url)
        

    }

      res.status(200).json({
        success:true,
        urlArray:urlArray
    })
});



export const uploadobjectcontroller=catchasyncerror(async(req,res,next)=>{
    // const userid=req.user.id;
   const fileUrls=req.files.map((file)=>file.location);
//    const user=await userdata.findById(req.user.id);
//    if(!user){
//     return next(new Errorhandler("Please login first to continue", 400))
//    };

 
    try {
        for(let i=0; i<fileUrls.length; i++){
            const video=await videodata.create({
                videourl:fileUrls[i],
                // userid:userid,
            })
            // user.videos.push(video._id);
            // await user.save()
            
        }
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"database not connected"
        })
        
    }
    

  res.status(200).json({
    success:true,
    fileUrls:fileUrls
  })


})


export const getobjectofusercontroller=catchasyncerror(async(req,res,next)=>{
    const user=await userdata.findById(req.user.id);
    if(!user){
        return next(new Errorhandler("please login to access the resource",400))
    };
    const videosarray=(await user.populate("videos")).videos;
    if(videosarray.length===0){
        return res.status(200).json({
            success:true,
            message:"no file found"
        })
    };
    let videourls=[]
    for(let i=0;i<videosarray.length;i++){
        const urlloc=decodeURIComponent(videosarray[i].videourl) 
        videourls.push(urlloc)
    }
    const urlArray=[];
    for(let i=0; i<videourls.length; i++){
        const keyparts=videourls[i].split("/");
        const userid=keyparts[4];
        const filename=keyparts[5];
        const command=new GetObjectCommand({
            Bucket:process.env.bucket,
            Key: `uploads/${userid}/${filename}`,

        });
        const url = await getSignedUrl(client, command);
        urlArray.push(url)
        

    }
    res.status(200).json({
        success:true,
        urlArray:urlArray
    })
})
