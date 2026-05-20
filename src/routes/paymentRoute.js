import express from 'express';
import { createOrder, isPremiumUser, paymentWebhook } from '../controllers/paymentController.js';
import userAuth from '../middleware/userAuth.js';

const paymentRouter = express.Router();

paymentRouter.post('/createOrder', userAuth, createOrder);
paymentRouter.post('/webhook',paymentWebhook);
paymentRouter.get('/premium/verify', userAuth, isPremiumUser)

export default paymentRouter