import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import {validation} from '../utils/validation.js'


export const signUp = async(req,res)=>{
    try {
        const body = req.body;
        
        validation(body);
        const {firstName,lastName,email,password} = body;

        const hashPassword = await bcrypt.hash(password,10);
        const user = new User({
            firstName,
            lastName,
            email,
            password:hashPassword
        });
        const userCreated = user.save();

        res.send(userCreated)
    } catch (error) {
       res.status(400).send('ERROR:',error.message)
    }
}

export const signIn = async(req,res)=>{
    try { 
        const {email,password} = req.body;
        const user = await User.findOne({email:email});
        if (!user) {
            throw new Error('Invalid Credentials')
        }
        const validPassword = await bcrypt.compare(password,user.password);
        if (!validPassword) {
            throw new Error('Invalid Credentials')
        }
        const token = jwt.sign({userId:user._id},'Ankur_Raj123',{ expiresIn: '1h' });
        res.cookie("token",token) // token banane ke baad usko cookie me wrap kar ke hi bejhta hai server browser(client) ko..... and cookie browser me hi store hoti hai
        res.status(200).send(user)
        
    } catch (error) {
        res.status(400).send(`ERROR: ${error.message}`)
    }
}

export const signOut = async(req,res)=> {
    try {
       res.clearCookie("token");
        res.status(200).send('Logout Successful')
    } catch (error) {
        res.status(500).send('Error during log out')
    }
}