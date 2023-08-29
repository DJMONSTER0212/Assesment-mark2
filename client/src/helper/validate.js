// username validation
import toast from "react-hot-toast";
import {authenticate} from './helper'

// validate login page username

export async function usernameValidate(values){
    const errors = usernameVerify({},values);
    if(values.username){
        const {status} = await authenticate(values.username);

        if(status!==200){
            errors.exist = toast.error('User Does not exist...!');
        }
        // console.log(status)
    }
    return errors;
}

function usernameVerify(error = {},values){
    if(!values.username){
        error.username = toast.error("Username is Required...!");
    }else if(values.username.includes(" ")){
        error.username = toast.error("Invalid Username...!");
    }

    return error;
}

// validate password
export async function passwordValidate(values){
    const errors = passwordVerify({},values);
    return errors; 
}


function passwordVerify(errors={},values){
    const specialCharacters = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if(!values.password){
        errors.password = toast.error("Password is Required..!")
    }
    else if(values.password.includes(" ")){
        errors.password = toast.error("Wrong Password...!");
    }
    else if(values.password.length<4){
        errors.password = toast.error("Password length must be greater than 4 characters");   
    }
    else if(!specialCharacters.test(values.password)){
        errors.password = toast.error("Password Must have Special Characters"); 
    }
    return errors
}


export async function resetPasswordValidation(values){
    const errors = passwordVerify({}, values);
    if(values.password!==values.confirm_pwd){
        errors.exist = toast.error("Password Not match..!")
    }
    return errors;
}


export async function registerValidation(values){
    const errors = usernameVerify({},values);
    passwordVerify(errors,values);
    emailVerify(errors,values);
    return errors;
}

function emailVerify(error = {},values){
    if(!values.email){
        error.email = toast.error("Email is Required...!");
    }
    else if(values.email.includes(" ")){
        error.email = toast.error("Invalid Email...!")
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        error.email = toast.error("Invalid email address...!");
    }
    return error;
}

export async function profileValidation(values) {
    const errors = emailVerify({}, values);
    return errors;
}
