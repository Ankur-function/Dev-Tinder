import express from 'express';
import connectDB from './config/database.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRoute.js';
import profileRouter from './routes/profileRouter.js';
import connectionRouter from './routes/connectionRouter.js';
import userRouter from './routes/userRouter.js';

const app = express();
app.use(express.json());
app.use(cookieParser())

app.use('/',authRouter);
app.use('/profile',profileRouter)
app.use('/connection',connectionRouter)
app.use('/user',userRouter)



connectDB().then(()=>{
    console.log('Database Connection Successfull....');
    app.listen(3000,()=>{
    console.log('app is listening on port 3000');
})
    
})
.catch((error)=>{
console.error('Database Connection cannot be estabished');

})

