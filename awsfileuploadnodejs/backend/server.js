import app from "./app.js"
import mongoose from "mongoose"
import dotenv from "dotenv"

if(process.env.NODE_ENV!=="PRODUCTION"){
    dotenv.config({path:"backend/config.env"})
};

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb+srv://khurram002300:bloodyhell575@cluster0.ho8coqb.mongodb.net/aws?retryWrites=true&w=majority");
  console.log("connected to database")

  
}



app.listen(5000,()=>{
    console.log(`server is running on port 5000`)
})