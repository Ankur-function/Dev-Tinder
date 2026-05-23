import {Server} from 'socket.io';
import Chat from '../models/chatModel.js';
import ConnectionRequest from '../models/connectionRequestModel.js';

const initializeSocket = (httpServer) => {

const io = new Server(httpServer,{
    cors:{
        origin:"http://localhost:5173"
    }
});

io.on("connection",(socket)=>{  
    //Handle Events
    socket.on("joinChat",({userId,targetUserId})=>{{
        const roomId = [userId,targetUserId].sort().join('_');
        socket.join(roomId);// connection is established in a room here
    }});
    
    socket.on("sendMessage", async({newMessage,firstName,userId,targetUserId})=>{
        try {
         const roomId = [userId,targetUserId].sort().join('_');// make it more complex using crypto so that no hacker can hack it.

         // add a check here i.e. userId and targetUserId should be friends. like we can do this via checking inside connectionsrequests collection.
         const isAcceptedConnection = await ConnectionRequest.find({$or:[{senderUserId:userId,receiverUserId:targetUserId,status:'accepted'},{receiverUserId:userId,senderUserId:targetUserId,status:'accepted'}]})
         if (!isAcceptedConnection) {
            return res.status(400).json({message:'Invalid user is trying to send message'})
         }
         
        const isChatExist = await Chat.findOne({participants:{$all:[userId,targetUserId]}});

        if (!isChatExist) {
           isChatExist =  new Chat({
                participants:[userId,targetUserId],
                messages:[]
            })
        }
        isChatExist.messages.push({
                    senderUserId:userId,
                    message:newMessage
                })

        await isChatExist.save();
        io.to(roomId).emit('messageReceived',{firstName,newMessage,senderId:userId})
        } catch (error) {
            console.log(error)
        }

    });
    socket.on("disconnect",()=>{});
});

}

export default initializeSocket