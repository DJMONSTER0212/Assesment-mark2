import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import Avatar from "../assets/profile.png"
import styles from '../styles/Username.module.css'
import toast,{ Toaster } from "react-hot-toast";
import { useFormik } from 'formik'; //validating the form data
import { passwordValidate } from '../helper/validate';
import useFetch from '../hooks/fetch.hook';
import { useAuthStore } from '../store/store';
import { verifyPassword } from '../helper/helper';

const Password = () => {

    const navigate = useNavigate();

    const {username} = useAuthStore(state=>state.auth)
    const [{isLoading,apiData,serverError}] =useFetch(`user/${username}`);

    const formik = useFormik({
        initialValues: {
            password: ''
        },
        validate: passwordValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            let loginPromise = verifyPassword({username,password: values.password})
            toast.promise(loginPromise,{
                loading:'Checking...',
                success : <b>Login Successfully...!</b>,
                error:<b>Password Not Match!</b>
            });
            loginPromise.then(res=>{
                let {token} = res.data;
                localStorage.setItem('token',token);
                navigate('/dashboard');
            })
        }
    })

    if(isLoading)return <h1 style={{marginTop:"50px"}} className='text-2xl font-bold text-center'>isLoading</h1>
    if (serverError) return <h1 style={{ marginTop: "50px" }} className='text-xl text-center text-red-500'>{serverError.message}</h1>

    
    // console.log(apiData?.profile)
    return (
        <div className='container mx-auto text-center'>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div className='flex justify-center items-center h-screen '>
                <div className={styles.glass}>
                    <div className="title flex flex-col item-center">
                        <h4 className='text-5xl font-bold'>Hello {apiData?.firstName || apiData?.username} !</h4>
                    </div>
                    <form className='py-1 ' onSubmit={formik.handleSubmit} >
                        <div className='profile flex justify-center py-4 '>
                            <img  src={`${apiData?.profile}`|| Avatar} className={styles.profile_img} alt="avatar" />
                        </div>
                        <div className="textbox flex flex-col items-center gap-6">
                            <input {...formik.getFieldProps('password')} className={styles.textbox} type="password" placeholder='Password' />
                            <button className={styles.btn} type='submit'>Sign In</button>
                        </div>
                        <div className="text-center py-4 ">
                            <span className='text-gray-500'>Forget Password? <Link className='text-red-500' to='/recovery'>Recover now</Link></span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Password
