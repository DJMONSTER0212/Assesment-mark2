import React from 'react'
import { Link } from "react-router-dom"
import Avatar from "../assets/profile.png"
import styles from '../styles/Username.module.css'
import { Toaster } from "react-hot-toast";
import { passwordValidate } from '../helper/validate';

const Recovery = () => {



    return (
        <div className='container mx-auto text-center'>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div className='flex justify-center items-center h-screen '>
                <div className={styles.glass}>
                    <div className="title flex flex-col item-center">
                        <h4 className='text-5xl font-bold'>Recovery</h4>
                        <h1 className='pt-4'> Enter OTP to recover password.</h1>
                    </div>
                    <form className='pt-20 ' >
                        <div className="textbox flex flex-col items-center gap-6">
                            <div className='input text-center'>
                                <input className={styles.textbox} type="password" placeholder='OTP' />
                            </div>
                            <span className=' text-sm text-left text-gray-500'>
                                Enter 6 digits OTP sent to your email address.
                            </span>
                            <button className={styles.btn} type='submit'>Sign In</button>
                        </div>
                        <div className="text-center py-4 ">
                            <span className='text-gray-500'>Can't get OTP? <button className='text-red-500' >Resend </button></span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Recovery
