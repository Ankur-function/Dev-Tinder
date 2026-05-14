import express from 'express';
const userRouter = express.Router();
import userAuth from '../middleware/userAuth.js';
import { getConnectedRequests, getReceivedRequests, userFeed } from '../controllers/userController.js';

// to fetch all receieved requests of a loggedIn user
userRouter.get('/requests/received',userAuth,getReceivedRequests)
userRouter.get('/requests/connected',userAuth,getConnectedRequests)
userRouter.get('/feed',userAuth,userFeed)

export default userRouter;