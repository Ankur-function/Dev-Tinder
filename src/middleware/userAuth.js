import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const userAuth = async (req,res,next) => {
    try{
        const {token} = req.cookies;     
        if (!token) {
           return res.status(401).send('You are Logged out, Please Login!')
        }
        const decodedObj = jwt.verify(token,process.env.JWT_SECRET);
        
        const user = await User.findById({_id:decodedObj.userId});
        if (user) {
            req.user = user;
            next()
        }else{
            throw new Error('User not found')
        }
    }catch(error){
        res.status(400).send(`Error: ${error}`)
    }
}

export default userAuth