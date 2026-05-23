import express from "express";
import userAuth from "../middleware/userAuth.js";
import { getChatMessages } from "../controllers/chatController.js";

const chatRouter = express.Router();

chatRouter.get('/oldMessages/:targetUserId',userAuth,getChatMessages)

export default chatRouter;