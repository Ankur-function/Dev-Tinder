import ConnectionRequest from "../models/connectionRequestModel.js";
import User from "../models/userModel.js";

export const sendConnection = async(req,res)=>{
    try{
        const receiverUserId = req.params.receiverId
        const status = req.params.status
        const allowedStatus = ['interested','ignored'];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({message:'Invalid Status'});
        }
        const senderUserId = req.user._id;
        const isValidReceiver = await User.findById(receiverUserId);
        if (!isValidReceiver) {
            return res.status(400).json({message:'You are sending request to invalid user'});
        }
        if (receiverUserId.toString() === senderUserId.toString()) {
            throw new Error("You can not send request to yourself");
        }
        const inValidRequest = await ConnectionRequest.findOne({$or:[{senderUserId,receiverUserId},{senderUserId:receiverUserId,receiverUserId:senderUserId}]});
        if (inValidRequest) {
            return res.status(400).json({message:'Connection Request Already Exists!'})
        }
        const obj = {
            senderUserId,
            receiverUserId,
            status
        }
        const connectionCreated = await new ConnectionRequest(obj).save();
        res.json({message:'Connection Request Sent Successfully',data:connectionCreated});
    }catch(error){
        res.status(500).send(`Error: ${error.message}`)
    }
}

export const reviewConnection = async(req,res) =>{

    try {
        const {status,requestId} = req.params
        const userId = req.user._id

        const allowedStatus = ['accepted','rejected'];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({message:'Invalid Status'})
        }
        const connectionRequestData = await ConnectionRequest.findOne({_id:requestId,receiverUserId:userId,status:"interested"});
        if (!connectionRequestData) {
            return res.status(404).json({message:'Connection Not Found'})
        }
        connectionRequestData.status = status;
        const result = await ConnectionRequest(connectionRequestData).save();
        res.status(200).json({message:`Connection Request ${status}`,data:result})
    } catch (error) {
        res.status(500).json({error:error.message});
    }


}