import ConnectionRequest from "../models/connectionRequestModel.js";
import User from "../models/userModel.js";

export const getReceivedRequests = async(req,res) => {
    try {
        const loggedInUser = req.user._id;
        const allReceivedRequests = await ConnectionRequest.find({receiverUserId:loggedInUser,status:'interested'}).populate('senderUserId',['firstName','lastName'])
        res.status(200).json({message:'Requests Fetched Successfully',data:allReceivedRequests})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export const getConnectedRequests = async(req,res)=>{
    try {
    const loggedInUser = req.user._id
    const connectedRequests = await ConnectionRequest.find({$or:[{senderUserId:loggedInUser,status:'accepted'},{receiverUserId:loggedInUser,status:'accepted'}]}).populate('senderUserId',['firstName','lastName']).populate('receiverUserId',['firstName','lastName']);
    const mappedResult = connectedRequests.map((request)=>{
        if(request.senderUserId._id.toString() === loggedInUser.toString()){
            return request.receiverUserId
        }
        return request.senderUserId
    })
    res.status(200).json({message:'Connected Requests Fetched Successfully',data:mappedResult});
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export const userFeed = async(req,res) =>{
    try {
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit>50 ? 50 : limit;
        const skip = (page-1)*limit;

        const hideUsers = new Set();
        const loggedInUser = req.user._id;
        const connectionData = await ConnectionRequest.find({$or:[{senderUserId:loggedInUser},{receiverUserId:loggedInUser}]});
        connectionData.forEach((connection)=>{
                hideUsers.add(connection.senderUserId);
                hideUsers.add(connection.receiverUserId)
        });
        hideUsers.add(loggedInUser); 
        const validUsers = await User.find({_id:{$nin:[...hideUsers]}}).select("firstName lastName").skip(skip).limit(limit)
        res.status(200).json({message:"feed fetched successfully",data:validUsers})

    } catch (error) {
        res.status(500).json({error:error.message})
    }
}