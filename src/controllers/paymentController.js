import Payment from "../models/paymentModel.js";
import User from "../models/userModel.js";
import { membershipAmount } from "../utils/constants.js";
import paymentInstance from "../utils/razorpay.js" 
import  validateWebhookSignature  from "razorpay/dist/utils/razorpay-utils.js";
// const {validateWebhookSignature} = require('razorpay/dist/utils/razorpay-utils')

export const createOrder = async(req,res) =>{
    try {
        console.log(req.body);
        
        const {membershipType} = req.body;
        console.log(membershipAmount[membershipType]);
        
        const {_id,firstName,lastName,email} = req.user;
        const order = await paymentInstance.orders.create({
            "amount": membershipAmount[membershipType] * 100,
            "currency": "INR",
            "receipt": "receipt#2",
            "notes": {
                firstName,
                lastName,
                email,
                "membershipType":membershipType
            }
        });
        const payment = {
            userId: _id,
            orderId: order.id,
            status: order.status,
            currency: order.currency,
            notes: order.notes,
            amount: order.amount,
            receipt: order.receipt

        }
        const savedPayment = await new Payment(payment).save();
        res.status(201).json({message:'order created successfully',data:savedPayment,keyId:process.env.RAZORPAY_KEY_ID})
    } catch (error) {
        console.log(error);
        
        res.status(500).json({error:error.message});
    }
}

export const paymentWebhook = async(req,res) => {
    try {
        console.log('Webhook called===========>>>>>>>>>>>>');
        
        const webhookSignature = req.headers['X-Razorpay-Signature'];
       const isWebhookValid = validateWebhookSignature(JSON.stringify(req.body), webhookSignature, process.env.RAZORPAY_WEBHOOK_SECRET)
       if (!isWebhookValid) {
            res.status(400).json({message: 'Webhook Signature is not valid'})
       }

       // Update my payment status in DB
       const paymentDetails = req.body.payload.payment.entity;

       const payment = await Payment.findOne({orderId:paymentDetails.order_id});
       payment.status = paymentDetails.status;
       await payment.save();

       // Update the user status as premium
       const user = await User.findOne({_id:payment.userId});
       user.isPremium = true
       user.membershipType = payment.notes.membershipType;
       await user.save();

    //    if (req.body.event == 'payment.captured') {
        
    //    }

    //    if(req.body.event == 'payment.failed') {

    //    }

       // return success response to razorpay
       return res.status(200).json({message:"Webhook received successfully"});

    } catch (error) {
        res.status(500).json({error:error.message});
    }
}