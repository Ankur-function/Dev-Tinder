import User from "../models/userModel.js";
import { editValidation } from "../utils/validation.js";
import bcrypt from 'bcrypt'

export const getProfile = async(req,res)=>{
    try {
        const user = req.user;
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(`Error: ${error.message}`)
    }
}

export const updateProfile = async(req,res) =>{
    try{
        if(!editValidation(req.body)) {
            throw new Error("Invalid Edit Data Input");
        }
        const user = req.user;
        Object.keys(req.body).forEach((field)=>{
            user[field] = req.body[field]
        })
        const update = await user.save();
        res.status(200).json({message:'updated successfully',data:update});
    }catch(error){
        res.status(500).send(`Error: ${error}`)
    }

}

export const changeProfilePassword = async(req,res) =>{

    try{
    const {oldPassword,newPassword} = req.body;
    const user = req.user;
    const isValid = await bcrypt.compare(oldPassword,user.password);
    if (!isValid) {
        throw new Error('Wrong Old Password')
    }
    const hashPassword = await bcrypt.hash(newPassword,10);
    user.password = hashPassword;
    user.save();
    res.clearCookie("token");
    res.status(200).send('Password Changed Successfull')
    }catch(error){
        res.status(500).send(`Error: ${error}`)
    }

}