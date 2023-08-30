import React, { useEffect, useState } from 'react'
import { Link ,useNavigate} from "react-router-dom"
import Avatar from "../assets/profile.png"
import styles from '../styles/Username.module.css'
import {useAuthStore} from "../store/store" 
import toast, { Toaster } from "react-hot-toast";
import { generateOTP, verifyOTP } from '../helper/helper'
import { passwordValidate } from '../helper/validate';


const Recovery = () => {
    const navigate = useNavigate();

    const {username} = useAuthStore(state=>state.auth)
    const [OTP1,setOTP] = useState();

    useEffect(()=>{
        generateOTP(username).then((OTP)=>{
            console.log(OTP);
            if(OTP){
                return toast.success('OTP has been send to your email!')
            }
            return toast.error('Problem while generating OTP!');
        })
    },[username])

    async function onSubmit(e){

        e.preventDefault();
        try {
            let { status } = await verifyOTP({ username, code: OTP1 })
            if (status === 201 || status === 200) {
                toast.success('Verify Successfully!');
                return navigate('/reset');
            }
            
        } catch (error) {
            return toast.error('Wrong OTP! Check email again');
        }
       
    }

    async function resendOTP(){
        let sendPromise = generateOTP(username);
        toast.promise(sendPromise,{
            loading: 'Sending...!',
            success: <b>OTP has been send to your email!</b>,
            error: <b>Could not Send it!</b>
        });
        sendPromise.then(OTP=>{
            console.log(OTP)
        })
    }

    return (
        <div className='container mx-auto text-center'>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div className='flex justify-center items-center h-screen '>
                <div className={styles.glass}>
                    <div className="title flex flex-col item-center">
                        <h4 className='text-5xl font-bold'>Recovery</h4>
                        <h1 className='pt-4'> Enter OTP to recover password.</h1>
                    </div>
                    <form className='pt-20' onSubmit={onSubmit} >
                        <div className="textbox flex flex-col items-center gap-6">
                            <div className='input text-center'>
                                <input onChange={(e)=>setOTP(e.target.value)} className={styles.textbox} type="password" placeholder='OTP' />
                            </div>
                            <span className=' text-sm text-left text-gray-500'>
                                Enter 6 digits OTP sent to your email address.
                            </span>
                            <button className={styles.btn} type='submit'>Verify</button>
                        </div>
                    </form>
                        <div className="text-center py-4 ">
                            <span className='text-gray-500'>Can't get OTP? <button onClick={resendOTP} className='text-red-500' >Resend </button></span>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Recovery
