import React, { useState } from 'react'
import { Link,useNavigate } from "react-router-dom"
import Avatar from "../assets/profile.png"
import styles from '../styles/Username.module.css'
import toast ,{ Toaster } from "react-hot-toast";
import { useFormik } from 'formik'; //validating the form data
import convertToBase64 from '../helper/convert';
import { registerValidation } from '../helper/validate';
import { registerUser } from '../helper/helper';

const Register = () => {

    const navigate = useNavigate();

    const [file,setFile] = useState();
    const [file2,setFile2] = useState();
    let imgUrl = '';

    const fileUpload = async()=>{
        const data = new FormData();
        data.append("file",file)
        data.append("upload_preset","DJ_Monster")
        data.append("cloud_name","dqdpzwcqp")

        await fetch("https://api.cloudinary.com/v1_1/dqdpzwcqp/image/upload",{
            method:"post",
            body:data
        })
        .then(async(res)=> await res.json())
        .then(async (data)=>{ setFile2(data.url); console.log(data.url)})
        .catch((err)=>{
            console.log(err)
        })
    }
    const formik = useFormik({
        initialValues: {
            email:'',
            username:'',
            password: ''
        },
        validate: registerValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            await fileUpload();
            values = await Object.assign(values,{profile : file2||''});
            console.log(values)
            let registerPromise = registerUser(values);
            toast.promise(registerPromise,{
                loading:"Creating...",
                success: <b>Registered Successfully...!</b>,
                error:<b>Could Not register</b>
            });
            registerPromise.then(function(){navigate('/')});
        }
    })

    const onUpload = async e =>{
        const base64 = await convertToBase64(e.target.files[0]);
        setFile(base64);
    }


    return (
        <div className='container mx-auto  '>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div className='flex justify-center  items-center h-screen '>
                <div className={styles.glass} style={{width:"45%",height:"100%"}}>
                    <div className="title flex flex-col item-center">
                        <h4 className='text-5xl font-bold'>Register</h4>
                        <h1 className='text-xl'>Happy to join you!</h1>
                    </div>
                    <form className='py-1 ' onSubmit={formik.handleSubmit} >
                        <div className='profile flex justify-center py-4 '>
                            <label htmlFor="profile">
                                <img src={file||Avatar} className={styles.profile_img} alt="avatar" />
                            </label>
                            <input onChange={onUpload} type="file" id='profile' name='profile' />
                        </div>
                        <div className="textbox flex flex-col items-center gap-6">
                            <input {...formik.getFieldProps('email')} className={styles.textbox} type="text" placeholder='Email*' />
                            <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder='Username*' />
                            <input {...formik.getFieldProps('password')} className={styles.textbox} type="password" placeholder='Password*' />
                            <button className={styles.btn} type='submit'>Register</button>
                        </div>
                        <div className="text-center py-4 ">
                            <span className='text-gray-500'>Already Register? <Link className='text-red-500' to='/'>Login now</Link></span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
