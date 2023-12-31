import axios from "axios";
import jwt_decode from "jwt-decode";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

export const authenticate = async(username)=>{
    try {
        return await axios.post('/api/auth/authenticate',{username})
    } catch (error) {
        return {error:"Username doesn't exist...!"};
    }
}

export const getUsername = async()=>{
    const token = localStorage.getItem('token')
    if(!token) return Promise.reject("Cannot find token");

    let decode = jwt_decode(token);
    // console.log(decode);
    return decode;
}

export const getUser = async({username})=>{
    try {
        const {data}= await axios.get(`/api/user/${username}`)
        return data;

    } catch (error) {
        return {error : "UserName Doesn't match...!"}
    }
}

export const registerUser = async (credentials)=>{
    try {
        const {data:{msg},status} =await axios.post('/api/user/register',credentials)
        let {username,email} = credentials;

        if(status===201){
            await axios.post('/api/user/registerMail',{username,userEmail:email,text:msg})
        }
        return Promise.resolve(msg);

    } catch (error) {
        return Promise.reject({error})
    }
}

export const verifyPassword = async({username,password})=>{
    try {
        if(username&&password){
            const {data} = await axios.post('/api/auth/login',{username,password})

            return Promise.resolve({data});
        }
    } catch (error) {
        return Promise.reject({error:"Password doesn't match"})
    }
}

export const updateUser = async (response)=>{
    try {
        const token = await localStorage.getItem('token');
        const data = await axios.put('/api/user/updateuser',response,{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        });
        return Promise.resolve({data});
    } catch (error) {
        return Promise.reject({error: "Couldn't Update Profile ...!"})
    }
}

export const generateOTP = async (username)=>{
    try {
        const {data:{code},status} = await axios.get('/api/otp/generateOTP',{params:{username}})

        if(status===201){
            let data = await getUser({username})
            // console.log(email)
            // console.log(data.email)
            let text = `Your Password recovery OTP is ${code}.Verify and Recover your password`;
            await axios.post('/api/user/registerMail',{username,userEmail : data.email, text,subject:"Password Recovery OTP"})
        }
        // console.log()
        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({error})
    }
}

export const verifyOTP = async ({username,code})=>{
    try {
    const {data,status}= await axios.get('/api/otp/verifyOTP',{params:{username,code}})
    return {data,status};

    } catch (error) {
        return Promise.reject({error})
    }
}

export const resetPassword = async ({username,password})=>{
    try {
        const { data, status } = await axios.put('/api/user/resetPassword',{username,password});
        // console.log(Promise.resolve({ data, status }));
        
        return Promise.resolve({data,status})
    } catch (error) {
        return Promise.reject({ error })
    }
}

export const createTask = async ({username,title,description,priority})=>{
    try {
        const {data,status} = await axios.post('/api/task/create',{username,title,description,priority});
        return Promise.resolve({status});
    } catch (error) {
        return Promise.reject({error});
    }
}

export const getAllTasks = async(username)=>{
    try {
        const {data} = await axios.get(`/api/task/${username}`,);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const deleteTask = async (id)=>{
    try {
        const {status} = await axios.delete(`/api/task/delete/${id}`);
        return status;
    } catch (error) {
        console.log(error);
    }
}

export const updateTask = async (id,body)=>{
    // console.log(id)
    try {
        const status = axios.put(`/api/task/update/${id}`,body)
        console.log(status)
        return status;
    } catch (error) {
        console.log(error)
    }
}

// // module = { resetPassword, verifyOTP, generateOTP, updateUser, verifyPassword, registerUser, getUser, authenticate }