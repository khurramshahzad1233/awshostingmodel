import multer from "multer";
import multerS3 from "multer-s3"
import {S3Client} from "@aws-sdk/client-s3";
import dotenv from "dotenv"
if(process.env.NODE_ENV!=="PRODUCTION"){
    dotenv.config({path:"backend/config.env"})
};

const client = new S3Client({
    region:"eu-north-1",
    credentials:{
        accessKeyId:"AKIA6O5YTUFGQ5CUBLUP",
        secretAccessKey:"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"
    }
});
const upload=multer({
    storage:multerS3({
        s3:client,
        bucket:"awsbucket12341",
        metadata: function (req,file,cb) {
            cb(null, {fieldName:file.fieldname});
        },
        key:function(req,file,cb){
            // const userid=req.user.id
            // cb(null,`uploads/${userid}/`+Date.now().toString()+file.originalname)
            cb(null,`uploads/`+Date.now().toString()+file.originalname)
        }
    })
})

export default upload;