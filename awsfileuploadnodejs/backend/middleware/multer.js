import multer from "multer";
import multerS3 from "multer-s3"
import {S3Client} from "@aws-sdk/client-s3";

const client = new S3Client({
    region:"eu-north-1",
    credentials:{
        accessKeyId:process.env.accessKeyId,
        secretAccessKey:process.env.secretAccessKey
    }
});
const upload=multer({
    storage:multerS3({
        s3:client,
        bucket:process.env.bucket,
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