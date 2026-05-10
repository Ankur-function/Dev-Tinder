import validator from "validator"

export const validation = (data) => {

    const {firstName,lastName,email,password} = data;

    if (firstName.length<4 || lastName.length<2) {
        throw new Error("firstName or lastName is not valid");
    }
    if(!validator.isEmail(email)){
        throw new Error("Invalid Email address:",email);
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error('Please put strong password')
    }
}

export const editValidation = (data) => {

    const allowedEditFields = ['firstName','lastName','age','gender','photoUrl','about','skills']
    let isAllowed = true
    Object.keys(data).forEach((field)=>{if (!allowedEditFields.includes(field)) {
        isAllowed =  false;
    }})
    console.log('isAllowed----',isAllowed);
    
    return isAllowed
}
