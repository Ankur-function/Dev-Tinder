import express from 'express'
import { reviewConnection, sendConnection } from '../controllers/connectionController.js';
import userAuth from '../middleware/userAuth.js';

const requestRouter = express.Router();

requestRouter.post('/send/:status/:receiverId',userAuth,sendConnection);
requestRouter.patch('/review/:status/:requestId',userAuth,reviewConnection)

export default requestRouter;