import express from 'express';
import 'dotenv/config';
import connectDB from './config/database.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRoute.js';
import profileRouter from './routes/profileRouter.js';
import connectionRouter from './routes/connectionRouter.js';
import userRouter from './routes/userRouter.js';
import cors from 'cors'
import paymentRouter from './routes/paymentRoute.js';
import http, { createServer } from 'http'
import initializeSocket from './utils/socket.js';
import chatRouter from './routes/chatRoute.js';
const app = express();



app.use(cors({
    // origin:"http://localhost:5173", // when running locally
    origin:"https://dev-tinder-fe-six.vercel.app", // when running live
    credentials:true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"] // 👈 Explicit declaration for Live servers is mandatory
}));

// 2. Custom Safe Preflight Interceptor (Bypasses Express 5 string matching bugs)
app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200); // Instantly reply 200 OK to the browser's preflight knock
    }
    next();
});

app.use(express.json());
app.use(cookieParser())

app.use('/',authRouter);
app.use('/profile',profileRouter)
app.use('/connection',connectionRouter)
app.use('/user',userRouter)
app.use('/payment',paymentRouter)
app.use('/chat',chatRouter)

const httpServer = http.createServer(app);

initializeSocket(httpServer);

const PORT = process.env.PORT || 3000;

connectDB().then(()=>{
    console.log('Database Connection Successfull....');
    httpServer.listen(PORT,()=>{
    console.log(`app is listening on port ${PORT}`);
})
    
})
.catch((error)=>{
console.error('Database connection failed:', error);

})

