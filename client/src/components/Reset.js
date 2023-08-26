import React from 'react'
import { Link } from "react-router-dom"
import { useFormik } from 'formik';
import styles from '../styles/Username.module.css'
import { Toaster } from "react-hot-toast";
import {  resetPasswordValidation } from '../helper/validate';

const Reset = () => {

    const formik = useFormik({
        initialValues: {
            password: '',
            confirm_pwd:''
        },
        validate: resetPasswordValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            console.log(values)
        }
    });

    return (
        <div className='container mx-auto text-center'>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div className='flex justify-center items-center h-screen '>
                <div className={styles.glass}>
                    <div className="title flex flex-col item-center">
                        <h4 className='text-5xl font-bold'>Hello Again!</h4>
                        <h1 className='pt-4'> Enter new password.</h1>
                    </div>
                    <form className='pt-20' onSubmit={formik.handleSubmit} >
                        <div className="textbox flex flex-col items-center gap-6">
                            <div className='input text-center'>
                                <input {...formik.getFieldProps('password')} className={styles.textbox} type="password" placeholder='New Password' />
                                <input style={{marginTop:"10px"}} {...formik.getFieldProps('confirm_pwd')} className={styles.textbox} type="password" placeholder='Repeat Password' />
                            </div>
    
                            <button className={styles.btn} type='submit'>Reset</button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Reset
