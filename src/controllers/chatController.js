import Chat from "../models/chatModel.js";

export const getChatMessages = async(req,res) =>{
    try {
        const targetUserId = req.params.targetUserId;
        const userId = req.user._id;
        let isChatExist = await Chat.findOne({participants:{$all:[userId,targetUserId]}}).populate('messages.senderUserId',['firstName','lastName']);
        if (!isChatExist) {
        isChatExist = await Chat.create({
                participants:[userId,targetUserId],
                messages:[]
            })
        }
        return res.status(200).json({message:'old chats fetched successfully', data:isChatExist});
    } catch (error) {
        console.log(error);
    }
}