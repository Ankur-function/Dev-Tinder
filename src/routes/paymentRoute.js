import express from 'express';
import { createOrder, paymentWebhook } from '../controllers/paymentController.js';
import userAuth from '../middleware/userAuth.js';

const paymentRouter = express.Router();

paymentRouter.post('/createOrder', userAuth, createOrder);
paymentRouter.post('/webhook',paymentWebhook)

export default paymentRouter