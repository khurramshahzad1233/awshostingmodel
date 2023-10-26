import mongoose from "mongoose";
const kittySchema=new mongoose.Schema({
    videourl:{
        type:String,
        required:[true,"please enter url of saving video"],
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"

    },
    createdAt:{
        type:Date,
        default:Date.now,
    }

})
const videodata=mongoose.model("video",kittySchema);
export default videodata;