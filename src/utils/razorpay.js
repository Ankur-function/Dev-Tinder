import Razorpay from "razorpay";

var paymentInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_API_SECRET ,
});

export default paymentInstance;