import mongoose from "mongoose";
import validator from "validator"
const userSchema = new mongoose.Schema({

    firstName:{
        type:String,
        required: true,
        minLength: 4
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required: true,
        unique: true,
        lowerCase: true,
        trim: true,
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email Address: " + value)
            }
        }
    },
    password:{
        type:String,
        required: true,
        validate(value){
            if (!validator.isStrongPassword(value)) {
                throw new Error("Enter a Strong Password: " + value)
            }
        }
    },
    age:{
        type:Number,
        min: 18
    },
    gender:{
        type:String,
        validate(value){ // we can add validation function too in schema
            if (!["male","female","others"].includes(value.toLowerCase())) {
                throw new Error("Gender data is not valid");
            }
        }
    },
    photoUrl: {
        type:String,
        validate(value){
            if (!validator.isURL(value)) {
                throw new Error("Invalid Photo Url: " + value)
            }
        }
    },
    about:{
        type:String,
        default: "This is the default about of the user"
    },
    skills:{
        type:[String]
    }
},{timestamps: true});

const User = mongoose.model('User',userSchema);

export default User;