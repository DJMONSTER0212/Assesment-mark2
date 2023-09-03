import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Avatar from "../assets/profile.png"
import styles from '../styles/Username.module.css'
import toast,{ Toaster } from "react-hot-toast";
import { useFormik } from 'formik'; //validating the form data
import convertToBase64 from '../helper/convert';
import { profileValidation } from '../helper/validate';
import extend from "../styles/Profile.module.css";
import useFetch from '../hooks/fetch.hook';
import { useAuthStore } from '../store/store';
import { updateUser } from '../helper/helper';

const Profile = () => {
    const navigate = useNavigate();
    // const {username} = useA
    
    const [file, setFile] = useState();
    const [file2, setFile2] = useState();
    const [{ isLoading, apiData, serverError }] = useFetch();
    const formik = useFormik({
        initialValues: {
            firstName:apiData?.firstName||'',
            lastName:apiData?.lastName||'',
            email: apiData?.email||'',
            mobile: apiData?.mobile||'',
            address: apiData?.address||''
        },
        enableReinitialize: true,
        validate: profileValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            await fileUpload();
            values = await Object.assign(values, { profile: file2||file || '' });
            let updatePromise = updateUser(values)
            toast.promise(updatePromise,{
                loading:'Updating...',
                success: <b>Updated SuccessFully</b>,
                error: <b>Could not Update!</b>
            });
            // console.log(values)
        }
    })

    const fileUpload = async () => {
        const data = new FormData();
        data.append("file", file)
        data.append("upload_preset", "DJ_Monster")
        data.append("cloud_name", "dqdpzwcqp")

        await fetch("https://api.cloudinary.com/v1_1/dqdpzwcqp/image/upload", {
            method: "post",
            body: data
        })
            .then(async (res) => await res.json())
            .then(async (data) => { setFile2(data.url); console.log(data.url) })
            .catch((err) => {
                console.log(err)
            })
    }
    const onUpload = async e => {
        const base64 = await convertToBase64(e.target.files[0]);
        setFile(base64);
    }

    function userLogout(){
        localStorage.removeItem('token');
        navigate('/');
    }

    if (isLoading) return <h1 style={{ marginTop: "50px" }} className='text-2xl font-bold text-center'>isLoading</h1>
    if (serverError) return <h1 style={{ marginTop: "50px" }} className='text-xl text-center text-red-500'>{serverError.message}</h1>

    return (
        <div className='container mx-auto  '>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div className='flex justify-center  items-center h-screen '>
                <div className={`${styles.glass} ${extend.glass}`} style={{ width: "45%", height: "100%" }}>
                    <div className="title flex flex-col item-center">
                        <h4 className='text-5xl font-bold'>Profile</h4>
                        <h1 className='text-xl'>You can update the details.</h1>
                    </div>
                    <form className='py-1 ' onSubmit={formik.handleSubmit} >
                        <div className='profile flex justify-center py-4 '>
                            <label htmlFor="profile">
                                <img src={apiData?.profile||file || Avatar} className={`${styles.profile_img} ${extend.profile_img}`} alt="avatar" />
                            </label>
                            <input onChange={onUpload} type="file" id='profile' name='profile' />
                        </div>
                        <div className="textbox flex flex-col items-center gap-6">
                            <div className="name flex w-3/4 gap-10 ">
                                <input {...formik.getFieldProps('firstName')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='firstName*' />
                                <input {...formik.getFieldProps('lastName')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='lastName*' />
                            </div>
                            <div className="name flex w-3/4 gap-10 ">
                                <input {...formik.getFieldProps('mobile')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Mobile No.' />
                                <input {...formik.getFieldProps('email')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Email*' />
                            </div>
                            <div className="name flex w-3/4 gap-10 ">
                                <input {...formik.getFieldProps('address')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Address.' />
                                <button className={styles.btn} type='submit'>Update</button>
                            </div>
                        </div>
                        <div className="text-center py-4 ">
                            <span className='text-gray-500'>Come back Later? <Link onClick={userLogout} className='text-red-500' to='/'>Logout</Link></span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Profile
