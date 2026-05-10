import mongoose from "mongoose";
import User from "./userModel.js";

const connectionRequestSchema =  new mongoose.Schema({
    senderUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    },
    receiverUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    },
    status:{
        type:String,
        enum:{
            values:['ignored','interested','accepted','rejected'],
            message:'{VALUE} is not a valid status'
        },
        required:true
    }
},{timestamps:true});

connectionRequestSchema.index({senderUserId:1,receiverUserId:1});//creating an index for making connection query fast
const ConnectionRequest = mongoose.model('ConnectionRequest',connectionRequestSchema);

export default ConnectionRequest