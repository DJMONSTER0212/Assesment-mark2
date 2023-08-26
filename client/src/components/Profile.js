import React, { useState } from 'react'
import { Link } from "react-router-dom"
import Avatar from "../assets/profile.png"
import styles from '../styles/Username.module.css'
import { Toaster } from "react-hot-toast";
import { useFormik } from 'formik'; //validating the form data
import convertToBase64 from '../helper/convert';
import { profileValidation } from '../helper/validate';
import extend from "../styles/Profile.module.css";

const Profile = () => {

    const [file, setFile] = useState();

    const formik = useFormik({
        initialValues: {
            firstName:'',
            lastName:'',
            email: '',
            mobile: '',
            address: ''
        },
        validate: profileValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            values = await Object.assign(values, { profile: file || '' });
            console.log(values)
        }
    })

    const onUpload = async e => {
        const base64 = await convertToBase64(e.target.files[0]);
        setFile(base64);
    }


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
                                <img src={file || Avatar} className={`${styles.profile_img} ${extend.profile_img}`} alt="avatar" />
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
                                <button className={styles.btn} type='submit'>Register</button>
                            </div>
                        </div>
                        <div className="text-center py-4 ">
                            <span className='text-gray-500'>Come back Later? <Link className='text-red-500' to='/'>Logout</Link></span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Profile
