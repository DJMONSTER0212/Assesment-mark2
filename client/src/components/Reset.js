import React, { useEffect } from 'react'
import { Link } from "react-router-dom"
import { useFormik } from 'formik';
import styles from '../styles/Username.module.css'
import toast,{ Toaster } from "react-hot-toast";
import { resetPassword } from '../helper/helper';
import {  resetPasswordValidation } from '../helper/validate';
import { useNavigate,Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/store';
import useFetch from '../hooks/fetch.hook'

const Reset = () => {
    const navigate = useNavigate();
    const {username} = useAuthStore(state=> state.auth)
    // const [{isloading,apiData,status,serverError}] = useFetch('session/createResetSession')


    const formik = useFormik({
        initialValues: {
            password: '',
            confirm_pwd:''
        },
        validate: resetPasswordValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            // console.log(values)
            let resetPromise = await resetPassword({username,password:values.password})
            console.log(resetPromise)
            let {status} = resetPromise;
            console.log(status)

            if(status===201 || status===200){
                toast.success("Reset Successfully...!");
                return navigate('/password');
            }
            else {
                toast.error("Unable to reset..!");
            }
            // toast.promise(resetPromise,{
            //     loading:'Updating...!',
            //     success: <b>Reset Successfully...!</b>,
            //     error: <b>Could not Reset!</b>
            // });
        }
    });
    // if (isLoading) return <h1 style={{ marginTop: "50px" }} className='text-2xl font-bold text-center'>isLoading</h1>
    // if (serverError) return <h1 style={{ marginTop: "50px" }} className='text-xl text-center text-red-500'>{serverError.message}</h1>



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
